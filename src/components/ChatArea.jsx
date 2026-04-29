import MessageList from './MessageList.jsx';
import InputBox from './InputBox.jsx';

const ChatArea = ({ messages, loading, error, input, onInputChange, onSend, onKeyPress, currentModel, onModelChange }) => {
  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-gray-800 border-b border-gray-700 p-6">
        <h1 className="text-2xl font-bold">Gemini Chat</h1>
      </div>
      <MessageList messages={messages} loading={loading} error={error} />
      <InputBox
        input={input}
        onInputChange={onInputChange}
        onSend={onSend}
        loading={loading}
        onKeyPress={onKeyPress}
        currentModel={currentModel}
        onModelChange={onModelChange}
      />
    </div>
  );
};

export default ChatArea;
