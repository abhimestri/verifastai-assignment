import axios from "axios";

export const getChatList = async (pageCountDetails: any) => {
  try {
    const res = await axios.get(
      `https://admin-backend-docker-india-306034828043.asia-south2.run.app/nlp/api/chat_sessions?page=${pageCountDetails?.currentPage}&per_page=50`
    );
    const chatSessionsData = res?.data;
    console.log({ chatSessionsData });
    return { chatSessionsData };
  } catch (error) {
    console.error("Error fetching chat sessions:", error);
  }
};
