import React from "react";
import { createAI, createStreamableValue, getAIState, getMutableAIState, streamUI } from "ai/rsc";

import { Chat, Message } from "../types";
import { nanoid } from "../utils";
import { ollama } from "../ollama/ollama";
import SpinnerMessage from "@/components/helpers/spinnerMessage";
import BotMessage from "@/components/helpers/botMessage";
import UserMessage from "@/components/helpers/userMessage";
import BotCard from "@/components/helpers/botCard";
import { saveChat } from "@/app/actions";
import { contextFields, data } from "./context";

const escapeCSVValue = (value: any) => {
  if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
};

const dataToShow: {}[] = [];
const discripancyData = [];
const apiFields = Object.values(contextFields);

data.forEach((d) => {
  // @ts-ignore
  if (apiFields.every((f) => Boolean(d?.[f]))) {
    dataToShow.push(d);
  } else discripancyData.push(d);
});

const header = Object.keys(dataToShow[0] || {}).join(",");

const body = dataToShow
  .slice(0, 25)
  .map((row) => Object.values(row).map(escapeCSVValue).join(","))
  .join("\n");

const csv = `${header}\n${body}`;

async function submitUserMessage(content: string) {
  "use server";

  const aiState = getMutableAIState<typeof AI>();

  aiState.update({
    ...aiState.get(),
    messages: [...aiState.get().messages, { id: nanoid(), role: "user", content }],
  });

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>;

  let textNode: undefined | React.ReactNode;

  const result = await streamUI({
    model: ollama("llama3.1"),
    initial: <SpinnerMessage />,
    system: `\
      You are an internal company assistant. You help employees find information about their coworkers. You have access to an employee directory with the following fields:
    - Name
    - Department  
    - Role
    - Email
    - Phone Number
    - Location
    - Date of Joining

    Here is the Data ${csv} in CSV format

    You can answer questions like:
    - “Who works in the marketing team?”
    - “What's the email of John Doe?”
    - “List all employees who joined after January 2023.”
    - “Show all developers in Bangalore office.”

    Only answer questions using the available data. If something isn't in the data, say: “Sorry, I couldn't find that information.”

    `,
    messages: [
      ...aiState
        .get()
        .messages.map((message: any) => ({ role: message.role, content: message.content, name: message.name })),
    ],
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue("");
        textNode = <BotMessage data={dataToShow} content={textStream.value} />;
      }

      if (done) {
        textStream.done();
        aiState.done({
          ...aiState.get(),
          messages: [...aiState.get().messages, { id: nanoid(), role: "assistant", content }],
        });
      } else {
        textStream.update(delta);
      }

      return textNode;
    },

    tools: {
      // Have to implement Tools for better Responses -- Graphs and tabel's
    },
    onFinish: ({ usage }) => {
      const { promptTokens, completionTokens, totalTokens } = usage;
      // your own logic, e.g. for saving the chat history or recording usage
      console.log("Prompt tokens:", promptTokens);
      console.log("Completion tokens:", completionTokens);
      console.log("Total tokens:", totalTokens);
    },
  });

  return { id: nanoid(), display: result.value };
}

async function confirmPurchase(symbol: string, price: number, amount: number) {
  "use server";
}

export type AIState = { chatId: string; messages: Message[] };

export type UIState = { id: string; display: React.ReactNode }[];

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
    confirmPurchase,
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [] },
  onGetUIState: async () => {
    "use server";

    // const session = await auth();

    // if (session && session.user) {
    const aiState = getAIState() as Chat;

    if (aiState) {
      const uiState = getUIStateFromAIState(aiState);
      return uiState;
    }
    // } else {
    //   return;
    // }
  },
  onSetAIState: async ({ state }) => {
    "use server";

    // const session = await auth();

    // if (session && session.user) {
    const { chatId, messages } = state;

    const createdAt = new Date();
    //   const userId = session.user.id as string;

    const userId = nanoid(); /// Should be user Name or User Id
    const path = `/chat/${chatId}`;

    const firstMessageContent = messages[0].content as string;
    const title = firstMessageContent.substring(0, 100);

    const chat: Chat = {
      id: chatId,
      title,
      userId,
      createdAt,
      messages,
      path,
    };

    await saveChat(chat);
    // } else {
    //   return;
    // }
  },
});

export function getUIStateFromAIState(aiState: Chat) {
  return aiState.messages
    .filter((mess) => mess.role !== "system")
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display:
        message.role === "tool" ? (
          message.content.map((tool) => {
            if (tool.toolName === "listStock")
              return (
                <BotCard>
                  <StockListComponent />
                </BotCard>
              );

            if (tool.toolName === "showStockPrice")
              return (
                <BotCard>
                  <StockPriceComponent />
                </BotCard>
              );

            if (tool.toolName === "getEvents")
              return (
                <BotCard>
                  <EventsComponent />
                </BotCard>
              );

            return null;
          })
        ) : message.role === "user" ? (
          <UserMessage>{message.content as string}</UserMessage>
        ) : message.role === "assistant" && typeof message.content === "string" ? (
          <BotMessage data={dataToShow} content={message.content} />
        ) : null,
    }));
}

const StockListComponent = () => null;
const StockPriceComponent = () => null;
const EventsComponent = () => null;
