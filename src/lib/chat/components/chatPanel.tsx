import { SVGProps } from "react";
import { useActions, useUIState } from "ai/rsc";

import { cn, nanoid } from "@/lib/utils";
import UserMessage from "@/components/helpers/userMessage";
import SpinnerMessage from "@/components/helpers/spinnerMessage";

import { AI } from "../actions";
import PromptForm from "./widgets/promptForm";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { contextFields, data } from "../context";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";

const exampleMessages = [
  {
    heading: "List all employees",
    subheading: "who joined after January 2023",
    message: "List all employees who joined after January 2023",
  }, // message - heading + subheading
  {
    heading: "Show all developers",
    subheading: "in Bangalore office.",
    message: "Show all developers in Bangalore office.",
  },
];

const TokensUsed = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="default" size="icon">
          <svg viewBox="0 0 24 24" width={24} height={24} xmlns="http://www.w3.org/2000/svg">
            <g strokeWidth={0} />
            <g strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M18.25 2.997A2.75 2.75 0 0 1 21 5.747v12.5a2.75 2.75 0 0 1-2.75 2.75H5.75A2.75 2.75 0 0 1 3 18.247v-12.5a2.75 2.75 0 0 1 2.75-2.75zm0 1.5H5.75c-.69 0-1.25.56-1.25 1.25v12.5c0 .69.56 1.25 1.25 1.25h12.5c.69 0 1.25-.56 1.25-1.25v-12.5c0-.69-.56-1.25-1.25-1.25M7.75 9c.38 0 .693.28.743.645l.007.102v6.506a.75.75 0 0 1-.75.747.75.75 0 0 1-.743-.645L7 16.253V9.747C7 9.334 7.336 9 7.75 9m8.5-2c.38 0 .693.274.743.63l.007.1v8.54a.74.74 0 0 1-.75.73.744.744 0 0 1-.743-.63l-.007-.1V7.73a.74.74 0 0 1 .75-.73m-4.275 4.997a.73.73 0 0 1 .732.62l.008.099.035 3.547a.73.73 0 0 1-.725.734.73.73 0 0 1-.732-.62l-.008-.1-.035-3.547a.73.73 0 0 1 .725-.733"
              fill="#fff"
            />
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Usage</h4>
            <p className="text-sm text-muted-foreground">Token utilisation</p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Tokens</Label>
              <Input id="width" readOnly defaultValue="1247" className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. Tokens</Label>
              <Input id="maxWidth" readOnly defaultValue="300000" className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Context length</Label>
              <Input id="height" defaultValue="450000" readOnly className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Max. Context length</Label>
              <Input id="maxHeight" defaultValue="500000" readOnly className="col-span-2 h-8" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const Help = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="icon">
          <svg viewBox="0 0 24 24" width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg">
            <g strokeWidth={0} />
            <g strokeLinecap="round" strokeLinejoin="round" />
            <g stroke="#323232" strokeWidth={2}>
              <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              <path
                d="M10.5 8.677a2 2 0 1 1 1.995 3.261c-.268.068-.495.286-.495.562v.5m0 3h.01"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Context</h4>
            <p className="text-sm text-muted-foreground">Ask question related to employees</p>
          </div>
          <hr />
          <h6 className="font-medium leading-none">Terminology</h6>
          <div className="grid gap-2">
            {Object.entries(contextFields).map(([key, description]) => (
              <div className="grid grid-cols-3 items-center gap-4" key={key}>
                <Label htmlFor={key}>{key}</Label>
                <Input id={key} readOnly defaultValue={description} className="col-span-2 h-8 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Data = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="icon">
          <svg width={15} height={15} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.754.82a.5.5 0 0 0-.508 0l-5.5 3.25a.5.5 0 0 0 0 .86l5.5 3.25a.5.5 0 0 0 .508 0l5.5-3.25a.5.5 0 0 0 0-.86zM7.5 7.17 2.983 4.5 7.5 1.83l4.517 2.67zm-5.93.326a.5.5 0 0 1 .684-.176l5.246 3.1 5.246-3.1a.5.5 0 1 1 .508.86l-5.5 3.25a.5.5 0 0 1-.508 0l-5.5-3.25a.5.5 0 0 1-.177-.684m0 3a.5.5 0 0 1 .684-.177l5.246 3.1 5.246-3.1a.5.5 0 0 1 .508.861l-5.5 3.25a.5.5 0 0 1-.508 0l-5.5-3.25a.5.5 0 0 1-.177-.684"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle>Data</DialogTitle>
          <DialogDescription>Data used as context for the chat bot</DialogDescription>
        </DialogHeader>

        <div className="max-h-[400px] overflow-auto border rounded">
          <table border={1} cellPadding="10" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead className="sticky top-0 bg-gray-100 z-10">
              <tr>
                {Object.entries(contextFields).map(([key, label]) => (
                  <th key={key} style={{ textAlign: "left", background: "#f0f0f0" }}>
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((emp, index) => (
                <tr key={index}>
                  {Object.values(contextFields).map((field) => (
                    <td key={field} className=" whitespace-nowrap">
                      {/* @ts-ignore*/}
                      {emp[field]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <DialogFooter>
          <Button type="submit">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const DescripancyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M12.043 17.599a1.8 1.8 0 1 0 0-3.602 1.8 1.8 0 0 0 0 3.602m.839-11.198H11.28c-.53 0-.96.434-.96.96v5.119c0 .526.434.96.96.96h1.602c.526 0 .96-.434.96-.96V7.361a.965.965 0 0 0-.96-.96"
      fill="#fff"
    />
    <path
      d="M12 0C5.368 0 0 5.368 0 12s5.368 12 12 12 12-5.368 12-12S18.632 0 12 0m.011 20.567a8.564 8.564 0 1 1 .002-17.127 8.564 8.564 0 0 1-.002 17.127"
      fill="#fff"
    />
  </svg>
);

const Descripancy = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-[#EDA23F]" variant="destructive" size="icon">
          <DescripancyIcon />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Data Descripancy</h4>
            <p className="text-sm text-muted-foreground">Ask question related to employees</p>
          </div>

          <hr />

          <h6 className="font-medium leading-none">Terminology</h6>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Vehicle Id</Label>
              <Input id="width" readOnly defaultValue="Name of the asset" className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Model Name</Label>
              <Input id="maxWidth" readOnly defaultValue="Vehicle model name" className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Tenant Name</Label>
              <Input id="height" defaultValue="Name of the tenant - business" readOnly className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Rider</Label>
              <Input id="maxHeight" defaultValue="Rider name and mobile number" readOnly className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Deployed on</Label>
              <Input id="height" defaultValue="Date of deployment" readOnly className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Plan</Label>
              <Input id="maxHeight" defaultValue="Rental plan choosen" readOnly className="col-span-2 h-8" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default function ChatPanel() {
  const [messages, setMessages] = useUIState<typeof AI>();

  const { submitUserMessage } = useActions();

  return (
    <div className="fixed inset-x-0 bottom-0 w-full">
      <div className="mx-auto md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem] relative">
        {/* <div className="mx-auto sm:max-w-2xl sm:px-4"> */}
        {messages.length === 0 ? (
          <div className="grid grid-cols-2 w-full gap-4 mb-4">
            {exampleMessages.map((example, index) => (
              <div
                key={example.heading}
                className={cn(
                  "cursor-pointer rounded-lg border border-[#d9d9d9] bg-[#f1f1f1] p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900",
                  index > 1 && "hidden md:block"
                )}
                onClick={async () => {
                  setMessages((curr) => [
                    ...curr,
                    { id: nanoid(), display: <UserMessage>{example.message}</UserMessage> },
                    { id: "Loading", display: <SpinnerMessage /> },
                  ]);

                  const responseMessage = await submitUserMessage(example.message);

                  setMessages((curr) => [...curr.filter(({ id }) => id !== "Loading"), responseMessage]);
                }}
              >
                <div className="text-sm font-semibold">{example.heading}</div>
                <div className="text-sm text-zinc-400">{example.subheading}</div>
              </div>
            ))}
          </div>
        ) : null}

        <div className="z-50 flex flex-col gap-2 bg-white">
          <PromptForm />

          <h5 className="text-gray-700 text-[11px] text-center">Consider checking important information</h5>
        </div>

        {/*  */}
        <div className="fixed right-4 top-1/2 flex flex-col gap-4">
          {/* <Descripancy /> */}
          <TokensUsed />
          <Help />
          <Data />
        </div>
      </div>
    </div>
  );
}
