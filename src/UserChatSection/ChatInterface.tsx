import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../context";
import moment from "moment";

const ChatInterface = () => {
  const chatRef = useRef<any>(null);
  const { chatDetails }: any = useContext(ChatContext);

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
      {chatDetails?.messages?.map((message: any) => {
        return message?.action === "AI" ? (
          <div className="h-fit w-fit md:max-w-[52%] lg:max-w-[36%] my-3">
            <div className="px-[8px] py-[12px] bg-[#000929] rounded-b-[10px] rounded-r-[10px] text-[14px] text-white flex justify-start">
              {message?.content}
            </div>
            <p className="text-[14px] pl-2 mt-1">
              {moment(message?.timestamp)?.fromNow()}
            </p>
          </div>
        ) : (
          <div className="flex justify-end my-3">
            <div className="h-fit w-fit md:max-w-[52%] lg:max-w-[36%]">
              <div className="px-[8px] py-[12px] relative bg-[#2E3B5B] rounded-b-[10px] rounded-l-[10px] text-[14px] text-white">
                <p>{message?.content}</p>
              </div>
              <p className="text-end text-[14px] pr-2 mt-1">
                {moment(message?.timestamp)?.fromNow()}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatInterface;
