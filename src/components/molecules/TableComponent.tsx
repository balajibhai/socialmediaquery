import React, { useEffect, useState } from "react";

interface Entry {
  date: string;
  distance: number;
}

interface TableComponentProps {
  text: string;
}

const TableComponent: React.FC<TableComponentProps> = ({ text }) => {
  console.log("text: ", text);
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

    setEntries(parsed);
  }, [text]);

  return (
    <div>
      {entries.length > 0 && (
        <table
          style={{
            width: "100%",
            marginTop: "1rem",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                Date
              </th>
              <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                Distance (km)
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {entry.date}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {entry.distance}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TableComponent;
