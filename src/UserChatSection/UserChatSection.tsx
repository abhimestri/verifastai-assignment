import { useContext } from "react";
import Header from "./Header";
import ChatInterface from "./ChatInterface";
import { ChatContext } from "../context";
import { ChatDetailsContextProps, UserChatSectionProps } from "../types";

const UserChatSection = ({
  showChatList = true,
  setShowChatList,
}: UserChatSectionProps) => {
  const { chatDetails } = useContext<ChatDetailsContextProps>(ChatContext);
  return (
    <>
      {chatDetails?.id ? (
        <div className="w-full">
          <Header
            chatDetails={chatDetails}
            showChatList={showChatList}
            setShowChatList={setShowChatList}
          />
          <ChatInterface />
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <div className="flex justify-center items-center bg-[#F7F7FD] w-[300px] h-[300px] rounded-[50%] p-12">
            <div>
              <p className="text-[24px] text-center">Chat Session dashboard</p>
              <p className="text-[14px] text-center mt-2">
                select chat to get details
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserChatSection;
