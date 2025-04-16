import { CoreMessage } from "ai";

export type Message = CoreMessage & { id: string };

export interface Chat extends Record<string, any> {
  id: string;
  title: string;
  createdAt: Date;
  userId: string;
  path: string;
  messages: Message[];
  sharePath?: string;
}

// export interface Session { // Just for reference to handle Auth
//     user: {
//       id: string
//       email: string
//     }
//   }
