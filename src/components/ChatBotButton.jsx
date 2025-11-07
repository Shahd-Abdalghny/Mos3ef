import React from "react";
import { Bot } from "lucide-react"; 

const ChatBotButton = () => {
   

    return (
        <>
            
                <button
                className="flex justify-center items-center fixed  bottom-6 right-6 p-3 rounded-full w-[72px] h-[72px] bg-Blue-900 text-white shadow-lg hover:bg-Blue  transition z-50"
                >
                    <Bot size={34} />
                </button>
            
        </>
    );
};

export default ChatBotButton;
