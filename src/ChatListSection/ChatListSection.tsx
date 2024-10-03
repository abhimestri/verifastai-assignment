import { useContext, useState } from "react";
import ChatListItem from "../components/ChatListItem/ChatListItem";
import { ChatContext } from "../context";
import InfiniteScroll from "react-infinite-scroll-component";
import { getChatList } from "../api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ActionBar from "./ActionBar";
import { getFilteredList } from "./utility";
import Spinner from "react-bootstrap/Spinner";
import {
  ChatDetailsContextProps,
  ChatProps,
  DateRangeProps,
  PageCountDetailsProps,
} from "../types";

interface ChatListSectionProps {
  chatList: Array<ChatProps>;
  pageCountDetails: PageCountDetailsProps;
  isTabletOrMobile?: boolean;
  isChatListLoading: boolean;
  dataError: boolean;
  setChatList: (data: Array<ChatProps>) => void;
  setPageCountDetails: (data: PageCountDetailsProps) => void;
  setShowChatList?: (data: boolean) => void;
}

const ChatListSection = ({
  chatList,
  pageCountDetails,
  isTabletOrMobile,
  isChatListLoading,
  dataError,
  setChatList,
  setPageCountDetails,
  setShowChatList,
}: ChatListSectionProps) => {
  const { setChatDetails } = useContext<ChatDetailsContextProps>(ChatContext);
  const [searchKey, setSearchKey] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRangeProps>({
    startDate: "",
    endDate: "",
  });

  const handleSelectUser = (chat: ChatProps) => {
    setChatDetails(chat);
    setShowChatList?.(false);
  };

  const fetchMoreData = () => {
    getChatList({ pageCountDetails })?.then((data) => {
      setChatList([...chatList, ...data?.chatSessionsData?.chat_sessions]);
    });
    setPageCountDetails({
      ...pageCountDetails,
      currentPage: pageCountDetails?.currentPage + 1,
    });
  };

  const getLoaders = () => {
    const loaders = [];
    for (let i = 0; i < 10; i++) {
      loaders?.push(
        <div className="flex items-center gap-x-2 my-6 h-[70px]">
          <div className="w-[70px] h-[60px] rounded-[50%] overflow-hidden">
            <Skeleton className="w-full !h-full py-2" />
          </div>
          <div className="w-full">
            <Skeleton className="w-full" />
            <Skeleton className="!w-[40%]" />
          </div>
        </div>
      );
    }
    return <>{[...loaders]}</>;
  };

  const handleFilter = (e?: any) => {
    if (e?.target?.name === "startDate") {
      setDateRange({
        ...dateRange,
        startDate: e?.target?.value,
      });
    } else {
      setDateRange({
        ...dateRange,
        endDate: e?.target?.value,
      });
    }
  };

  const handleSearch = (e: any) => {
    setSearchKey(e?.target?.value);
  };

  return (
    <div
      className={`border-r-[1px] ${
        isTabletOrMobile ? "!w-full" : "w-[700px]"
      } lg:w-[500px]`}
    >
      <ActionBar
        dateRange={dateRange}
        handleFilter={handleFilter}
        handleSearch={handleSearch}
      />
      <div
        id="scrollableDiv"
        className="custom-scrollbar overflow-scroll p-2 h-[88vh] pb-4"
      >
        {isChatListLoading ? (
          getLoaders()
        ) : (
          <InfiniteScroll
            dataLength={
              [...getFilteredList({ chatList, searchKey, dateRange })].length
            }
            next={fetchMoreData}
            hasMore={
              !![...getFilteredList({ chatList, searchKey, dateRange })]
                .length &&
              pageCountDetails?.currentPage + 1 <= pageCountDetails?.maxPages
            }
            loader={
              <div className="w-full flex justify-center">
                <Spinner animation="border" />
              </div>
            }
            scrollableTarget="scrollableDiv"
          >
            {[...getFilteredList({ chatList, searchKey, dateRange })]
              ?.length ? (
              [...getFilteredList({ chatList, searchKey, dateRange })]?.map(
                (chat: ChatProps) => {
                  return (
                    <>
                      <ChatListItem
                        onClick={() => handleSelectUser(chat)}
                        chat={chat}
                      />
                      <div className="bg-[#76767C] opacity-[0.2] h-[1px] w-full" />
                    </>
                  );
                }
              )
            ) : (
              <div className="w-full flex justify-center">
                <p className="text-[16px] text-center font-medium">
                  {dataError
                    ? "Unable to fetch data, something went wrong!"
                    : "No chats found!"}
                </p>
              </div>
            )}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default ChatListSection;
