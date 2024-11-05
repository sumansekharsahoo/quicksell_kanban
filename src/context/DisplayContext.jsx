import React, { createContext, useContext, useState, useEffect } from 'react';

const DisplayContext = createContext();

export function DisplayContextProvider({ children }) {
  const initialGrouping = localStorage.getItem('grouping') || 'Status';
  const initialOrdering = localStorage.getItem('ordering') || 'Priority';

  const [grouping, setGrouping] = useState(initialGrouping);
  const [ordering, setOrdering] = useState(initialOrdering);

  const updateSelection = (newGrouping, newOrdering) => {
    if (newGrouping) setGrouping(newGrouping);
    if (newOrdering) setOrdering(newOrdering);
  };

  useEffect(() => {
    localStorage.setItem('grouping', grouping);
  }, [grouping]);

  useEffect(() => {
    localStorage.setItem('ordering', ordering);
  }, [ordering]);

  return (
    <DisplayContext.Provider value={{ grouping, ordering, updateSelection }}>
      {children}
    </DisplayContext.Provider>
  );
}

export const useDisplay = () => useContext(DisplayContext);
