import { useState } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { useFormAction, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function Verify()
{
    const [otp, setOtp] = useState();
    const { formData, setFormData } = useContext(AppContext);
    
    const navigate = useNavigate();
    function back() {
        navigate("/signup");
    }


    function changeHandler(event)
    {
        setOtp(event.target.value);
    }


    function submitHandler(event)
    {
        setOtp(event.target.value);
             event.preventDefault();
        createUser();

    }


    
   const createUser = async () => {
    try {
        const savedUser = await fetch(  `${process.env.REACT_APP_BASE_URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...formData, otp }),
        });

        if (!savedUser.ok) {
           
            throw new Error(`Failed to create user: ${savedUser.status}`);
            
        }

        console.log("FORM RESPONSE......", savedUser);
              toast.success('User Signedup Successfully', {
position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",

              });
        
     navigate("/login");
    } catch (error) {

                toast.error('Wrong Otp', {
position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",

});
        console.error("Error creating user:", error);
      
    }
};


const sendotp = async (event) => {
    try {
        event.preventDefault();
        const savedUser = await fetch(  `${process.env.REACT_APP_BASE_URL}/sendotp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        });

        if (savedUser.ok)
        {
             console.log("FORM RESPONSE......", savedUser);
         toast.success('Otp Sent Successfully', {
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

        
    } catch (error) {
        console.error("Error creating user:", error);
        // Handle error appropriately
    }
}


    return (
        <>
            <Navbar></Navbar>
             <div className="flex min-h-[450px] px-3 mt-32 flex-col items-center justify-evenly"> 
                <div className="text-[50px] max-md:text-[30px] font-bold">Check Email</div>
                <div className="opacity-50 p-2 max-w-[400px] text-[18px]">A verification code has been sent to you. Enter the code below</div>
              
                      <input required="true" name="otp" onChange={changeHandler} value={otp} className=" border-[2px] max-[360px]:w-[240px] text-[16px] max-md:w-[300px] max-md:h-[48px] border-opacity-40  rounded-lg w-[500px] pl-3 h-[60px] outline-none border-stone-700" type="text" placeholder="Enter your otp"></input>
                 <button onClick={submitHandler}  className=" text-[16px] bg-[#FF8A00]  rounded-lg w-[500px] max-[360px]:w-[240px] max-md:w-[300px] max-md:h-[48px] pl-3 h-[60px] outline-none text-white border-stone-700">Submit</button>
             
                <div className="flex gap-20 justify-between"> 
                    <div onClick={back} className="cursor-pointer">Back to Signup</div>
                    <div onClick={sendotp} className="cursor-pointer text-[#FF8A00]">Resend OTP</div>
               </div>
            </div>
        
        <Footer></Footer></>
    )
}

export default Verify;