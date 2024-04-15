import HelperToolTip from "./HelperToolTip";

export default function StatusIndicator({ status }) {
  const getStatusColor = (status) => {
    if (status === "approved") return "bg-green-500";
    if (status === "rejected") return "bg-red-500";
    if (status === "pending") return "bg-yellow-500";
  };

  return (
    <div
      className={`absolute drop-shadow-lg -top-1 -right-1 w-4 h-4 rounded-full ${getStatusColor(
        status
      )}`}
    >
      <div className="relative group w-full h-full">
      <HelperToolTip className="right-1 top-5 w-20 h-8" text={status} />
      </div>
    </div>
  );
}
