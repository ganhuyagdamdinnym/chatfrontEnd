import { Input } from "@/components/ui/input"
// import { SetStateAction } from "react";
// type Propstype={
// value:string;
// setInput: (value: SetStateAction<string>) => void;
// sendMessage: () => Promise<void>
// }     
       
export function InputDemo(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Input
      placeholder="enter your question"
      {...props}
    />
  );
}
