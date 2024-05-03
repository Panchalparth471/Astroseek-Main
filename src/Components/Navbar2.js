import Hamburger from 'hamburger-react';
import { useNavigate } from "react-router-dom";

import { useContext, useState } from "react";
import { AppContext } from '../Context/AppContext';
import { toast } from "react-toastify";
function Navbar2() {

    const [isOpen, setOpen] = useState(false)
    const navigate = useNavigate();
    const { formData, setFormData } = useContext(AppContext);
    
    const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);

    const imageHandler = () => {
         
        setIsLoggedIn(false);
        navigate("/login");
        toast.success('Log Out Successful!', {
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
const handleClick = () => {
navigate("/signup");
    };
    
    return (
    
               <div className="flex fixed bg-white z-[1000] flex-row justify-between w-[100vw] h-[80px] shadow-md">
            <div className="p-2 ml-5 text-[30px] max-lg:text-[20px] max-lg:ml-4 flex justify-center items-center">AstroSeek</div>
            <div className="flex text-[20px] max-lg:text-[13px] gap-4 max-lg:gap-2 mr-10 max-md:hidden">
                <div className="p-2 flex justify-center items-center cursor-pointer hover:scale-110 transition-all"> <a href="/" className="place-self-center" >Home</a></div>
                <div className="p-2 flex justify-center items-center cursor-pointer hover:scale-110 transition-all"><a href='/compatibility'>Compatibility</a></div>
                <div className="p-2 flex justify-center items-center  cursor-pointer hover:scale-110 transition-all"><a href='/horoscope'>Horoscope</a></div>
                <div className="p-2 flex justify-center items-center cursor-pointer hover:scale-110 transition-all">Chat with Astrologer</div>
                 <div className=" gap-2 p-2 relative flex justify-center items-center">
                    {formData.email.split("@")[0]} <div className='rounded-full w-[40px] h-[40px] bg-[#FF8A00]'>
                       <img onClick={imageHandler} className='w-full cursor-pointer h-full rounded-full' src={`https://api.dicebear.com/5.x/initials/svg?seed=${formData.email}`} />
                   </div>
                </div>
            </div>
           
   <div className='md:hidden mt-3 absolute flex justify-center items-center right-0 z-[100000000]'><Hamburger toggled={isOpen} toggle={setOpen} color="orange"/></div>
            
            


 <div id="box" className={`top-0 pt-5 z-[150] flex flex-col md:hidden ${isOpen ? 'bg-[#FF8A00] justify-center h-[100vh] max-[300px]:w-[90vw] w-[85vw] transition-translate-x duration-150 ease-in-out translate-x-0 ' : 'w-[85vw]  transition-translate-x duration-150 ease-in-out h-screen translate-x-72' } items-end gap-10 text-white`}>
   
    {
        isOpen ? (
            <div className='flex flex-col w-full justify-start gap-8 mb-24'>
                <a href="/" className="place-self-center" >Home</a>
                <a href="/compatibility" className="place-self-center">Compatibility</a>
                <a href="/horoscope" className="place-self-center">Horoscope</a>
                <a href="/" className="place-self-center">Chat With Astrologer</a>
       <div className=" gap-2 p-2 relative flex justify-center max-[300px]:text-[12px] items-center">
                    {formData.email.split("@")[0]} <div className='rounded-full max-[300px]:w-[25px] max-[300px]:h-[25px] w-[40px] h-[40px] bg-[#FF8A00]'>
                       <img  onClick={imageHandler} className='w-full  h-full rounded-full' src={`https://api.dicebear.com/5.x/initials/svg?seed=${formData.email}`} />
                                </div>
                                </div>

                
            </div>
        ) : null
    }
</div> 
             
            
 

        </div>

        

            
    );
      
}

export default Navbar2;











