import ChatInterface from "../components/organisms/ChatInterface";
import { Message } from "../types";

type HomePageProps = {
  question: string;
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
  messages: Message[];
  onSend: () => void;
};

const HomePage = (props: HomePageProps) => {
  const { question, setQuestion, messages, onSend } = props;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Dynamic component chat</h1>
      <ChatInterface
        question={question}
        setQuestion={setQuestion}
        messages={messages}
        onSend={onSend}
      />
    </div>
  );
};

export default HomePage;
