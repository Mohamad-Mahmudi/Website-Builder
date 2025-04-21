import React, { useState } from "react";
export default function AuthForm({type = "login",onSubmit}){
    const [email,setEmail] = useState('');
    const [password , setPassword] = useState("");

    const isLogin = type ==="login";

    return(
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-txl font-bold text-center">
                {isLogin ? "Login to your account" : "crete a new account"}
            </h2>
            <form
            className="space-y-4"
            onSubmit={(e)=>{
                e.preventDefault();
                onSubmit({email , password});

            }}
            
            >
                <input
                type="email"
                className="w-full p-3 border rounded=xl"
                placeholder="Email address"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                required
                />
                
                <input
                type="password"
                className="w-full p-3 border rounded-xl"
                placeholder="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                required
                />
                <button
                tyoe="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition"

                >
                    {isLogin ? "Login": "Register"}
                </button>
            </form>
        </div>
    );
}

