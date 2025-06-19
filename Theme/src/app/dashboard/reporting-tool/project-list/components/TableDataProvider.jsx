// TableDataContext.js
"use client";
import React, { createContext, useState, useContext } from 'react';

const TableDataContext = createContext();

export const TableDataProvider = ({ children }) => {
  const [tableData, setTableData] = useState([
    ['192.168.1.1', '8080', 'Active'],
    ['10.0.0.2', '3000', 'Inactive'],
    ['172.16.5.4', '5000', 'Active']
  ]);

  return (
    <TableDataContext.Provider value={{ tableData, setTableData }}>
      {children}
    </TableDataContext.Provider>
  );
};

export const useTableData = () => useContext(TableDataContext);
