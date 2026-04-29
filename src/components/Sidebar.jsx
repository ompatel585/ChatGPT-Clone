import { MODELS } from '../constants/models.js';

const Sidebar = ({ currentModel, onModelChange, onClearChat }) => {
  return (
    <div className="w-80 bg-gray-800 border-r border-gray-700 p-6 flex flex-col">
      <h2 className="text-xl font-bold mb-6">Gemini Chat</h2>
      <label className="block text-sm font-medium mb-2">Model:</label>
      <select
        value={currentModel.id}
        onChange={(e) => onModelChange(MODELS.find((m) => m.id === e.target.value))}
        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-8"
      >
        {MODELS.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
      <button
        onClick={onClearChat}
        className="w-full p-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
      >
        Clear Chat
      </button>
    </div>
  );
};

export default Sidebar;

