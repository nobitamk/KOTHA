import React, { useEffect, useState, useRef } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [ws, setWs] = useState(null);
  const chatBodyRef = useRef(null);
  const [introPlayed, setIntroPlayed] = useState(false);
  const [showIntroTooltip, setShowIntroTooltip] = useState(true);
  const [buttonVisible, setButtonVisible] = useState(false);

  // WebSocket connection
  useEffect(() => {
    if (isOpen && !ws) {
      const socket = new WebSocket('ws://localhost:5001');

      socket.onopen = () => console.log('WebSocket connected');
      socket.onclose = () => console.log('WebSocket disconnected');
      socket.onerror = (err) => console.error('WebSocket error:', err);

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const botMsg = {
          type: 'bot',
          text: data.message,
          options: data.options || [],
          userName: data.userName,
          fileUpload: data.fileUpload || false,
        };
        setMessages((prev) => [...prev, botMsg]);

        if (data.userName) {
          document.getElementById('headerTitle').textContent = `X's Bot - ${data.userName}`;
        }
      };

      setWs(socket);
    }
  }, [isOpen, ws]);

  // Scroll chat to bottom
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  // Animate intro tooltip & button on page load
  useEffect(() => {
    setTimeout(() => setButtonVisible(true), 300);
    setTimeout(() => setShowIntroTooltip(false), 4000);
  }, []);

  // Show intro bot message when chat opens
  // useEffect(() => {
  //   if (isOpen && !introPlayed) {
  //     setTimeout(() => {
  //       setMessages((prev) => [
  //         ...prev,
  //         { type: 'bot', text:  },
  //       ]);
  //       setIntroPlayed(true);
  //     }, 1000);
  //   }
  // }, [isOpen, introPlayed]);

  const sendMessage = (text) => {
    if (!text.trim() || !ws || ws.readyState !== WebSocket.OPEN) return;
    setMessages((prev) => [...prev, { type: 'user', text }]);
    ws.send(text);
    setInputValue('');
  };

  return (
    <>
      {/* Floating Button + Intro Tooltip */}
      <div className={`chat-float-container ${buttonVisible ? 'visible' : ''}`}>
        {showIntroTooltip && <div className="intro-tooltip">👋 Hi, I’m X’s Bot</div>}
        <button className="chat-button" onClick={() => setIsOpen(!isOpen)}>💬</button>
      </div>

      {/* Chatbot Panel */}
      <div className={`chat-container ${isOpen ? 'active slide-in' : ''}`}>
        <div className="chat-header">
          <span id="headerTitle">X's Bot - InfoYieldX</span>
        </div>
        <div className="chat-body" ref={chatBodyRef}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.type === 'bot' ? 'bot-message' : 'user-message'}`}>
              {msg.text}
              {msg.options?.length > 0 && (
                <div className="options">
                  {msg.options.map((opt, i) => (
                    <button key={i} className="option-btn" onClick={() => sendMessage(opt)}>{opt}</button>
                  ))}
                </div>
              )}
              {msg.fileUpload && (
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(e) => {
                    if (e.target.files.length > 0) {
                      sendMessage(e.target.files[0].name);
                    }
                  }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={inputValue}
            placeholder="Type your message..."
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputValue)}
          />
          <button onClick={() => sendMessage(inputValue)}>➤</button>
        </div>
      </div>

     <style>{`
  .chat-float-container {
    position: fixed;
    bottom: 20px;
    right: -100px;
    opacity: 0;
    transition: right 0.8s ease, opacity 0.8s ease;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .chat-float-container.visible {
    right: 20px;
    opacity: 1;
  }
  .chat-button {
    background: #111;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
  }
  .intro-tooltip {
    background: #222;
    color: #fff;
    padding: 10px 14px;
    border-radius: 12px;
    margin-bottom: 8px;
    font-size: 14px;
    animation: fadeInUp 0.5s ease;
    max-width: 200px;
    text-align: center;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .chat-container {
    position: fixed;
    bottom: 90px;
    right: 20px;
    width: 360px;
    height: 550px;
    background: #000;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
    display: none;
    flex-direction: column;
    color: #fff;
    font-family: 'Segoe UI', sans-serif;
    z-index: 1000;
    overflow: hidden;
    transform: translateY(100%);
    transition: transform 0.3s ease-in-out;
  }

  .chat-container.active {
    display: flex;
    transform: translateY(0);
  }

  .chat-container.slide-in {
    animation: slideIn 0.3s ease forwards;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(100%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .chat-header {
    background: #111;
    padding: 16px;
    font-weight: bold;
    text-align: center;
    font-size: 16px;
  }

  .chat-body {
    flex: 1;
    padding: 16px;
    overflow-y: auto;
    background: #1c1c1c;
  }

  .message {
    margin: 8px 0;
    padding: 12px;
    border-radius: 10px;
    line-height: 1.5;
    font-size: 15px;
    word-wrap: break-word;
  }

  .bot-message {
    background: #2c2c2c;
    margin-right: 20%;
  }

  .user-message {
    background: #333;
    margin-left: 20%;
    text-align: right;
  }

  .options {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 8px;
  }

  .option-btn {
    background: #333;
    border: none;
    padding: 8px 12px;
    border-radius: 8px;
    color: #fff;
    cursor: pointer;
    font-size: 13px;
  }

  .option-btn:hover {
    background: #444;
  }

  .chat-input {
    display: flex;
    gap: 10px;
    padding: 14px;
    background: #111;
    border-top: 1px solid #222;
  }

  .chat-input input {
    flex: 6;
    padding: 14px 16px;
    border: none;
    border-radius: 8px;
    background: #222;
    color: #fff;
    font-size: 15px;
  }

  .chat-input button {
    flex: 1;
    padding: 14px;
    font-size: 15px;
    background: #444;
    border: none;
    border-radius: 8px;
    color: #fff;
    cursor: pointer;
  }

  /* 🔧 Mobile Responsive */
  @media (max-width: 600px) {
    .chat-container {
      width: 94%;
      right: 3%;
      height: 86%;
      bottom: 85px;
    }

    .chat-button {
      width: 50px;
      height: 50px;
      font-size: 20px;
    }

    .chat-header {
      font-size: 14px;
      padding: 12px;
    }

    .chat-body {
      padding: 12px;
    }

    .chat-input {
      padding: 10px;
      gap: 6px;
    }

    .chat-input input {
      font-size: 14px;
      padding: 12px 14px;
    }

    .chat-input button {
      font-size: 14px;
      padding: 12px;
    }

    .message {
      font-size: 14px;
      padding: 10px;
    }

    .option-btn {
      font-size: 12px;
      padding: 6px 10px;
    }
  }
`}</style>

    </>
  );
};

export default Chatbot;
