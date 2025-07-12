export const sendChatbotMessage = async (question) => {
    try {
      const response = await fetch("https://totot-chatbot6.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: question,
          chat_history: []  
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to contact Totobot");
      }
  
      const data = await response.json();
      return data.response; 
    } catch (error) {
      console.error("Chatbot API error:", error);
      return "Sorry, I'm having trouble responding right now.";
    }
  };
  