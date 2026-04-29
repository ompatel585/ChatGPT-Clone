import { IoTrash, IoCopy } from "react-icons/io5";

const Sidebar = ({ chats, currentChatId, onSwitchChat, onDeleteChat, onNewChat }) => {
  const copyChatLink = (id) => {
    navigator.clipboard.writeText(`${window.location.origin}/#${id}`);
    // Toast or visual feedback
  };

  return (
    <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col h-screen">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6">Gemini Chat</h2>
        <button
          onClick={onNewChat}
          className="w-full p-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl mb-6"
        >
          + New Chat
        </button>
      </div>
      <div className="flex-1 overflow-y-auto space-y-2 px-6 pb-6 max-h-screen">
        {chats.map((chat) => (
          <div key={chat.id} className="relative group">
            <button
              onClick={() => onSwitchChat(chat.id)}
              className={`w-full text-left p-3 rounded-lg transition-all ${
                currentChatId === chat.id ? 'bg-blue-600/30 border-r-4 border-blue-400 font-medium' : 'hover:bg-gray-700'
              }`}
            >
              {chat.title}
            </button>
            <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => copyChatLink(chat.id)}
                className="p-1 text-gray-400 hover:text-blue-400 hover:bg-blue-500/20 rounded"
                title="Copy link"
              >
                <IoCopy className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDeleteChat(chat.id)}
                className="p-1 text-red-400 hover:text-red-200 hover:bg-red-500/20 rounded"
                title="Delete"
              >
                <IoTrash className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
