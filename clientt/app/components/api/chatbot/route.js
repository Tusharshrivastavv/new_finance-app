export async function POST(req) {
    try {
      const { message } = await req.json();
  
      if (!message) {
        return new Response(JSON.stringify({ error: "Message is required" }), { status: 400 });
      }
  
      const apiKey = process.env.OPENAI_API_KEY;
      const apiUrl = "https://api.openai.com/v1/chat/completions";
  
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: message }],
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error?.message || "API Error");
      }
  
      return new Response(JSON.stringify({ reply: data.choices[0].message.content }), { status: 200 });
    } catch (error) {
      console.error("Chatbot API Error:", error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }
  