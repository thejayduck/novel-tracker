// @ts-nocheck
import { createContext, useContext, useState } from "react";
import nextId from "react-id-generator";

const AlertContext = createContext();

export function AlertWrapper({ children }) {

  const alertState = useState([]);


  return (
    <AlertContext.Provider value={alertState}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const [alerts, setAlerts] = useContext(AlertContext);
  function addItem(msg, severity) {
    const id = nextId();
    setAlerts(prev => [...prev, {
      id,
      content: msg,
      severity,
    }]);
    setTimeout(() => {
      setAlerts(prev => prev.filter(item => item.id != id));
    }, 5000);
  }
  return {
    alerts,
    information: msg => addItem(msg, "information"),
    error: msg => addItem(msg, "error"),
  };
}