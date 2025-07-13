export const sendChatbotMessage = async (question) => {
  try {
    console.log("Sending message:", question);

    const response = await fetch("https://totot-chatbot6.onrender.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: question,
        chat_history: [],
        session_id: "your_session_id_here",
      }),
    });

    console.log("Response status:", response.status);

    let responseBody;
    try {
      responseBody = await response.text();
      console.log("Raw response body:", responseBody);
    } catch (parseError) {
      console.error("Failed to read response body:", parseError);
      responseBody = null;
    }

    if (!response.ok) {
      console.error("API Error Response:", responseBody);
      throw new Error(`Failed to contact Totobot: ${response.status} ${response.statusText}`);
    }

    let data;
    try {
      data = responseBody ? JSON.parse(responseBody) : {};
    } catch (jsonError) {
      console.error("Failed to parse JSON:", jsonError);
      data = { error: "Invalid JSON response", raw: responseBody };
    }
    console.log("API Parsed Response:", data);
    return data.response || data.message || data.reply || data.answer || data;

  } catch (error) {
    console.error("Chatbot API error:", error);
    return "Sorry, I'm having trouble responding right now.";
  }
};
