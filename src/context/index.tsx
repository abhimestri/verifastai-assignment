import { createContext } from "react";
import { ChatDetailsContextProps, ChatProps } from "../types";

export const ChatContext = createContext<ChatDetailsContextProps>({
  chatDetails: {
    name: "",
    id: "",
    messages: [],
  },
  setChatDetails: (data: ChatProps) => {
    return data;
  },
});
