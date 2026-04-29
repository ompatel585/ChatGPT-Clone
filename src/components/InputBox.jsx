import ModelSelector from './ModelSelector.jsx';
import { useRef, useEffect } from 'react';

const InputBox = ({ input, onInputChange, onSend, loading, onKeyPress, currentModel, onModelChange }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 160) + 'px';
    }
  }, [input]);

  return (
    <div className="bg-gray-800 border-t border-gray-700 p-6 shrink-0">
      <div className="max-w-4xl mx-auto flex gap-2 items-end">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Type your message... (Shift+Enter for new line, Enter to send)"
          className="flex-1 min-h-[44px] max-h-[160px] p-3.5 bg-gray-700 border border-gray-600 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 leading-relaxed scrollbar-w-[3px] scrollbar-thin scrollbar-thumb-gray-500/30 scrollbar-track-gray-800/30 scrollbar-thumb-rounded-full"
          disabled={loading}
        />
        <ModelSelector currentModel={currentModel} onModelChange={onModelChange} />
        <button
          onClick={onSend}
          disabled={!input.trim() || loading}
          className="w-12 h-12 flex-shrink-0 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-2xl flex items-center justify-center transition-all shadow-md hover:shadow-lg"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : '➤'}
        </button>
      </div>
    </div>
  );
};

export default InputBox;
