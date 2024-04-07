import Layout from "../components/Layout";

export default function Profile() {
  const employeeProfile = {
    name: "John Doe",
    email: "johndoe@example.com",
    joiningDate: "2022-01-01",
    city: "New York",
    phoneNumber: "+1 123 456 7890",
    role: "Software Engineer"
  };

  return (
    <Layout>
      <div className="flex flex-col w-full px-4 py-2 text-white">
        <h1 className="text-3xl font-bold mb-4">Profile </h1>
        <div className="mb-2">
          <strong className="mr-2">Name:</strong> {employeeProfile.name}
        </div>
        <div className="mb-2">
          <strong className="mr-2">Email:</strong> {employeeProfile.email}
        </div>
        <div className="mb-2">
          <strong className="mr-2">Joining Date:</strong>{" "}
          {employeeProfile.joiningDate}
        </div>
        <div className="mb-2">
          <strong className="mr-2">City:</strong> {employeeProfile.city}
        </div>
        <div className="mb-2">
          <strong className="mr-2">Phone Number:</strong>{" "}
          {employeeProfile.phoneNumber}
        </div>
        <div>
          <strong className="mr-2">Role:</strong> {employeeProfile.role}
        </div>
      </div>
    </Layout>
  );
}
