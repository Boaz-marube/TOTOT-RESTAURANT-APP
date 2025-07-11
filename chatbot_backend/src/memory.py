from langchain.memory import ConversationBufferWindowMemory
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage, SystemMessage
from langchain_core.chat_history import InMemoryChatMessageHistory 

def get_chat_history_memory(k: int = 5) -> ConversationBufferWindowMemory:
    """
    Returns a ConversationBufferWindowMemory instance.
    This defines how LangChain will internally manage chat history for a chain.
    """
    return ConversationBufferWindowMemory(
        k=k, 
        memory_key="chat_history", 
        input_key="question",
        output_key="answer", 
        return_messages=True 
    )

def map_api_history_to_lc_messages(history_list: list[dict]) -> BaseChatMessageHistory:
    """
    Maps a list of history dictionaries (from API request) to LangChain's BaseChatMessageHistory format.
    This function prepares the history received from the frontend to be used by LangChain.
    """
    messages = []
    for turn in history_list:
        role = turn.get("role")
        content = turn.get("content", "")
        if role == "user":
            messages.append(HumanMessage(content=content))
        elif role == "assistant":
            messages.append(AIMessage(content=content))
        elif role == "system":
            messages.append(SystemMessage(content=content))

    lc_history = InMemoryChatMessageHistory()
    for msg in messages:
        lc_history.add_message(msg)
    return lc_history