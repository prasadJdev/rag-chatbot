interface ChatLayoutProps {
  children: React.ReactNode;
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return <div className="relative flex h-[100svh] overflow-hidden">{children}</div>;
}
