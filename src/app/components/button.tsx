"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type PropsType = {
  sendMessage: () => void | Promise<void>;
};

export function ButtonDemo({ sendMessage }: PropsType) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // only render after client-side hydration
  }, []);

  if (!mounted) return null; // prevent SSR mismatches

  return (
    <div>
      <Button data-slot="button" size="lg" variant="secondary" onClick={sendMessage}>
      Send
      </Button>
    </div>
  );
}
