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

  if (!mounted) return null; // ⛔ prevents SSR/CSR mismatch

  return (
    <div className="w-screen h-screen flex flex-col gap-4">
      <Title />
      <div className="border rounded p-4 h-80 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className="text-black">
            <strong>{msg.sender}: </strong>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex mt-2 items-center gap-2">
        <InputDemo
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <ButtonDemo sendMessage={sendMessage} />
      </div>
    </div>
  );
}
