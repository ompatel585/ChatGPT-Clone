import { IoTrash } from "react-icons/io5";
import { MODELS } from '../constants/models.js';

const Sidebar = ({ chats, currentChatId, onSwitchChat, onDeleteChat, onNewChat }) => {
  return (
    <div className="w-80 bg-gray-800 border-r border-gray-700 p-6 flex flex-col h-screen">
      <h2 className="text-xl font-bold mb-6">Gemini Chat</h2>
      <button
        onClick={onNewChat}
        className="w-full p-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl mb-6"
      >
        + New Chat
      </button>
      <div className="flex-1 overflow-y-auto space-y-2 mb-6">
        {chats.map((chat) => (
          <div key={chat.id} className="flex items-center group">
            <button
              onClick={() => onSwitchChat(chat.id)}
              className={`flex-1 text-left p-3 rounded-lg transition-all group-hover:bg-gray-700 ${
                currentChatId === chat.id ? 'bg-blue-600/30 border-r-4 border-blue-400 font-medium' : ''
              }`}
            >
              {chat.title}
            </button>
            <button
              onClick={() => onDeleteChat(chat.id)}
              className="opacity-0 group-hover:opacity-100 ml-2 p-2 text-red-400 hover:text-red-200 hover:bg-red-500/20 rounded transition-all flex-shrink-0"
              title="Delete chat"
            >
              <IoTrash className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-400 space-y-1">
        <div>Current model in chat</div>
      </div>
    </div>
  );
};

export default Sidebar;
