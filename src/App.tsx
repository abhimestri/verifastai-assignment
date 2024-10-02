import { useEffect, useState } from "react";
import "./App.css";
import ChatListSection from "./ChatListSection/ChatListSection";
import Header from "./Header/Header";
import { getChatList } from "./api";
import UserChatSection from "./UserChatSection/UserChatSection";
import { ChatContext } from "./context";
import { useMediaQuery } from "react-responsive";

const App = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 760px)" });
  const [showChatList, setShowChatList] = useState(true);
  const [chatList, setChatList] = useState<Array<any>>([]);
  const [chatDetails, setChatDetails] = useState<any>();
  const [pageCountDetails, setPageCountDetails] = useState<any>({
    currentPage: 1,
    maxPages: 0,
  });

  useEffect(() => {
    if (!chatList?.length && pageCountDetails?.maxPages === 0) {
      getChatList(pageCountDetails)?.then((data) => {
        setPageCountDetails({
          currentPage: data?.chatSessionsData?.current_page,
          maxPages: data?.chatSessionsData?.pages,
        });
        setChatList([...data?.chatSessionsData?.chat_sessions]);
      });
    }
  }, [chatList, pageCountDetails]);

  console.log({ pageCountDetails });

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
            />
            <UserChatSection />
          </div>
        )}
      </div>
    </ChatContext.Provider>
  );
};

export default App;
