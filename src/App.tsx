import { useEffect, useState } from "react";
import "./App.css";
import ChatListSection from "./ChatListSection/ChatListSection";
import Header from "./Header/Header";
import { getChatList } from "./api";
import UserChatSection from "./UserChatSection/UserChatSection";
import { ChatContext } from "./context";
import { useMediaQuery } from "react-responsive";
import { ChatProps, PageCountDetailsProps } from "./types";

const App = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 760px)" });
  const [showChatList, setShowChatList] = useState<boolean>(true);
  const [chatList, setChatList] = useState<Array<ChatProps>>([]);
  const [chatDetails, setChatDetails] = useState<ChatProps>({
    name: "",
    id: "",
    messages: [],
  });
  const [pageCountDetails, setPageCountDetails] =
    useState<PageCountDetailsProps>({
      currentPage: 1,
      maxPages: 0,
    });
  const [isChatListLoading, setIsChatListLoading] = useState<boolean>(true);
  const [dataError, setDateError] = useState<boolean>(false);

  useEffect(() => {
    if (!chatList?.length && pageCountDetails?.maxPages === 0) {
      getChatList({ pageCountDetails, setDateError })?.then((data) => {
        if (data?.chatSessionsData?.chat_sessions?.length) {
          setPageCountDetails({
            currentPage: data?.chatSessionsData?.current_page,
            maxPages: data?.chatSessionsData?.pages,
          });
          setChatList([...data?.chatSessionsData?.chat_sessions]);
          setIsChatListLoading(false);
        }
      });
    }
    if (dataError) {
      setIsChatListLoading(false);
    }
  }, [chatList, pageCountDetails, dataError]);

  return (
    <ChatContext.Provider
      value={{
        chatDetails: chatDetails,
        setChatDetails: setChatDetails,
      }}
    >
      <div>
        <Header />
        {isTabletOrMobile ? (
          <div className="flex !h-[92vh] w-full overflow-hidden">
            {showChatList ? (
              <ChatListSection
                pageCountDetails={pageCountDetails}
                chatList={chatList}
                setChatList={setChatList}
                setPageCountDetails={setPageCountDetails}
                setShowChatList={setShowChatList}
                isTabletOrMobile={isTabletOrMobile}
                isChatListLoading={isChatListLoading}
                dataError={dataError}
              />
            ) : (
              <UserChatSection
                showChatList={showChatList}
                setShowChatList={setShowChatList}
              />
            )}
          </div>
        ) : (
          <div className="flex !h-[92vh] overflow-hidden">
            <ChatListSection
              pageCountDetails={pageCountDetails}
              chatList={chatList}
              setChatList={setChatList}
              setPageCountDetails={setPageCountDetails}
              isChatListLoading={isChatListLoading}
              dataError={dataError}
            />
            <UserChatSection />
          </div>
        )}
      </div>
    </ChatContext.Provider>
  );
};

export default App;
