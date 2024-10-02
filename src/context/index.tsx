import { createContext } from "react";

export const ChatContext = createContext({
  chatDetails: {},
  setChatDetails: (data: any) => {
    return data;
  },
});
