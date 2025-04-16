export default function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border border-[#d9d9d9] bg-white p-8">
        <h1 className="text-lg font-semibold">Welcome to AI Chatbot!</h1>
        <p className="leading-normal text-muted-foreground">Now you can chat with your data</p>
      </div>
    </div>
  );
}
