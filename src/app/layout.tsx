import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/lib/sonner/Toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RAG Chatbot",
  description: "AI RAG chat bot built using Vercel AI SDK and LLAMA 3.1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-right" />
        <TooltipProvider>
          <main className="flex flex-col bg-white">{children}</main>
        </TooltipProvider>
      </body>
    </html>
  );
}
