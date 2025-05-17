import { componentMap } from "../constants";
import { Message } from "../types";

export class MessageHandler {
  static async handleMessageSubmission(
    question: string,
    messages: Message[]
  ): Promise<any> {
    const response = await fetch("http://localhost:5000/api/detect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: question }),
    });

    const data = await response.json();

    if (data.key) {
      const Component = componentMap[data.key as keyof typeof componentMap];
      return { data, Component };
    }

    return null;
  }

  static createNewMessage(question: string, messageLength: number): Message {
    return {
      id: messageLength + 1,
      text: question,
    };
  }
}
