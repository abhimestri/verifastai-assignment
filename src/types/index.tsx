export interface MessageProps {
  action: "USER" | "AI";
  id?: string;
  content: string;
  timestamp: string;
}

export interface ChatProps {
  name: string;
  id: string;
  messages: Array<MessageProps>;
}

export interface PageCountDetailsProps {
  currentPage: number;
  maxPages: number;
}

export interface DateRangeProps {
  /* declared as string because react-bootstarp datepicker 
  accepts string type for date input */
  startDate: string;
  endDate: string;
}
export interface FilterProps {
  chatList: Array<ChatProps>;
  searchKey: string;
  dateRange: DateRangeProps;
}

export interface ActionBarProps {
  dateRange: DateRangeProps;
  handleFilter: (data?: DateRangeProps) => void;
  handleSearch: (data?: any) => void;
}

export interface UserChatSectionProps {
  showChatList?: boolean;
  setShowChatList?: (data: boolean) => void;
}

export interface ChatInterfaceHeaderProps {
  chatDetails: ChatProps;
  showChatList: UserChatSectionProps["showChatList"];
  setShowChatList: UserChatSectionProps["setShowChatList"];
}

export interface ChatDetailsContextProps {
  chatDetails: ChatProps;
  setChatDetails: (data: ChatProps) => void;
}
