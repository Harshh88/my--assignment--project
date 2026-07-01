"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", { name, email, password });
      if (res.data?.success) {
        alert("Registration successful! Redirecting to login page.");
        router.push("/");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data?.error || err.message || "Network dynamic context failed";
      alert(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white flex flex-col justify-center items-center p-4 antialiased">
      <div className="w-full max-w-md bg-[#111] border border-[#1F1F1F] rounded-2xl p-6 sm:p-8 shadow-xl">
        <h2 className="text-xl font-black tracking-widest uppercase mb-6 text-center text-gray-200">CREATE ACCOUNT</h2>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <input 
            type="text" 
            placeholder="Enter your full name..." 
            value={name} 
            onChange={e => setName(e.target.value)} 
            className="w-full bg-[#161616] border border-[#222] px-4 py-2.5 text-xs font-semibold rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-gray-500 transition-all autofill:shadow-[inset_0_0_0_1000px_#161616] autofill:text-white [-webkit-text-fill-color:white]" 
            required 
          />
          <input 
            type="email" 
            placeholder="Enter your email address..." 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            className="w-full bg-[#161616] border border-[#222] px-4 py-2.5 text-xs font-semibold rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-gray-500 transition-all autofill:shadow-[inset_0_0_0_1000px_#161616] autofill:text-white [-webkit-text-fill-color:white]" 
            required 
          />
          <input 
            type="password" 
            placeholder="Create a strong password..." 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            className="w-full bg-[#161616] border border-[#222] px-4 py-2.5 text-xs font-semibold rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-gray-500 transition-all autofill:shadow-[inset_0_0_0_1000px_#161616] autofill:text-white [-webkit-text-fill-color:white]" 
            required 
          />
          
          <button 
            type="submit" 
            className="w-full bg-[#F7FFB0] text-black text-xs font-black tracking-widest py-3 rounded-xl uppercase hover:opacity-90 transition-all cursor-pointer"
          >
            SIGN UP
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Already have an account?{" "}
            <Link href="/" className="text-[#E2FF66] font-bold tracking-wider underline hover:opacity-80 transition-all">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}