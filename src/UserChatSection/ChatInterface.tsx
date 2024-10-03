import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../context";
import { ChatDetailsContextProps, MessageProps } from "../types";
import MessageTile from "../components/MessageTile/MessageTile";

const ChatInterface = () => {
  const chatRef = useRef<any>(null);
  const { chatDetails } = useContext<ChatDetailsContextProps>(ChatContext);

  useEffect(() => {
    // Scroll to the bottom of the div when the component mounts
    if (chatRef.current && chatDetails) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatDetails]);

  return (
    <div
      ref={chatRef}
      className="z-30 bg-[#F7F7FD] overflow-scroll w-full h-full pt-4 px-6 pb-28"
    >
      {chatDetails?.messages?.map((message: MessageProps) => (
        <MessageTile
          action={message?.action}
          content={message?.content}
          timestamp={message?.timestamp}
        />
      ))}
    </div>
  );
};

export default ChatInterface;
