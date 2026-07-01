"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../lib/api";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMode, setLoginMode] = useState("USER");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.data?.success) {
        const loggedInRole = res.data.safeUser.role;
        if (loginMode !== loggedInRole) {
          alert(`Access Denied: You are trying to login as ${loggedInRole} while interface is set to ${loginMode} mode.`);
          return;
        }
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", loggedInRole);
        alert(`${loginMode} login successful`);
        router.push("/dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const switchMode = (mode) => {
    setLoginMode(mode);
    alert(`Switched to ${mode} mode. Please enter your credentials.`);
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white flex flex-col justify-center items-center p-4 antialiased">
      <div className="w-full max-w-md bg-[#111] border border-[#1F1F1F] rounded-2xl p-6 sm:p-8 shadow-xl">
        <h2 className="text-xl font-black tracking-widest uppercase mb-6 text-center text-gray-200">
          {loginMode} LOGIN
        </h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex flex-col gap-1">
            <input 
              type="email" 
              placeholder={`Enter your ${loginMode.toLowerCase()} email...`} 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="w-full bg-[#161616] border border-[#222] px-4 py-2.5 text-xs font-semibold rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-gray-500 transition-all autofill:shadow-[inset_0_0_0_1000px_#161616] autofill:text-white [-webkit-text-fill-color:white]" 
              required 
            />
          </div>

          <div className="flex flex-col gap-1">
            <input 
              type="password" 
              placeholder="Enter your security password..." 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="w-full bg-[#161616] border border-[#222] px-4 py-2.5 text-xs font-semibold rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-gray-500 transition-all autofill:shadow-[inset_0_0_0_1000px_#161616] autofill:text-white [-webkit-text-fill-color:white]" 
              required 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#F7FFB0] text-black text-xs font-black tracking-widest py-3 rounded-xl uppercase hover:opacity-90 transition-all cursor-pointer"
          >
            SIGN IN AS {loginMode}
          </button>
        </form>

        <div className="mt-5 text-center">
          <p className="text-xs text-gray-500">
            Don't have an account?{" "}
            <Link href="/register" className="text-[#E2FF66] font-bold tracking-wider underline hover:opacity-80 transition-all">
              Register here
            </Link>
          </p>
        </div>

        <div className="mt-8 pt-4 border-t border-[#1F1F1F]">
          <p className="text-[10px] text-gray-600 font-bold tracking-widest text-center mb-3">SWITCH LOGIN INTERFACE</p>
          <div className="flex gap-2 justify-center">
            <button 
              onClick={() => switchMode("ADMIN")} 
              className={`text-[10px] font-black tracking-wider px-3 py-2 rounded-xl transition-all cursor-pointer border ${
                loginMode === "ADMIN" 
                  ? "bg-emerald-950/50 border-emerald-500 text-emerald-400" 
                  : "bg-emerald-950/10 border-emerald-900/30 text-emerald-600 hover:bg-emerald-950/30"
              }`}
            >
              🚀 ADMIN MODE
            </button>
            <button 
              onClick={() => switchMode("USER")} 
              className={`text-[10px] font-black tracking-wider px-3 py-2 rounded-xl transition-all cursor-pointer border ${
                loginMode === "USER" 
                  ? "bg-sky-950/50 border-sky-500 text-sky-400" 
                  : "bg-sky-950/10 border-sky-900/30 text-sky-600 hover:bg-sky-950/30"
              }`}
            >
              👤 USER MODE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}