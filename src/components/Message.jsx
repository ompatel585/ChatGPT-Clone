import ContentParser from './ContentParser.jsx';
import { useState } from 'react';

const Message = ({ role, content }) => {
  const [showCopy, setShowCopy] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setShowCopy(true);
    setTimeout(() => setShowCopy(false), 2000);
  };

  return (
    <div 
      className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'} group relative`}
      onMouseEnter={() => setShowCopy(true)}
      onMouseLeave={() => setShowCopy(false)}
    >
      <div
        className={`max-w-2xl p-4 rounded-2xl relative ${
          role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'
        }`}
      >
        <ContentParser content={content} />
        {showCopy && (
          <button
            onClick={handleCopy}
            className="absolute -top-8 right-2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-md shadow-lg border border-gray-600 hover:bg-gray-700 transition-all whitespace-nowrap"
          >
            📋 Copy
          </button>
        )}
      </div>
    </div>
  );
};

export default Message;

