import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { ReactComponent as SearchIcon } from "../assets/icons/Search.svg";
import { ReactComponent as FilterIcon } from "../assets/icons/FilterIcon.svg";
import DateRange from "../components/DateRange/DateRange";
import { Form, InputGroup } from "react-bootstrap";
import moment from "moment";
import { ActionBarProps } from "../types";

const ActionBar = ({
  handleFilter,
  handleSearch,
  dateRange,
}: ActionBarProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isDateInvalid, setIsDateInvalid] = useState<boolean>(false);

  useEffect(() => {
    if (moment(dateRange?.startDate)?.isAfter(dateRange?.endDate)) {
      setIsDateInvalid(true);
    } else {
      setIsDateInvalid(false);
    }
  }, [dateRange]);

  return (
    <div>
      <div className="flex justify-between items-center z-[10] top-[60px] px-6 py-3 font-medium text-[18px] bg-[#fff]">
        <div>
          <p>Messaging</p>
        </div>
        <div>
          <Dropdown onToggle={() => setOpen(!open)} show={open}>
            <Dropdown.Toggle
              id="dropdown-basic"
              className="bg-white text-black border-none border-0"
              style={{
                borderRadius: "10px",
                width: "fit-content",
                height: "34px",
              }}
            >
              <FilterIcon className="cursor-pointer" />
            </Dropdown.Toggle>

            <Dropdown.Menu
              style={{
                opacity: 1,
                zIndex: 10,
                width: "20vw",
                borderRadius: "10px",
              }}
            >
              <div className="p-[20px]">
                <div className="mb-3">
                  <p className="text-[14px]">Filter by date</p>
                </div>
                <DateRange dateRange={dateRange} onChange={handleFilter} />
                <p className="text-[10px] w-full text-[#fe1616] opacity-[0.8] mt-1 font-normal">
                  {isDateInvalid
                    ? "Start date can't be more than End date"
                    : ""}
                </p>
                <p className="text-[10px] w-full text-[#333] opacity-[0.8] mt-2 font-normal">
                  Note: Filter will only be applied if valid start and end date
                  is provided
                </p>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="relative px-2 my-2">
        <InputGroup className="mb-3 h-[40px]">
          <InputGroup.Text id="basic-addon1" style={{ background: "#fff" }}>
            <SearchIcon className=" opacity-[0.4]" />
          </InputGroup.Text>
          <Form.Control
            placeholder="search for chat"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={handleSearch}
          />
        </InputGroup>
      </div>
    </div>
  );
};

export default ActionBar;
