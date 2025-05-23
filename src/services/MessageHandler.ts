import { componentMap } from "../constants";
import { Message } from "../types";

const API_URL = process.env.REACT_APP_API_URL!;
export class MessageHandler {
  static async handleMessageSubmission(
    question: string,
    messages: Message[]
  ): Promise<any> {
    const response = await fetch(`${API_URL}/api/detect`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: question }),
    });

    if (!response.ok) {
      throw new Error(`Server error ${response.status}`);
    }

    const data = await response.json();
    const componentType = data.key.toUpperCase();
    const Component = componentMap[componentType as keyof typeof componentMap];
    return { data, Component };
  }

  static createNewMessage(question: string, messageLength: number): Message {
    return {
      id: messageLength + 1,
      text: question,
    };
  }
}
