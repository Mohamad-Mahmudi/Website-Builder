import { createUserWithEmailAndPassword } from "firebase/auth";
import AuthForm from "../../components/AuthForm";
import {auth} from "../../firebase";

export default function Register(){
    const handleRegister = async ({email,password}) =>{
        try{
            const userCredential = await createUserWithEmailAndPassword(auth,email,password);
            console.log("ثبت‌نام موفق:",userCredential.user);

        }catch(err){
            console.error("خطا در ثبت نام",err,message);
        }
        
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <AuthForm type="register" onSubmit={handleRegister}/>
        </div>
    );
}
