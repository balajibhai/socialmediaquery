import { DataPoint } from "../../services/tabsService";

type TextComponentProps = {
  data: DataPoint[];
};

const TextComponent = (props: TextComponentProps) => {
  const { data } = props;
  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <p>Date: {item.date}</p>
          <p>Distance: {item.distance}</p>
        </div>
      ))}
    </div>
  );
};

export default TextComponent;
