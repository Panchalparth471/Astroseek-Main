import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function Check({})
{

    const navigate = useNavigate();
     function back(){
    
        navigate('/login');
    
    }

    function reset()
    {
        navigate('/forgot');
    }



   


  return (
        <>
            <Navbar></Navbar>
            <div className="flex min-h-[450px] px-3 mt-32 flex-col items-center justify-evenly"> 
                <div className="text-[50px] max-md:text-[30px] font-bold">Check Email</div>
                <div className="opacity-50 p-2 max-w-[400px] text-[18px]">Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery</div>
              
                     
                 <button onClick={reset} className=" text-[16px] bg-[#FF8A00]  rounded-lg w-[500px] max-[360px]:w-[240px] max-md:w-[300px] max-md:h-[48px] pl-3 h-[60px] outline-none text-white border-stone-700">Resend Email</button>
             
                <div onClick={back} className="cursor-pointer">Back to login</div>
            </div>
            <Footer></Footer>
        
        
        </>
        
    );
}

export default Check;