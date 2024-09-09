"use client";

import { createContext, useState } from "react";

export const emailsContext = createContext<any>(null);

export const EmailsContextProvider = ({ children }: any) => {
  const [emailsData, setEmailsData] = useState<any>(
    JSON.parse(localStorage.getItem("emails") || "[]")
  );

  return (
    <emailsContext.Provider
      value={{
        emailsData,
        setEmailsData,
      }}
    >
      {children}
    </emailsContext.Provider>
  );
};
