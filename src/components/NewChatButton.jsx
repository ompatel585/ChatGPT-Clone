const NewChatButton = ({ onNewChat }) => {
  return (
    <div className="w-80 bg-gray-800 border-r border-gray-700 p-6 flex flex-col">
      <button
        onClick={onNewChat}
        className="w-full p-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl mb-4"
      >
        + New Chat
      </button>

    </div>
  );
};

export default NewChatButton;

