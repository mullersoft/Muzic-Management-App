// components/Table.tsx
import React from 'react';
import styled from 'styled-components';

interface TableProps {
  columns: string[];
  data: any[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
`;

const TableHeader = styled.th`
  padding: 10px;
  background-color: #f4f4f4;
  border: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const TableComponent: React.FC<TableProps> = ({ columns, data, onEdit, onDelete }) => {
  return (
    <TableWrapper>
      <Table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <TableHeader key={index}>{column}</TableHeader>
            ))}
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <TableRow key={row._id}>
              {columns.map((column, index) => (
                // Ensure `row[column]` is not an object; otherwise, render a property or stringify
                <TableCell key={index}>
                  {typeof row[column] === 'object' ? JSON.stringify(row[column]) : row[column]}
                </TableCell>
              ))}
              <TableCell>
                <Button onClick={() => onEdit(row._id)}>Edit</Button>
                <Button onClick={() => onDelete(row._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
};

export default TableComponent;
