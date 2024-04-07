import ApplyLeaveForm from "../components/ApplyLeaveForm";
import Layout from "../components/Layout";
export default function Leave() {
    return (
      <Layout>
      <div className="flex flex-col w-full">
        <h1 className="text-3xl font-bold text-white">Apply for Leave</h1>
        <ApplyLeaveForm/>
      </div>
      </Layout>
    );
  }
