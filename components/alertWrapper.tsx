// @ts-nocheck
import { createContext, PropsWithChildren, useContext, useState } from "react";
import nextId from "react-id-generator";

const AlertContext = createContext();

export function AlertWrapper({ children }: PropsWithChildren<Record<string, never>>) {

  const alertState = useState([]);


  return (
    <AlertContext.Provider value={alertState}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const [alerts, setAlerts] = useContext<any>(AlertContext);
  function addItem(msg: string, severity: string) {
    const id = nextId();
    setAlerts((prev: any) => [...prev, {
      id,
      content: msg,
      severity,
    }]);
    setTimeout(() => {
      setAlerts((prev: any[]) => prev.filter(item => item.id != id));
    }, 5000);
  }
  return {
    alerts,
    information: (msg: string) => addItem(msg, "information"),
    error: (msg: string) => addItem(msg, "error"),
  };
}