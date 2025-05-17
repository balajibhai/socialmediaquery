// src/components/GraphComponent.tsx
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";

interface Entry {
  date: string;
  distance: number;
}

interface GraphComponentProps {
  data: Entry[];
}

// register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GraphComponent: React.FC<GraphComponentProps> = (
  props: GraphComponentProps
) => {
  const { data } = props;

  const chartData = {
    labels: data.map((e) => e.date), // e.g. "12/03/2021"
    datasets: [
      {
        label: "Distance (km)",
        data: data.map((e) => e.distance),
        fill: false,
        tension: 0.2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text: "Running Log",
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Date" },
      },
      y: {
        title: { display: true, text: "KM" },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "110%", margin: "2rem auto" }}>
      {data.length > 0 ? (
        <Line data={chartData} options={options} />
      ) : (
        <p>
          Paste your running log (e.g. <code>date: 12/03/2021 distance: 3</code>
          ) to see the graph.
        </p>
      )}
    </div>
  );
};

export default GraphComponent;
