import { use, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function register(){
    const [name,setname] =useState("");
    const [email,setemail] =useState("");
    const [password,setpassword]=useState("");

    const navigate=useNavigate();

    const handleRegister =async()=>{
        try {
            await API.post("/auth/register",{
                name,
                amil,
                passsword
            });
            alert("Registered Successfully");
            navigate("/");
        } catch (err) {
            alert("Registration failed")
        }
    };
    return (
        <div>
            <h2>Register</h2>
            <input placeholder="Name" onChange={(e)=> setname(e.target.value)} />
            <input placeholder="Email" onChange={(e)=> setemail(e.target.value)} />
            <input placeholder="Password" type="password" onChange={(e)=>setpassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default register;