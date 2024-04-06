import { useEffect,useState } from "react";
import Layout from "../components/Layout";

export default function LoginForm(
  {handleRegisterClick}
) {

    const [loginData, setLoginData] = useState({});
    const [formDataFinal, setFormDataFinal] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    
    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
        const data = {};
        formData.forEach((value, key) => {
          data[key] = value;
        });
        setFormDataFinal(data);
        console.log(data); 
      };


      useEffect(() => {
        if(loginData.jwtToken
          && loginData.userDetails) {
            localStorage.setItem('token', loginData.jwtToken.toString());
            localStorage.setItem('employeeId', loginData.userDetails.employeeId);
            localStorage.setItem('username', loginData.userDetails.username);
            localStorage.setItem('email', loginData.userDetails.email);

            window.location.href = "/";
          }
      } , [loginData]);

      useEffect(() => {
        const createEmployee = async () =>
        {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formDataFinal)
            };
            await fetch('http://localhost:8080/auth/login-employee', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setLoginData(data);
                console.log(data)
            })
            .catch((error) =>{
              console.log("error: ",JSON.stringify(error))
              // setErrorMessage(error);
            } 
          );
        }
        createEmployee();
      }, [formDataFinal]);


  return (
    <Layout>
    <div className="flex flex-col items-center justify-center w-full text-white">
      <h1 className="text-3xl font-bold">Login Form</h1>
      <form className="flex flex-col py-4 w-2/4 items-center justify-center gap-3 font-semibold" onSubmit={(e) => handleSubmit(e)}>
        <div className="grid grid-cols-2 grid-rows-1">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username or Email"
            className="border-2 px-4 py-2 rounded-lg text-black"
          />
        </div>
        <div className="grid grid-cols-2 grid-rows-1">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border-2 px-4 py-2 rounded-lg text-black"
          />
        </div>
        <button className=" self-center p-3 px-6 bg-blue-400 rounded-lg">
          Log in
        </button>

        {/* {
          errorMessage && <span>
            {errorMessage}
          </span>
        } */}
      </form>

      <p className="text-center text-gray-400">
        Don&apos;t have an account ? <span> </span>
        <a href="/register" className="text-blue-700">
          Register here.
        </a>
      </p>
    </div>
    </Layout>
  );
}