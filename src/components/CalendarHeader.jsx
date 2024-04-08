import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

export default function CalendarHeader({ increment, decrement, handleClick }) {
  const monthIndex = useContext(GlobalContext).monthIndex;
  return (
    <div className="flex flex-row items-center w-full justify-between px-4 pb-4 text-white font-bold select-none">
      <div className="">{dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}</div>
      <div className="flex flex-row px-4 gap-4">
      <div className="cursor-pointer p-2 bg-gray-600 rounded-lg" onClick={handleClick}>Today</div>
      <div className="cursor-pointer p-2 bg-gray-600 flex items-center rounded-lg" onClick={decrement}><MdOutlineArrowBackIos/></div>
      <div className="cursor-pointer p-2 bg-gray-600 flex items-center rounded-lg" onClick={increment}><MdOutlineArrowForwardIos/></div>
      </div>
    </div>
  );
}
