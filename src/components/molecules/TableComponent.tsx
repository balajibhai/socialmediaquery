import React from "react";

interface Entry {
  date: string;
  distance: number;
}

interface TableComponentProps {
  data: Entry[];
}

const TableComponent: React.FC<TableComponentProps> = (
  props: TableComponentProps
) => {
  const { data } = props;

  return (
    <div>
      {data.length > 0 && (
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
            {data.map((entry, index) => (
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
