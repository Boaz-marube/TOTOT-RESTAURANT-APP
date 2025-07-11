import React,{useState} from 'react'
import { FaRobot } from 'react-icons/fa';
import ChatbotUI from './ChatbotUI';

function ChatbotSection() {
    const[isOpen,setIsOpen] = useState(false);
    const toggleBot = () => setIsOpen(!isOpen);
  return (
    <div className='fixed bottom-5 right-5 z-[1000]'>
        
        <button 
        className = "flex items-center justify-center rounded-full shadow-lg hover:scale-105 transition bg-gradient-to-r from-ethiopian-red to-ethiopian-dark text-white w-14 h-14 sm:w-12 sm:h-12 md:w-16 md:h-16"
        onClick={toggleBot}
    >
        <FaRobot className="text-white text-3xl md:text-4xl"  />
        </button>
        {isOpen && <ChatbotUI onClose={toggleBot} />}
    </div>    
  )
}

export default ChatbotSection