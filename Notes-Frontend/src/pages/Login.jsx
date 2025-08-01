import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/noteService";
import Loadercomp from "../components/LoaderComp";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const[loading, setLoading] = useState(false);
  const nvg = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      nvg("/home");
    }
  }, [nvg]);
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await login(email, password);
      localStorage.setItem("token", res.data);
      setError("");
     
      nvg("/home");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <>{loading ? <Loadercomp/> : 
    <div className="min-h-screen bg-gradient-to-br bg-[#1f1f1f] flex justify-center items-center px-4">
      <div className="bg-[#202124] p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Forgot Password Link */}
          <div className="text-right text-sm">
            <button
              type="button"
              onClick={() => nvg("/forget-password")}
              className="text-blue-400 hover:underline mt-1"
            >
              Forgot Password?
            </button>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200 py-2 rounded-lg text-white font-semibold text-lg shadow-md"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?
          <button
            onClick={() => nvg("/signup")}
            className="ml-1 text-blue-400 hover:underline"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
}
     </>
  );
};

export default Login;
