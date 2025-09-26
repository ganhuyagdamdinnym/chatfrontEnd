import { ModeToggle } from "./darkMode";

export const Title = () => {
  return (
    <div className="w-full h-20 flex items-center justify-between border-b-2 border-white px-4">
      <h1 className="text-3xl">ChatBot</h1>
      <ModeToggle />
    </div>
  );
};
