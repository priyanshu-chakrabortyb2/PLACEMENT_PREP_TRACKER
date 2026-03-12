import { useState } from "react";
import API from "../services/api";
import {useNavigate}from "react-router-dom";
function Login(){
    const [email,setemail] =useState("");
    const [password,setpassword]=useState("");
    const navigate=useNavigate();

    const handleLogin =async()=>{
        try{
            const res=await API.post("/auth/login",{email,password});
            localStorage.setItem("token",res.data.token);
            navigate("/dashboard");
        }
        catch(err){
            alert("Login Failed");
        }
    };

    return(
        <div>
            <h2>Login</h2>
            <input placeholder="Email" onChange={(e)=> setemail(e.target.value)} />
            <input placeholder="Password" type="password" onChange={(e)=>setpassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;