import AuthForm  from "../../components/AuthForm";
import {auth} from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";



export default function Login(){
    const navigate =useNavigate();

    const handleLogin = async({email,password})=>{
        try{
            const userCredential = await signInWithEmailAndPassword(auth,email,password);
            console.log("ورود موفق",userCredential.user);
            navigate("/dashboard");
        }catch (err){
            console.error("خطا در ورود",err.message);
        }
    };
    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <AuthForm type="login" onSubmit={handleLogin}/>
        </div>
    );
}

