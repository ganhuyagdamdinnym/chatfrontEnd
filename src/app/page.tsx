'use client';

import { useState, useEffect } from 'react';
import { ButtonDemo } from './components/button';
import { Title } from './components/title';
import { InputDemo } from './components/input';

export default function Chat() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: 'You', text: input }]);

    try {
      const res = await fetch('https://daimaa0423.app.n8n.cloud/webhook/self-driving-assignment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });

      const data = await res.json();
      const botReply = data[0]?.output || 'No response';
      setMessages((prev) => [...prev, { sender: 'Bot', text: botReply }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { sender: 'Bot', text: '⚠️ Server error.' }]);
    } finally {
      setInput('');
    }
  };

  if (!mounted) return null;

  return (
    <div className="w-screen h-screen flex flex-col gap-4 p-4">
      <Title />
      <div className="border rounded-lg p-4 h-[500px] overflow-y-auto bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex mb-2 ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] px-3 py-2 rounded-2xl ${
                msg.sender === 'You'
                  ? 'bg-blue-500 text-white self-end'
                  : 'bg-gray-200 text-gray-900 self-start'
              }`}
            >
              <strong className="block text-sm mb-1">
                {msg.sender === 'You' ? '🧑 You' : '🤖 Bot'}
              </strong>
              <p className="text-base leading-snug whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex mt-2 items-center gap-2">
        <InputDemo
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
        />
        <ButtonDemo sendMessage={sendMessage} />
      </div>
    </div>
  );
}
