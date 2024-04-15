import { useContext } from "react";
import Calendar from "../components/Calendar";
import HolidayDetails from "../components/HolidayDetails";
import Layout from "../components/Layout";
import LeaveBalance from "../components/LeaveBalance";
import GlobalContext from "../context/GlobalContext";
export default function Home() {
  const token = useContext(GlobalContext).token;
  if (!token) {
    window.location.href = "/login";
  }

  return (
    <Layout>
      <div className="flex lg:flex-row flex-col w-full">
        <div className="flex flex-col justify-center items-center lg:w-[70%]">
          <LeaveBalance />
          <Calendar />
        </div>
        <span className="lg:w-0.5 lg:h-[80vh] w-screen lg-0.5 my-8 bg-slate-700"></span>
        <HolidayDetails />
      </div>
    </Layout>
  );
}
