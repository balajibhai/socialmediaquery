import { ComponentType } from "react";

export interface Message {
  id: number; // ID from the mock server
  text: string; // The user’s question
  answer?: string; // The server’s response
  timeStamp?: string; // The time the message was sent
  maindata?: string; // The main data from the server
}

export type TabConfig = {
  label: string;
  value: string;
  component?: ComponentType<any>;
};
