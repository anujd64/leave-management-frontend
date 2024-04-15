import LeaveRequestForm from "../components/ApplyLeaveForm";
import Layout from "../components/Layout";
export default function Leave() {
    return (
      <Layout>
      <div className="flex lg:flex-row flex-col w-full">
        <LeaveRequestForm/>
      </div>
      </Layout>
    );
  }
