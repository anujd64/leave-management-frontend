import Layout from "../components/Layout";

// Mock data for leave history
const leaveHistoryData = [
  {
    id: 1,
    startDate: "2023-03-01",
    endDate: "2023-03-05",
    type: "Vacation",
    status: "Approved"
  },
  {
    id: 2,
    startDate: "2023-04-15",
    endDate: "2023-04-18",
    type: "Sick Leave",
    status: "Approved"
  },
  {
    id: 3,
    startDate: "2023-05-20",
    endDate: "2023-05-21",
    type: "Personal Leave",
    status: "Pending"
  },
];

export default function LeaveHistory() {
  return (
    <Layout>
      <div className="flex flex-col w-full">
        <h1 className="text-3xl font-bold text-white mb-4">Leave History</h1>
        <div className="bg-white rounded-lg shadow-md p-4">
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-2">ID</th>
                <th className="py-2">Start Date</th>
                <th className="py-2">End Date</th>
                <th className="py-2">Type</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveHistoryData.map((leave) => (
                <tr key={leave.id}>
                  <td className="py-2">{leave.id}</td>
                  <td className="py-2">{leave.startDate}</td>
                  <td className="py-2">{leave.endDate}</td>
                  <td className="py-2">{leave.type}</td>
                  <td className="py-2">
                    <span
                      className={`${
                        leave.status === "Approved"
                          ? "text-green-600"
                          : leave.status === "Pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
