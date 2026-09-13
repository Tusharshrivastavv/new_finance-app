import { chatbotQA, SUGGESTED_QUESTION_IDS, FALLBACK_ANSWER } from "../../../data/chatbotData";

function findBestMatch(message) {
  const text = message.toLowerCase();
  let best = null;
  let bestScore = 0;

  for (const entry of chatbotQA) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (text.includes(keyword.toLowerCase())) {
        score += 1;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return bestScore > 0 ? best : null;
}

export async function POST(req) {
  try {
    const { message, questionId } = await req.json();

    if (!message && !questionId) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
      });
    }

    if (questionId) {
      const entry = chatbotQA.find((q) => q.id === questionId);
      if (entry) {
        return new Response(JSON.stringify({ reply: entry.answer }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    const match = findBestMatch(message);

    if (match) {
      return new Response(JSON.stringify({ reply: match.answer }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const suggestions = SUGGESTED_QUESTION_IDS.map((id) =>
      chatbotQA.find((q) => q.id === id)
    ).filter(Boolean);

    return new Response(
      JSON.stringify({
        reply: FALLBACK_ANSWER,
        suggestions: suggestions.map((s) => ({ id: s.id, question: s.question })),
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Chatbot API Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}