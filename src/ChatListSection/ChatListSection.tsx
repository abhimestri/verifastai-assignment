import { useContext } from "react";
import ChatListItem from "../components/ChatListItem/ChatListItem";
import { ChatContext } from "../context";
import InfiniteScroll from "react-infinite-scroll-component";
import { getChatList } from "../api";

interface ChatListSectionProps {
  chatList: Array<any>;
  pageCountDetails: any;
  isTabletOrMobile?: boolean;
  setChatList: (data: any) => void;
  setPageCountDetails: (data: any) => void;
  setShowChatList?: (data: boolean) => void;
}

const ChatListSection = ({
  chatList,
  pageCountDetails,
  isTabletOrMobile,
  setChatList,
  setPageCountDetails,
  setShowChatList,
}: ChatListSectionProps) => {
  const { setChatDetails } = useContext(ChatContext);

  const handleSelectUser = (chat: any) => {
    setChatDetails(chat);
    setShowChatList?.(false);
  };

  const fetchMoreData = () => {
    getChatList(pageCountDetails)?.then((data) => {
      setChatList([...chatList, ...data?.chatSessionsData?.chat_sessions]);
    });
    setPageCountDetails({
      ...pageCountDetails,
      currentPage: pageCountDetails?.currentPage + 1,
    });
  };

  return (
    <div
      className={`border-r-[1px] ${
        isTabletOrMobile ? "!w-full" : "w-[700px]"
      } lg:w-[500px]`}
    >
      <div className="z-[10] top-[60px] px-6 py-3 font-medium text-[18px] bg-[#fff]">
        <p>Messaging</p>
      </div>
      <div
        id="scrollableDiv"
        className="custom-scrollbar overflow-scroll p-2 h-[88vh] pb-4"
      >
        <InfiniteScroll
          dataLength={chatList.length}
          next={fetchMoreData}
          hasMore={
            pageCountDetails?.currentPage + 1 <= pageCountDetails?.maxPages
          }
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          {chatList?.map((chat) => {
            return (
              <>
                <ChatListItem
                  onClick={() => handleSelectUser(chat)}
                  chat={chat}
                />
                <div className="bg-[#76767C] opacity-[0.2] h-[1px] w-full" />
              </>
            );
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ChatListSection;
