import moment from "moment";
import { ChatProps, FilterProps } from "../types";

export const getFilteredList = ({
  chatList = [],
  searchKey,
  dateRange,
}: FilterProps) => {
  let filteredChatList: Array<ChatProps> = [...chatList];
  if (searchKey) {
    const updatedSearchList = chatList?.filter((chat) =>
      chat?.name?.toLocaleLowerCase()?.includes(searchKey?.toLocaleLowerCase())
    );
    filteredChatList = [...updatedSearchList];
  }
  if (
    dateRange?.startDate &&
    dateRange?.endDate &&
    !moment(dateRange?.startDate)?.isAfter(dateRange?.endDate)
  ) {
    const updatedList = filteredChatList?.filter(
      (chat: ChatProps) =>
        moment(chat?.messages[chat?.messages?.length - 1]?.timestamp)?.isAfter(
          dateRange?.startDate
        ) &&
        moment(chat?.messages[chat?.messages?.length - 1]?.timestamp)?.isBefore(
          dateRange?.endDate
        )
    );
    filteredChatList = [...updatedList];
  }
  return filteredChatList;
};
