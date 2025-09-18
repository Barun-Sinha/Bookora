import axios from "axios";
import React, {useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";

const LoginPage = () => {
const [userName, setUserName] = useState("barun1");
const [password, setPassword] = useState("123456");
const [email, setEmail] = useState("");
const [name, setName] = useState("");
const [showSignIn , setShowSignIn] = useState(false)
const [error, setError] = useState("");


const dispatch = useDispatch();
const navigate = useNavigate();

     const handleLogin = async (e) => {
        e.preventDefault();
    try {
      const res = await axios.post(
       "http://localhost:5000/api/auth/login",
        {
          emailOrUsername: userName,
          password: password,
        },
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred.");
      }
      console.log(err);
    }   
  };


  const registerUser = async (e) => {
    e.preventDefault();
    try{
        const res = await axios.post("http://localhost:5000/api/auth/register",{
            username: userName,
            password: password,
            fullName: name,
            email: email
        });
        console.log(res.data);
        setError("");

    }catch(err){
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
}    
  

  const handelSignIn = () => {
    setShowSignIn(!showSignIn)
  }


  return (
    <div className="min-h-screen flex items-start justify-center bg-base-200 pt-20">
      <div className="card w-full max-w-md shadow-xl bg-base-100 p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">{showSignIn ? "Sign-Up" : "Login"}</h2>

        <form onSubmit={showSignIn ? registerUser :  handleLogin} className="flex flex-col gap-4">
           {showSignIn && 
            <>
              <input
                type="name"
                placeholder="Full Name"
                className="input input-bordered w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              /> 
              <input
              tyre="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
            </>
          }
    
          <input
            type="name"
            placeholder="Username"
            className="input input-bordered w-full"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn btn-primary w-full mt-2">
            {showSignIn ? "Sign up" : "Login"}
          </button>
        </form>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>} 
        <div className="mt-4 flex gap-2 justify-center items-center">            
        <p className="text-center  text-sm">
            {showSignIn ? "Already have an account? " : "Don't have an account? "}
           
        </p>
         <p className="text-blue-500 hover:underline" onClick={handelSignIn}>
                {showSignIn ? "Login" : "Sign-up"}
            </p>
            </div>
      </div>
    </div>
  );
};

export default LoginPage;
