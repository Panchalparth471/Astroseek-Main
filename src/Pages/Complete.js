import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Complete()
{
  const navigate = useNavigate();


    function reset()
    {
        navigate('/login');
    }
  return (
        <>
            <Navbar></Navbar>
            <div className="flex min-h-[250px] px-3 mt-32 flex-col items-center justify-evenly"> 
                <div className="text-[50px] max-md:text-[30px] font-bold">Reset Complete!</div>
                <div className="opacity-50 p-2 max-w-[400px] text-[18px]">Your password is reset successfully</div>
              
                     
                 <button onClick={reset} className=" text-[16px] bg-[#FF8A00]  rounded-lg w-[500px] max-[360px]:w-[240px] max-md:w-[300px] max-md:h-[48px] pl-3 h-[60px] outline-none text-white border-stone-700">Return to login</button>
             

            </div>
            <Footer></Footer>
        
        
        </>
        
    );
}
export default Complete;