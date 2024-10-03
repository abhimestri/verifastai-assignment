import { ReactComponent as BackArrow } from "../assets/icons/BackArrow.svg";
import { avatarList } from "../components/ChatListItem/ChatListItem";
import { ChatInterfaceHeaderProps } from "../types";

const Header = ({
  chatDetails,
  showChatList,
  setShowChatList,
}: ChatInterfaceHeaderProps) => {
  return (
    <div className="sticky bg-white py-3 pl-2">
      <div className="flex gap-x-2 items-center">
        {!showChatList ? (
          <div
            className="mr-2 cursor-pointer"
            onClick={() => (setShowChatList ? setShowChatList(true) : "")}
          >
            <BackArrow />
          </div>
        ) : (
          ""
        )}
        <div className="flex items-center gap-x-2">
          <div className="w-[50px] h-[50px] rounded-[50px] bg-[#ccc] overflow-hidden">
            <img
              src={avatarList[Math?.floor((+chatDetails?.id % 10) / 3)]}
              alt=""
            />
          </div>
          <p className="text-[14px] sm:text-[16px]">{chatDetails?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
