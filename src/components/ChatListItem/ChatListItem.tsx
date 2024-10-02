import { useContext } from "react";
import { ChatContext } from "../../context";
import img1 from "../../assets/img1.png";
import img2 from "../../assets/img2.png";
import img3 from "../../assets/img3.png";
import img4 from "../../assets/img4.png";
import moment from "moment";

interface ChatListItemProps {
  chat: any;
  onClick?: (data?: any) => void;
}
const ChatListItem = ({ chat, onClick }: ChatListItemProps) => {
  const { chatDetails }: any = useContext(ChatContext);
  const avatarList = [img1, img2, img3, img4];
  const lastActiveTimestamp = moment(
    chat?.messages[chat?.messages?.length - 1]?.timestamp
  )?.fromNow();
  return (
    <div
      onClick={onClick}
      className={`flex py-3 px-3 my-2 gap-x-2 cursor-pointer ${
        chatDetails?.id === chat?.id ? "rounded-[10px] bg-[#C8C8FF]" : ""
      }`}
    >
      <div className="w-[60px] h-[50px] rounded-[50px] bg-[#ccc] overflow-hidden">
        <img src={avatarList[Math?.floor((chat?.id % 10) / 3)]} alt="" />
      </div>
      <div className="w-full flex justify-between mt-1">
        <p className="text-[14px] text-[#000929] w-[70%] line-clamp-2 leading-[18px]">
          {chat?.name}
        </p>
        <p className="text-[#76767C] text-end text-[12px]">
          {lastActiveTimestamp}
        </p>
      </div>
    </div>
  );
};

export default ChatListItem;
