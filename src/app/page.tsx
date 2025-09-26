'use client';
import { useState } from 'react';
import { ButtonDemo } from './components/button';
import { Title } from './components/title';

export default function Chat() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'You', text: input }]);
    try {
      const res = await fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: 'Bot', text: data.reply }]);
      setInput('');
    } catch {
        setInput('');
      console.log('failed fetch');
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col gap-4">
      <Title />
      <div className="border rounded p-4 h-80 overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={
              msg.sender === 'You' ? 'text-black' : 'text-black'
            }
          >
            <strong>{msg.sender}: </strong>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex mt-2 items-center gap-2">
        <input
          className="flex-1 border rounded p-4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <ButtonDemo sendMessage={sendMessage} />
      </div>
    </div>
  );
}
