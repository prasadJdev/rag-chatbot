import { AI } from "@/lib/chat/actions";
import Chat from "@/lib/chat/chat";
import { nanoid } from "@/lib/utils";

export default async function IndexPage() {
  const id = nanoid();
  // const session = (await auth()) as Session
  // const missingKeys = await getMissingKeys() // to check if any env is missing

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <Chat id={id} />
    </AI>
  );
}
