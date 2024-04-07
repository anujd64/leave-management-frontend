import React from "react";
import Layout from "../components/Layout";

export default function Contact() {
  const containerStyle = {
    backgroundColor: "#ffffff", // White background color
    minHeight: "100vh", // Ensures the background covers the entire viewport
    padding: "20px", // Adds some padding inside the container
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center w-full" style={containerStyle}>
        <h1 className="text-3xl font-bold">Contact Page</h1>
        
        <div className="mt-8">
          <p className="text-lg">
            Have a question or inquiry? Feel free to reach out to us via the following methods:
          </p>
          <ul className="list-disc ml-6 mt-4">
            <li>Email: contact@example.com</li>
            <li>Phone: +123-456-7890</li>
            <li>Address: 1234  City, Country</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
