import { Button } from "@/components/ui/button"
type PropsType = {
  sendMessage:()=>void | Promise<void>;
};
export function ButtonDemo(props:PropsType) {
  const {sendMessage}=props;
  return (
  <Button size="lg" variant="secondary">
  Send
</Button>
  )
}
