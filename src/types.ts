import { ComponentType } from "react";

export interface Message {
  id: number; // ID from the mock server
  text: string; // The user’s question
  answer?: string; // The server’s response
  timeStamp?: string; // The time the message was sent
  component?: React.FC<{ text: string }>; // The component to render
  maindata?: string; // The main data from the server
  // This is the data that will be passed to the component
}

export type TabConfig = {
  label: string;
  value: string;
  component?: ComponentType<any>;
};
