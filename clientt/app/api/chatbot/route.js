import {
  chatbotQA,
  SUGGESTED_QUESTION_IDS,
  FALLBACK_ANSWER,
} from "../../data/chatbotData";

const STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "is",
  "are",
  "am",
  "was",
  "were",
  "be",
  "to",
  "of",
  "for",
  "on",
  "in",
  "at",
  "my",
  "me",
  "i",
  "it",
  "this",
  "that",
  "do",
  "does",
  "did",
  "can",
  "could",
  "would",
  "should",
  "how",
  "what",
  "why",
  "when",
  "where",
  "which",
  "and",
  "or",
  "with",
]);

// --------------------------------------------------
// Normalize user input
// --------------------------------------------------
function normalize(text = "") {
  return String(text)
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/₹/g, " rupee ")
    .replace(/\bpls\b/g, "please")
    .replace(/\bplz\b/g, "please")
    .replace(/\bthx\b/g, "thanks")
    .replace(/\bty\b/g, "thank you")
    .replace(/\bhows\b/g, "how is")
    .replace(/\bhowdy\b/g, "hello")
    .replace(/\bu\b/g, "you")
    .replace(/\bur\b/g, "your")
    .replace(/\br\b/g, "are")
    .replace(/[^\p{L}\p{N}\s%/-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getTokens(text) {
  return normalize(text)
    .split(" ")
    .filter(Boolean)
    .filter((word) => !STOP_WORDS.has(word));
}

// --------------------------------------------------
// Check complete phrase instead of raw substring
// --------------------------------------------------
function containsPhrase(text, phrase) {
  const normalizedText = ` ${normalize(text)} `;
  const normalizedPhrase = ` ${normalize(phrase)} `;

  return normalizedText.includes(normalizedPhrase);
}

// --------------------------------------------------
// Calculate similarity between two sentences
// --------------------------------------------------
function tokenSimilarity(a, b) {
  const tokensA = new Set(getTokens(a));
  const tokensB = new Set(getTokens(b));

  if (!tokensA.size || !tokensB.size) {
    return 0;
  }

  let common = 0;

  for (const token of tokensA) {
    if (tokensB.has(token)) {
      common++;
    }
  }

  return common / Math.max(tokensA.size, tokensB.size);
}

// --------------------------------------------------
// Score one FAQ entry
// --------------------------------------------------
function scoreEntry(message, entry) {
  const text = normalize(message);
  const question = normalize(entry.question);

  let score = 0;
  let matchedKeywords = 0;

  // Exact question
  if (text === question) {
    score += 100;
  }

  // User's complete question appears in FAQ
  else if (containsPhrase(text, question)) {
    score += 70;
  }

  // Keywords
  for (const keyword of entry.keywords || []) {
    const normalizedKeyword = normalize(keyword);

    if (!normalizedKeyword) continue;

    if (containsPhrase(text, normalizedKeyword)) {
      const words = normalizedKeyword.split(" ").length;

      if (words >= 4) {
        score += 35;
      } else if (words === 3) {
        score += 28;
      } else if (words === 2) {
        score += 18;
      } else {
        score += 6;
      }

      matchedKeywords++;
    }
  }

  // Question similarity
  score += tokenSimilarity(text, question) * 35;

  return {
    score,
    matchedKeywords,
  };
}

// --------------------------------------------------
// Special handling for very common conversation
// --------------------------------------------------
function handleSmallTalk(message) {
  const text = normalize(message);

  // Greetings
  if (
    /^(hello|hi|hey|hiya|hii|heyy|good morning|good afternoon|good evening)$/.test(
      text
    )
  ) {
    return {
      reply:
        "Hi there! 👋 I'm your finance assistant. Ask me about expenses, savings, EMIs, budgeting, or anything else in CoinIQ.",
      confidence: 1,
    };
  }

  // How are you?
  if (
    /^(how are you|how are you doing|how is it going|how are things)$/.test(
      text
    )
  ) {
    return {
      reply:
        "I'm doing well! 😊 I'm here and ready to help with your finances or just have a quick chat.",
      confidence: 1,
    };
  }

  // How was your day?
  if (
    /^(how was your day|how is your day|how has your day been)$/.test(text)
  ) {
    return {
      reply:
        "It's going well! 😊 I've been helping with budgets, expenses, savings, and other finance questions. What would you like to work on?",
      confidence: 1,
    };
  }

  return null;
}

// --------------------------------------------------
// Main matcher
// --------------------------------------------------
function findBestMatch(message) {
  const text = normalize(message);

  // Empty message
  if (!text) {
    return null;
  }

  // Small talk first
  const smallTalk = handleSmallTalk(text);

  if (smallTalk) {
    return {
      type: "small_talk",
      reply: smallTalk.reply,
      confidence: smallTalk.confidence,
    };
  }

  const results = chatbotQA
    .map((entry) => {
      const result = scoreEntry(text, entry);

      return {
        entry,
        score: result.score,
        matchedKeywords: result.matchedKeywords,
      };
    })
    .sort((a, b) => b.score - a.score);

  const best = results[0];
  const secondBest = results[1];

  if (!best) {
    return null;
  }

  const messageWordCount = text.split(" ").length;

  /*
   * Short messages need stronger evidence.
   *
   * Example:
   * "finance"
   * should match finance_help because it has an explicit
   * finance keyword.
   *
   * But:
   * "today"
   * should NOT randomly match an FAQ.
   */
  const minimumScore = messageWordCount <= 2 ? 8 : 14;

  const scoreDifference =
    best.score - (secondBest?.score || 0);

  /*
   * Accept if:
   * 1. Score is sufficiently high
   * 2. Best result is meaningfully better than second result
   *    OR it has a very strong direct match.
   */
  if (
    best.score >= minimumScore &&
    (scoreDifference >= 3 || best.score >= 55)
  ) {
    return {
      type: "faq",
      entry: best.entry,
      confidence: Math.min(best.score / 100, 1),
    };
  }

  return null;
}

// --------------------------------------------------
// Suggestions
// --------------------------------------------------
function getSuggestions() {
  return SUGGESTED_QUESTION_IDS.map((id) =>
    chatbotQA.find((q) => q.id === id)
  )
    .filter(Boolean)
    .map((q) => ({
      id: q.id,
      question: q.question,
    }));
}

// --------------------------------------------------
// API
// --------------------------------------------------
export async function POST(req) {
  try {
    const body = await req.json();

    const message =
      typeof body.message === "string"
        ? body.message.trim()
        : "";

    const questionId =
      typeof body.questionId === "string"
        ? body.questionId
        : null;

    if (!message && !questionId) {
      return new Response(
        JSON.stringify({
          error: "Message is required",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // --------------------------------------------------
    // Suggested question clicked
    // --------------------------------------------------
    if (questionId) {
      const entry = chatbotQA.find(
        (q) => q.id === questionId
      );

      if (entry) {
        return new Response(
          JSON.stringify({
            reply: entry.answer,
            matchedId: entry.id,
            suggestions: getSuggestions(),
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
    }

    // --------------------------------------------------
    // Match normal user message
    // --------------------------------------------------
    const match = findBestMatch(message);

    if (match) {
      if (match.type === "small_talk") {
        return new Response(
          JSON.stringify({
            reply: match.reply,
            matchedId: null,
            confidence: match.confidence,
            suggestions: getSuggestions(),
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      return new Response(
        JSON.stringify({
          reply: match.entry.answer,
          matchedId: match.entry.id,
          confidence: match.confidence,
          suggestions: getSuggestions(),
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // --------------------------------------------------
    // Better fallback
    // --------------------------------------------------
    return new Response(
      JSON.stringify({
        reply:
          "I can help with your finances. You can ask me about expenses, budgeting, savings, EMIs, loans, investments, credit scores, taxes, receipts, or transactions. For example: \"How can I reduce my expenses?\"",
        matchedId: null,
        confidence: 0,
        suggestions: getSuggestions(),
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Chatbot API Error:", error);

    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}