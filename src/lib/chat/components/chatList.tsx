import { Separator } from "@/components/ui/separator";
import { UIState } from "../actions";

export interface ChatListProps {
  messages: UIState;
  isShared?: boolean;
} // isShared is used to directly load history of the chat

export default function ChatList({ messages, isShared }: ChatListProps) {
  if (!messages.length) return null;

  return (
    <div className="relative mx-auto max-w-5xl px-4">
      {messages.map((message, index) => (
        <div key={message.id}>
          {message.display}
          {/* {index < messages.length - 1 && <Separator />} */}
        </div>
      ))}
    </div>
  );
}
