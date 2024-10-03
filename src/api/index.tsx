import axios from "axios";
import { PageCountDetailsProps } from "../types";

export interface GetChatListProps {
  pageCountDetails: PageCountDetailsProps;
  setDateError?: (data: boolean) => void;
}
export const getChatList = async ({
  pageCountDetails,
  setDateError,
}: GetChatListProps) => {
  try {
    const res = await axios.get(
      `https://admin-backend-docker-india-306034828043.asia-south2.run.app/nlp/api/chat_sessions?page=${pageCountDetails?.currentPage}&per_page=50`
    );
    const chatSessionsData = res?.data;
    return { chatSessionsData };
  } catch (error) {
    if (setDateError) setDateError(true);
  }
};
