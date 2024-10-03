import Form from "react-bootstrap/Form";
import { DateRangeProps } from "../../types";

interface DateRangeComponentProps {
  dateRange?: DateRangeProps;
  onChange?: (data?: any) => void;
}

const DateRange = ({ dateRange, onChange }: DateRangeComponentProps) => {
  return (
    <div>
      <div>
        <p className="text-[14px] font-normal">From</p>
        <Form.Control
          type="date"
          name="startDate"
          onChange={onChange}
          value={dateRange?.startDate}
          className="border-solid rounded-[4px] p-2 pr-6 text-[14px] font-[300] mt-2 border-[1px] w-full border-[#ccc]"
        />
      </div>
      <div className="my-3 w-full h-[1px] bg-[#ccc] m-auto" />
      <div>
        <p className="text-[14px] font-normal">To</p>
        <Form.Control
          type="date"
          name="endDaate"
          onChange={onChange}
          value={dateRange?.endDate}
          className="border-solid rounded-[4px] p-2 pr-6 text-[14px] font-[300] w-full mt-2 border-[1px] border-[#ccc]"
        />
      </div>
    </div>
  );
};

export default DateRange;
