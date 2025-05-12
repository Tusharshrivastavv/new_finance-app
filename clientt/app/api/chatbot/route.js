export async function POST(req) {
    try {
      const { message } = await req.json();
  
      if (!message) {
        return new Response(JSON.stringify({ error: "Message is required" }), { status: 400 });
      }
  
      let reply = "I don't understand that question.";
  
      if (message.toLowerCase().includes("finance")) {
        reply = "Finance is the management of money, including investments, savings, and budgeting.";
      } else if (message.toLowerCase().includes("investment")) {
        reply = "Investment is putting money into assets like stocks or real estate for future gains.";
      }
  
      return new Response(JSON.stringify({ reply }), { 
        status: 200, 
        headers: { "Content-Type": "application/json" } 
      });
    } catch (error) {
      console.error("Chatbot API Error:", error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
  }
  