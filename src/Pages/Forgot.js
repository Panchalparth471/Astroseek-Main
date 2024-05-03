import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import Spinner from "../Components/Spinner";
function Forgot() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    function changeHandler(event)
    {
        setEmail(event.target.value);
    }

    
    function back(){
    
        navigate('/login');
    
    }
   
    


    const sendotp = async (event) => {
        setLoading(true);
    try {
        event.preventDefault();
        const savedUser = await fetch(  `${process.env.REACT_APP_BASE_URL}/reset-password-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email})
        });

        console.log("FORM RESPONSE......", savedUser);
        if (savedUser.ok)
        {
              toast.success('Email Sent Successfully', {
position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",

              });
            
            navigate('/check');
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
        
        setLoading(false);
}



    return (
        <>
            <Navbar></Navbar>
            {
                loading ? (<Spinner></Spinner>):( <div className="flex min-h-[450px] px-3 mt-32 flex-col items-center justify-evenly"> 
                <div className="text-[50px] max-md:text-[30px] font-bold">Reset Your Password</div>
                <div className="opacity-50 p-2 max-w-[400px] text-[18px]">Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery</div>
                <form onSubmit={sendotp} className="flex flex-col gap-6">
                      <input required="true" name="email" onChange={changeHandler} value={email} className=" border-[2px] max-[360px]:w-[240px] text-[16px] max-md:w-[300px] max-md:h-[48px] border-opacity-40  rounded-lg w-[500px] pl-3 h-[60px] outline-none border-stone-700" type="text" placeholder="Enter your email"></input>
                 <button className=" text-[16px] bg-[#FF8A00]  rounded-lg w-[500px] max-[360px]:w-[240px] max-md:w-[300px] max-md:h-[48px] pl-3 h-[60px] outline-none text-white border-stone-700">Reset Password</button>
                </form>
                <div className="cursor-pointer"><a href="/login">Back to login</a></div>
            </div>)
           }
            <Footer></Footer>
        
        
        </>
        
    );


}

export default Forgot;