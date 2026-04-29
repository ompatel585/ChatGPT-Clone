import { useState, useEffect } from 'react';
import { generateContent } from './utils/gemini.js';
import NewChatButton from './components/NewChatButton.jsx';
import ChatArea from './components/ChatArea.jsx';
import { MODELS } from './constants/models.js';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [currentModel, setCurrentModel] = useState(MODELS[0]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // LocalStorage persistence
  useEffect(() => {
    const saved = localStorage.getItem('chatgptclone-state');
    if (saved) {
      const parsed = JSON.parse(saved);
      setMessages(parsed.messages || []);
      const savedModel = MODELS.find(m => m.id === parsed.modelId);
      if (savedModel) setCurrentModel(savedModel);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatgptclone-state', JSON.stringify({
      messages,
      modelId: currentModel.id,
    }));
  }, [messages, currentModel]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await generateContent(currentModel.model, input);
      const aiMessage = { role: 'assistant', content: response };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setError(err.message);
      const errorMessage = { role: 'assistant', content: `Error: ${err.message}` };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <NewChatButton onClearChat={clearChat} />
      <ChatArea 
        messages={messages} 
        loading={loading} 
        error={error}
        input={input}
        onInputChange={setInput}
        onSend={sendMessage}
        onKeyPress={handleKeyPress}
        currentModel={currentModel}
        onModelChange={setCurrentModel}
      />
    </div>
  );
}

export default App;

