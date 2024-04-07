import LeaveRequestForm from "../components/ApplyLeaveForm";
import Layout from "../components/Layout";
import LeaveHistory from "../components/LeaveHistory";
export default function Leave() {
    return (
      <Layout>
      <div className="flex lg:flex-row flex-col w-full">
      <div className="lg:w-1/2">
          <LeaveHistory />
        </div>
        <div className="lg:w-1/2">
        <LeaveRequestForm/>
        </div>
      </div>
      </Layout>
    );
  }
