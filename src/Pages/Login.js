import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Navbar from "../Components/Navbar";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";
import Spinner from "../Components/Spinner";

function Login() {
    const navigate = useNavigate();

    const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
    const [showPassword, setshowPassword] = useState(false);
    const { savedUser, setSavedUser } = useContext(AppContext);
     const [loading, setLoading] = useState(false);
    const { formData, setFormData } = useContext(AppContext);
    const { userData, setUserData } = useContext(AppContext);

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
    const { name, value, type } = event.target;
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
navigate("/signup");
    };

    const forgotPassword = () => {
        navigate("/forgot")
    };


  const createUser = async (event) => {
       setLoading(true);
    try {
       
        event.preventDefault();
        const saveUser = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        });
        const response =await saveUser.json();
     

        console.log("FORM RESPONSE......", response);


        if (saveUser.ok)
        {
            setSavedUser(formData);
            setIsLoggedIn(true);
                  toast.success('Login Successful!', {
position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",

                  });
            navigate("/Astrologers")
        }
        else {
           
                toast.error('Wrong Password!', {
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
               toast.error('Something Went Wrong', {
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
        
         setLoading(false);
}

    return (
        <>
            <Navbar></Navbar>
            {
                loading ? (<Spinner></Spinner>):(  <div className="flex mt-32 w-full flex-col items-center justify-evenly ">
                <div className="text-[50px] text-center font-bold flex flex-col max-md:text-[24px]">Hi, Welcome Back!</div>
                <form onSubmit={submitHandler} className="flex mt-8 gap-5 flex-col">
                    <div className="flex flex-col">
                          <label for="email" className="text-[20px]">Email</label>
                     <input required="true" name="email" onChange={changeHandler} value={formData.email} className="max-md:w-[300px] max-[360px]:w-[240px] max-md:h-[48px] border-[2px] text-[16px] border-opacity-40  rounded-lg w-[500px] pl-3 h-[60px] outline-none border-stone-700" type="text" placeholder="Enter your email">
                    </input>
                  </div>
                    <div className="flex flex-col">
                         <label for='password' className="text-[20px]">Password</label>
                    <input required="true" name="password" onChange={changeHandler} value={formData.password} className="max-md:w-[300px] max-[360px]:w-[240px] max-md:h-[48px] border-[2px] text-[16px] border-opacity-40  rounded-lg w-[500px] pl-3 h-[60px] outline-none border-stone-700" type={types} placeholder="Enter your password"></input>
                        <span className="flex w-full justify-end text-[#FF8A00] cursor-pointer" onClick={forgotPassword}>Forgot Password?</span>
                     <span className="translate-x-[450px] max-[360px]:translate-x-[200px] max-md:translate-x-[250px] max-md:translate-y-[-55px] translate-y-[-65px] cursor-pointer" onClick={typeChange}>{
               showPassword ?(<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"></AiOutlineEyeInvisible>):(<AiOutlineEye fontSize={24} fill="#AFB2BF"></AiOutlineEye>)
                    
                }
                    </span>  </div>
                   
                   
                    <button onClick={createUser} className=" text-[16px] bg-[#FF8A00]  rounded-lg w-[500px] max-md:w-[300px] max-[360px]:w-[240px] max-md:h-[48px] pl-3 h-[60px] outline-none text-white border-stone-700">Login</button>
                    
                </form>
                 <div className="text-[16px] mt-5">Don't have an account ? <span className="text-[#FF8A00] cursor-pointer" onClick={handleClick}>Signup</span>
</div>
              
            </div>)
          }
            <Footer></Footer>
        </>
    );
}

export default Login;