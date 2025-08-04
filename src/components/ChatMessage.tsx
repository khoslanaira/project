import React from 'react';
import { Bot, User } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../types';

interface ChatMessageProps {
  message: ChatMessageType;
  onOptionSelect?: (option: string) => void;
  showOptions?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  onOptionSelect, 
  showOptions = true 
}) => {
  const isBot = message.type === 'bot';

  return (
    <div className={`flex gap-3 mb-6 ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && (
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}
      
      <div className={`max-w-xs lg:max-w-md ${isBot ? 'order-2' : 'order-1'}`}>
        <div
          className={`px-4 py-3 rounded-2xl ${
            isBot
              ? 'bg-white shadow-md text-gray-800'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
          }`}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
        
        {isBot && message.options && showOptions && (
          <div className="mt-3 space-y-2">
            {message.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onOptionSelect?.(option)}
                className="block w-full text-left px-4 py-3 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl transition-all duration-200 transform hover:scale-[1.02] border border-purple-200 hover:border-purple-300 text-sm font-medium"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      {!isBot && (
        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
};