import ContentParser from './ContentParser.jsx';
import { useState } from 'react';

const Message = ({ role, content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-2xl p-4 pt-10 rounded-2xl relative min-w-[120px] ${
          role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'
        }`}
      >
        <button
          onClick={handleCopy}
          className={`absolute top-2 right-2 px-2 py-1 text-xs rounded-md shadow-sm border transition-all whitespace-nowrap ${
            role === 'user' 
              ? 'bg-blue-500 border-blue-400 hover:bg-blue-400 text-white' 
              : 'bg-gray-600 border-gray-500 hover:bg-gray-500 text-gray-200 hover:text-white'
          }`}
        >
          {copied ? '✅ Copied' : '📋 Copy'}
        </button>
        <ContentParser content={content} />
      </div>
    </div>
  );
};

export default Message;
