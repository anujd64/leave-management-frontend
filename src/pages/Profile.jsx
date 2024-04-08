import Layout from "../components/Layout";

// Sample data (you would fetch this from an API or database)
const userData = {
  fullName: "John Doe",
  username: "johndoe123",
  email: "johndoe@example.com",
  gender: "Male",
  department: "Engineering",
  manager: "Jane Smith",
};

export default function Profile() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="bg-white shadow-md rounded px-6 py-4 w-96">
          <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
          <div className="mt-2">
            <p>
              <strong>Full Name:</strong> {userData.fullName}
            </p>
            <p>
              <strong>Username:</strong> {userData.username}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Gender:</strong> {userData.gender}
            </p>
            <p>
              <strong>Department:</strong> {userData.department}
            </p>
            <p>
              <strong>Manager:</strong> {userData.manager}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
