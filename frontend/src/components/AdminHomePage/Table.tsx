// Table.tsx

import React from 'react';

interface TableProps {
  columns: string[];
  data: any[];
  onEdit: (item: { _id: string }) => void;
  onDelete: (id: string) => void;
}

const Table: React.FC<TableProps> = ({ columns, data, onEdit, onDelete }) => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col} style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>
              {col}
            </th>
          ))}
          <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item._id} style={{ borderBottom: '1px solid #ddd' }}>
            {columns.map((col) => (
              <td key={col} style={{ padding: '10px' }}>
                {item[col]}
              </td>
            ))}
            <td style={{ padding: '10px' }}>
              <button onClick={() => onEdit(item)} style={{ marginRight: '5px' }}>
                Edit
              </button>
              <button onClick={() => onDelete(item._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
