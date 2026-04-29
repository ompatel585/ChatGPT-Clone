import { useState, useEffect, useRef } from 'react';
import { MODELS } from '../constants/models.js';

const ModelSelector = ({ currentModel, onModelChange }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative flex-shrink-0" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="h-12 px-3 py-2 bg-gray-700 border border-gray-600 rounded-xl text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center gap-1.5 min-w-[100px] shadow-sm"
      >
        <span className="truncate">{currentModel.name.split(' (')[0]}</span>
        <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute bottom-full right-0 mb-2 w-64 bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl z-50 py-1 max-h-60 overflow-y-auto">
          {MODELS.map((model) => (
            <button
              key={model.id}
              onClick={() => {
                onModelChange(model);
                setOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-sm hover:bg-gray-700/50 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
            >
              <div className="font-medium">{model.name}</div>
              <div className="text-xs text-gray-400">{model.model}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModelSelector;

