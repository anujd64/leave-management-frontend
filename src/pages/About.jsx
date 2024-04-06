import React from "react";
import Layout from "../components/Layout";

export default function About() {
  const containerStyle = {
    backgroundColor: "#ffffff", // White background color
    minHeight: "100vh", // Ensures the background covers the entire viewport
    padding: "20px", // Adds some padding inside the container
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center w-full" style={containerStyle}>
        <h1 className="text-3xl font-bold text-black">About Us</h1>
        <p className="text-black">
          A robust Employee Leave Management System is a crucial component of
          any organization's human resources infrastructure. This system
          streamlines the process of requesting, approving, and tracking
          employee leave, providing numerous benefits for both employees and
          employers. Let's delve into the features and advantages of such a
          system.
        </p>

        <h2 className="text-xl font-bold mt-4 text-black">Features of an Employee Leave Management System:</h2>
        <ul className="list-disc ml-6 text-black">
          <li>Online Leave Requests:</li>
          <li>Automated Workflows:</li>
          <li>Real-Time Visibility:</li>
          <li>Leave Types:</li>
          <li>Customizable Policies:</li>
          <li>Calendar Integration:</li>
          <li>Notifications:</li>
          <li>Compliance and Regulations:</li>
          <li>Reporting and Analytics:</li>
        </ul>

        <h2 className="text-xl font-bold mt-4 text-black">Benefits of an Employee Leave Management System:</h2>
        <ul className="list-disc ml-6 text-black">
          <li>Efficiency:</li>
          <li>Transparency:</li>
          <li>Reduced Errors:</li>
          <li>Improved Compliance:</li>
          <li>Enhanced Planning:</li>
          <li>Employee Satisfaction:</li>
          <li>Cost Savings:</li>
          <li>Scalability:</li>
        </ul>

        <p className="text-black">
          In conclusion, an Employee Leave Management System is a vital tool
          for modern businesses to efficiently handle leave requests, ensure
          compliance, and enhance employee satisfaction. By leveraging
          automation and providing transparency, organizations can streamline
          processes, reduce errors, and ultimately create a healthier work
          environment for all.
        </p>
      </div>
    </Layout>
  );
}
