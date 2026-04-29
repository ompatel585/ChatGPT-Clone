import { useState, useEffect, useCallback } from 'react';
import { generateContent } from './utils/gemini.js';
import { MODELS } from './constants/models.js';
import NewChatButton from './components/NewChatButton.jsx';
import Sidebar from './components/Sidebar.jsx';
import ChatArea from './components/ChatArea.jsx';
import './App.css';

function App() {
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentChat = chats.find(c => c.id === currentChatId);
  const currentModel = MODELS.find(m => m.id === (currentChat?.modelId || 'small')) || MODELS[0];

  // Load chats from localStorage
  useEffect(() => {
    const savedChats = localStorage.getItem('chats');
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats);
      setChats(parsedChats.slice(-3)); // Keep last 3
      const urlId = getIdFromPath();
      const chatId = urlId || parsedChats[parsedChats.length - 1]?.id;
      if (chatId) setCurrentChatId(chatId);
    } else {
      // Create first chat
      const newId = Date.now();
      const newChat = { id: newId, title: 'New Chat', messages: [], modelId: 'small' };
      setChats([newChat]);
      setCurrentChatId(newId);
      window.history.replaceState(null, '', `/#${newId}`);
    }
  }, []);

  // Save chats to localStorage
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem('chats', JSON.stringify(chats.slice(-3)));
    }
  }, [chats]);

  // URL sync
  useEffect(() => {
    const handlePopState = () => {
      const id = getIdFromPath();
      if (id && chats.find(c => c.id === id)) {
        setCurrentChatId(id);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [chats]);

  const getIdFromPath = () => {
    const hash = window.location.hash.slice(1);
    const numericId = parseInt(hash);
    return isNaN(numericId) ? null : numericId;
  };

  const updateUrl = useCallback((id) => {
    window.history.pushState(null, '', `/#${id}`);
  }, []);

  const newChat = () => {
    const newId = Date.now();
    const newChat = { id: newId, title: 'New Chat', messages: [], modelId: 'small' };
    const newChats = [...chats.slice(-2), newChat]; // Keep max 3
    setChats(newChats);
    setCurrentChatId(newId);
    setInput('');
    setError(null);
    updateUrl(newId);
  };

  const switchChat = (id) => {
    setCurrentChatId(id);
    setInput('');
    setError(null);
    updateUrl(id);
  };

  const deleteChat = (id) => {
    if (confirm('Delete this chat?')) {
      const newChats = chats.filter(c => c.id !== id);
      setChats(newChats);
      if (currentChatId === id) {
        const nextId = newChats[0]?.id || null;
        setCurrentChatId(nextId);
        updateUrl(nextId || '');
      }
    }
  };

  const updateChatTitle = (id, title) => {
    setChats(chats.map(c => c.id === id ? { ...c, title } : c));
  };

  const onSendMessage = async (inputValue) => {
    if (!inputValue.trim() || loading || !currentChat) return;

    const userMessage = { role: 'user', content: inputValue };
    const updatedMessages = [...currentChat.messages, userMessage];
    const newChats = chats.map(c => c.id === currentChatId ? { ...c, messages: updatedMessages } : c);
    setChats(newChats);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await generateContent(currentModel.model, inputValue);
      const aiMessage = { role: 'assistant', content: response };
      const finalMessages = [...updatedMessages, aiMessage];
      setChats(chats.map(c => c.id === currentChatId ? { ...c, messages: finalMessages } : c));
    } catch (err) {
      setError(err.message);
      const errorMessage = { role: 'assistant', content: `Error: ${err.message}` };
      setChats(chats.map(c => c.id === currentChatId ? { ...c, messages: [...updatedMessages, errorMessage] } : c));
    } finally {
      setLoading(false);
    }
  };

  const onModelChange = (model) => {
    const newChats = chats.map(c => c.id === currentChatId ? { ...c, modelId: model.id } : c);
    setChats(newChats);
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage(input);
    }
  };

  if (!currentChatId) return <div>Loading...</div>;

  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Sidebar chats={chats} currentChatId={currentChatId} onSwitchChat={switchChat} onDeleteChat={deleteChat} onNewChat={newChat} />
      <div className="flex-1 flex flex-col">
        <ChatArea 
          messages={currentChat.messages} 
          loading={loading} 
          error={error}
          input={input}
          onInputChange={setInput}
          onSend={onSendMessage}
          onKeyPress={onKeyPress}
          currentModel={currentModel}
          onModelChange={onModelChange}
        />
      </div>
    </div>
  );
}

export default App;
