import { useContext } from "react";
import Calendar from "../components/Calendar";
import HolidayDetails from "../components/HolidayDetails";
import Layout from "../components/Layout";
import LeaveBalance from "../components/LeaveBalance";
import GlobalContext from "../context/GlobalContext";
export default function Home() {
  const token = useContext(GlobalContext).token;
  console.log("token in Home: ", token);
  if (!token) {
    window.location.href = "/login";
  }

  return (
    <Layout>
      <div className="flex lg:flex-row flex-col w-full">
        <HolidayDetails />
        <div className="flex flex-col lg:w-1/2">
          <LeaveBalance />
          <Calendar />
        </div>
      </div>
    </Layout>
  );
}
