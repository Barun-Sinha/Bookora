import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showSignIn , setShowSignIn] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault();
    // handle login logic here
    console.log({ email, password });
  };

  const handelSignIn = () => {
    setShowSignIn(!showSignIn)
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-base-200 pt-20">
      <div className="card w-full max-w-md shadow-xl bg-base-100 p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">{showSignIn ? "Sign-Up" : "Login"}</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
           {showSignIn && <input
            type="name"
            placeholder="First Name"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />}
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <p className="text-center mt-4 text-sm">
            {showSignIn ? "Already have an account? " : "Don't have an account? "}
            <a className="text-blue-500 hover:underline" onClick={handelSignIn}>
                {showSignIn ? "Login" : "Sign-up"}
            </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
