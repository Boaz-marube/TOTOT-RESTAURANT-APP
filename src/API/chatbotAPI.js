export const sendChatbotMessage = async (question) => {
    try {
      console.log("Sending message:", question);
      
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
  
      console.log("Response status:", response.status); 
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(`Failed to contact Totobot: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("API Response:", data); 
      return data.response || data.message || data.reply || data;
      
    } catch (error) {
      console.error("Chatbot API error:", error);
      return "Sorry, I'm having trouble responding right now.";
    }
  };