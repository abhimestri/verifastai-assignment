import { ReactComponent as BackArrow } from "../assets/icons/BackArrow.svg";

const Header = ({ chatDetails, showChatList, setShowChatList }: any) => {
  console.log({ showChatList });
  return (
    <div className="sticky bg-white py-4 pl-2">
      <div className="flex gap-x-2 items-center">
        {!showChatList ? (
          <div
            className="mr-2 cursor-pointer"
            onClick={() => setShowChatList(true)}
          >
            <BackArrow />
          </div>
        ) : (
          ""
        )}
        <p className="text-[16px]">{chatDetails?.name}</p>
      </div>
    </div>
  );
};

export default Header;
