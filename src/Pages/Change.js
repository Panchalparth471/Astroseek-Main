import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import { useLocation } from "react-router-dom";
import Footer from "../Components/Footer";
import { toast } from "react-toastify";
function Change()
{
    const location = useLocation();
     const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    function changeHandler(event) {
        setPassword(event.target.value);
    }

    function ConfirmHandler(event)
    {
        setConfirmPassword(event.target.value);
    }

    
    function back(){
    
        navigate('/complete');
    
    }

    function reset()
    {
        navigate('/login');
    }



     const changePassword = async (event) => {
         try {
             const token = location.pathname.split("/").at(-1);
        event.preventDefault();
        const savedUser = await fetch(  `${process.env.REACT_APP_BASE_URL}/reset-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({password,confirmPassword,token})
        });

        console.log("FORM RESPONSE......", savedUser);
        if (savedUser.ok)
        {
              toast.success('Password Changed Successfully', {
position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",

              });
            console.log("SAVED", savedUser);
            navigate('/complete');
        }
        else {
              toast.error('Passwords dont match', {
position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",

              });
        }
        
          

        
    }
    catch (error) {
        console.error("Error creating user:", error);
        toast.error('Something went wrong', {
position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",

              });
    }
}



    return (
        <>
            <Navbar></Navbar>
            <div className="flex min-h-[450px] px-3 mt-32 flex-col items-center justify-evenly"> 
                <div className="text-[50px] max-md:text-[30px] font-bold">Choose New Password</div>
                <div className="opacity-50 p-2 max-w-[400px] text-[18px]">Enter your new password and you’re all set.</div>
                <form onSubmit={changePassword} className="flex flex-col gap-6">
                    <input required="true" name="password" onChange={changeHandler} value={password} className=" border-[2px] max-[360px]:w-[240px] text-[16px] max-md:w-[300px] max-md:h-[48px] border-opacity-40  rounded-lg w-[500px] pl-3 h-[60px] outline-none border-stone-700" type="text" placeholder="Enter new password"></input>
                     <input required="true" name="confirmPassword" onChange={ConfirmHandler} value={confirmPassword} className=" border-[2px] max-[360px]:w-[240px] text-[16px] max-md:w-[300px] max-md:h-[48px] border-opacity-40  rounded-lg w-[500px] pl-3 h-[60px] outline-none border-stone-700" type="text" placeholder="Confirm new password"></input>
                 <button  className=" text-[16px] bg-[#FF8A00]  rounded-lg w-[500px] max-[360px]:w-[240px] max-md:w-[300px] max-md:h-[48px] pl-3 h-[60px] outline-none text-white border-stone-700">Reset Password</button>
                </form>
                <div onClick={reset} className="cursor-pointer">Back to login</div>
            </div>
            <Footer></Footer>
        
        
        </>
        
    );

}
export default Change