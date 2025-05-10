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
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

interface Entry {
  date: string;
  distance: number;
}

interface GraphComponentProps {
  text: string;
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

const GraphComponent: React.FC<GraphComponentProps> = ({ text }) => {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const lines = text.split(/\r?\n/);
    const parsed: Entry[] = [];

    lines.forEach((line) => {
      const match = line.match(
        /date:\s*(\d{2}\/\d{2}\/\d{4})\s*distance:\s*(\d+)/i
      );
      if (match) {
        parsed.push({
          date: match[1],
          distance: parseInt(match[2], 10),
        });
      }
    });

    // Optional: sort by actual Date if you want chronological order
    parsed.sort((a, b) => {
      const [d1, m1, y1] = a.date.split("/").map(Number);
      const [d2, m2, y2] = b.date.split("/").map(Number);
      return (
        new Date(y1, m1 - 1, d1).getTime() - new Date(y2, m2 - 1, d2).getTime()
      );
    });

    setEntries(parsed);
  }, [text]);

  const chartData = {
    labels: entries.map((e) => e.date), // e.g. "12/03/2021"
    datasets: [
      {
        label: "Distance (km)",
        data: entries.map((e) => e.distance),
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
    <div style={{ maxWidth: 700, margin: "2rem auto" }}>
      {entries.length > 0 ? (
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
