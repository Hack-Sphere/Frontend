import React, { useEffect, useRef, useState } from 'react';
import API from '../utils/auth';
import EmojiPicker from 'emoji-picker-react';

export default function ClassroomChat({ classroomId }) {
  const [messages, setMessages] = useState([]);
   const [showPicker, setShowPicker] = useState(false);
  const [text, setText] = useState('');
  const [user] = useState(() => JSON.parse(localStorage.getItem('user')));
  const chatBoxRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const res = await API.get(`/api/v2/classroom/${classroomId}/comments/`);
      setMessages(res.data);
    } catch (err) {
      console.error('Failed to fetch messages', err);
    }
  };

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [classroomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      await API.post(`/api/v2/classroom/${classroomId}/comment/`, { text });
      setText('');
      fetchMessages();
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };
  const handleEmojiClick = (emojiData) => {
    setText(prev => prev + emojiData.emoji);
  };
  return (
    <div className="mt-10 border-t border-green-500 pt-6">
      <h2 className="text-2xl font-bold mb-4">💬 Live Chat</h2>
      
      {/* CHAT BOX */}
      <div
        ref={chatBoxRef}
        className="h-64 overflow-y-auto bg-[#0f0f0f] border border-green-500 rounded p-4 mb-4"
      >
        {messages.map((msg, i) => (
          <div key={i} className="mb-4 flex items-start gap-3">
            {/* Avatar Circle */}
            <div className="w-10 h-10 rounded-full bg-green-600 text-black font-bold flex items-center justify-center">
              {msg.student_name?.charAt(0).toUpperCase() || 'U'}
            </div>

            {/* Message Content */}
            <div className="flex-1">
              <div className="text-sm font-semibold">
                {msg.student_name || 'User'}{' '}
                {msg.is_teacher && (
                  <span className="bg-blue-600 text-white px-2 py-0.5 text-xs rounded ml-2">
                    [Teacher]
                  </span>
                )}
              </div>
              <p className="text-green-300">{msg.text}</p>
              <span className="text-xs text-green-600">
                {new Date(msg.created_at).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 bg-black border border-green-500 p-2 text-green-300 rounded"
          placeholder="Type your message... 💬"
        />
        <button
          type="button"
          onClick={() => setShowPicker(!showPicker)}
          className="px-2 text-2xl"
        >
          😀
        </button>
        <button
          type="submit"
          className="bg-green-400 text-black px-4 py-2 rounded hover:bg-green-300 font-bold"
        >
          Send
        </button>
      </form>
       {showPicker && (
        <div className="absolute mt-2 z-10">
          <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
        </div>
      )}
    </div>
  );
}
