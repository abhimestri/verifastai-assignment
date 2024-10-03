import moment from "moment";
import { MessageProps } from "../../types";

const MessageTile = ({ action, content, timestamp }: MessageProps) => {
  return action === "AI" ? (
    <div className="h-fit w-fit max-w-[70%] md:max-w-[52%] lg:max-w-[36%] my-3">
      <div className="px-[8px] py-[12px] bg-[#000929] rounded-b-[10px] rounded-r-[10px] text-[14px] text-white flex justify-start">
        {content}
      </div>
      <p className="text-[14px] pl-2 mt-1">{moment(timestamp)?.fromNow()}</p>
    </div>
  ) : (
    <div className="flex justify-end my-3">
      <div className="h-fit w-fit max-w-[70%] md:max-w-[52%] lg:max-w-[36%]">
        <div className="px-[8px] py-[12px] relative bg-[#2E3B5B] rounded-b-[10px] rounded-l-[10px] text-[14px] text-white">
          <p>{content}</p>
        </div>
        <p className="text-end text-[14px] pr-2 mt-1">
          {moment(timestamp)?.fromNow()}
        </p>
      </div>
    </div>
  );
};

export default MessageTile;
