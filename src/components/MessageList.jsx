import { useEffect, useRef } from 'react';
import Message from './Message.jsx';

const MessageList = ({ messages, loading, error }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading, error]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
            🤖
          </div>
          <p className="text-lg">Start a conversation with Gemini!</p>
        </div>
      ) : (
        messages.map((msg, index) => (
          <Message key={index} role={msg.role} content={msg.content} />
        ))
      )}
      {loading && (
        <div className="flex justify-start">
          <div className="bg-gray-700 p-4 rounded-2xl">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      )}
      {error && (
        <div className="flex justify-start">
          <div className="bg-red-600/20 border border-red-500/50 p-4 rounded-2xl text-red-300">
            {error}
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;

