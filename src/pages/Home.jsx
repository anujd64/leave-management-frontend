import Calendar from "../components/Calendar";
import HolidayDetails from "../components/HolidayDetails";
import Layout from "../components/Layout";
import LeaveBalance from "../components/LeaveBalance";
export default function Home() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }

  return (
    <Layout>
      <div className="flex flex-row w-full">
        <HolidayDetails />
        <div className="flex flex-col w-1/2">
          <Calendar />
          <LeaveBalance />
        </div>
      </div>
    </Layout>
  );
}
