import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { createElement, useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import Spinner from "../Components/Spinner";
import { toast } from "react-toastify";

function Signup()
{


    const {formData, setFormData} = useContext(AppContext);
    const navigate = useNavigate();

    const [showPassword, setshowPassword] = useState(false);
      const [loading, setLoading] = useState(false);
    
    const [types, settype] = useState("password");

    function typeChange()
    {
        setshowPassword(prev => !prev)
        if (types === "password")
        {
            settype("text")
        }
        else {
            settype("password")
        }
    }

     function changeHandler(event) {
    const { name, value } = event.target;
    setFormData(
      (prev)=>({...prev,[name]:value})
    )
    } 
    
     function submitHandler(event) {
    event.preventDefault();

    console.log("Finally printing the value of Form Data:");
    console.log(formData)
    }
    

const handleClick = () => {
 navigate("/login")
    };

    const createUser = async (event) => {
       setLoading(true);
    try {
       
        event.preventDefault();
        const savedUser = await fetch(  `${process.env.REACT_APP_BASE_URL}/sendotp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        });
     

        console.log("FORM RESPONSE......", savedUser);
   
        if (savedUser.ok)
        {

              navigate('/verify-email');
        }
        else {
                     toast.error('User already exists', {
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
        
         setLoading(false);
}

    

    return (
        <>
            <Navbar></Navbar>
    


            {
                loading?(<Spinner></Spinner>):(
          <div className="flex mt-32 w-full flex-col items-center justify-evenly ">
                <div className="text-[50px] text-center max-md:text-[24px] font-bold flex flex-col">Create an account<span className="text-[#343434] font-normal  text-[25px] max-sm:text-[14px]">Connect with Astrologers today!</span></div>
                <form onSubmit={submitHandler} className="flex gap-8 mt-8 flex-col">
                    <input required="true" name="firstName" onChange={changeHandler} value={formData.firstName} className=" border-[2px] max-[360px]:w-[240px] max-md:w-[300px] max-md:h-[48px] text-[16px] border-opacity-40  rounded-lg w-[500px] pl-3 h-[60px] outline-none border-stone-700" type="text" placeholder="Enter your Firstname"></input>
                    <input required="true" name="lastName" onChange={changeHandler} value={formData.lastName} className=" border-[2px] max-[360px]:w-[240px] text-[16px] max-md:w-[300px] max-md:h-[48px]  border-opacity-40  rounded-lg w-[500px] pl-3 h-[60px] outline-none border-stone-700" type="text" placeholder="Enter your last name"></input>
                     <input required="true" name="email" onChange={changeHandler} value={formData.email} className=" border-[2px] max-[360px]:w-[240px] text-[16px] max-md:w-[300px] max-md:h-[48px] border-opacity-40  rounded-lg w-[500px] pl-3 h-[60px] outline-none border-stone-700" type="text" placeholder="Enter your email"></input>
                    <input required="true" id="password" name="password" onChange={changeHandler} value={formData.password} className=" border-[2px] max-[360px]:w-[240px] max-md:w-[300px] max-md:h-[48px] text-[16px] border-opacity-40  rounded-lg w-[500px] pl-3 h-[60px] outline-none border-stone-700" type={types} placeholder="Enter your password">
                    </input>
                    <span className="translate-x-[450px] max-[360px]:translate-x-[200px] max-md:translate-x-[250px] max-md:translate-y-[-65px] translate-y-[-75px] cursor-pointer" onClick={typeChange}>{
               showPassword ?(<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"></AiOutlineEyeInvisible>):(<AiOutlineEye fontSize={24} fill="#AFB2BF"></AiOutlineEye>)
                    
                }
               </span>
                    <button onClick={createUser} className=" text-[16px] bg-[#FF8A00]  rounded-lg w-[500px] max-[360px]:w-[240px] max-md:w-[300px] max-md:h-[48px] pl-3 h-[60px] outline-none text-white border-stone-700">Sign up</button>
                    
                </form>
                <div className="text-[16px] mt-5">Already have an account ? <span className="text-[#FF8A00] cursor-pointer" onClick={handleClick}>Login</span>
</div>
            </div>)
            }
    
            <Footer></Footer>
        </>
    );
}

export default Signup;