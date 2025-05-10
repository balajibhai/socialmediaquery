type TextComponentProps = {
  text: string;
};

const TextComponent = (props: TextComponentProps) => {
  const { text } = props;
  return <div>{text}</div>;
};

export default TextComponent;
