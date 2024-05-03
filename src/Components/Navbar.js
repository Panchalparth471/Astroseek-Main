import Hamburger from 'hamburger-react';
import { useNavigate } from "react-router-dom";

import { useState } from "react";
function Navbar() {

    const [isOpen, setOpen] = useState(false)
    const navigate = useNavigate();


const handleClick = () => {
navigate("/signup");
    };
    
    return (
    
               <div className="flex fixed bg-white z-[1000] flex-row justify-between w-[100vw] h-[80px] shadow-md">
            <div className="p-2 ml-5 text-[30px] max-lg:text-[20px] max-lg:ml-4 flex justify-center items-center">AstroSeek</div>
            <div className="flex text-[20px] max-lg:text-[13px] gap-4 max-lg:gap-2 mr-10 max-md:hidden">
                <div className="p-4 flex justify-center items-center cursor-pointer hover:scale-110 transition-all"><a href='/'>Home</a></div>
                <div className="p-4 flex justify-center items-center cursor-pointer hover:scale-110 transition-all"><a href='/compatibility'>Compatibility</a></div>
                <div className="p-4 flex justify-center items-center  cursor-pointer hover:scale-110 transition-all"><a href='/horoscope'>Horoscope</a></div>
                <div className="p-4 flex justify-center items-center cursor-pointer hover:scale-110 transition-all"><a href='/signup'>Chat with Astrologer</a></div>
                 <div className=" p-4 relative flex justify-center items-center">
                    <button onClick={handleClick} className="w-[100px] h-[50px] max-lg:w-[80px] max-lg:h-[40px] top-0 bg-[#FF8A00]">Signup</button>
                </div>
            </div>
           
   <div className='md:hidden mt-3 absolute flex justify-center items-center right-0 z-[100000000]'><Hamburger toggled={isOpen} toggle={setOpen} color="orange"/></div>
            
            


 <div id="box" className={`top-0 pt-5 z-[150] flex flex-col md:hidden ${isOpen ? 'bg-[#FF8A00] justify-center h-[100vh] max-[300px]:w-[80%] w-[70%] transition-translate-x duration-150 ease-in-out translate-x-0 ' : 'w-[80vw] transition-translate-x duration-150 ease-in-out h-screen translate-x-72' } items-end gap-10 text-white`}>
   
    {
        isOpen ? (
            <div className='flex flex-col w-full justify-start gap-8 mb-24'>
                <a href="/" className="place-self-center" >Home</a>
                <a href="/compatibility" className="place-self-center">Compatibility</a>
                <a href="/horoscope" className="place-self-center">Horoscope</a>
                <a href="/signup" className="place-self-center">Chat With Astrologer</a>
     
                <div className='place-self-center mb-7'> <button onClick={handleClick} className="w-[100px] h-[50px] text-[#FF8A00] bg-white">Signup</button></div>
                
            </div>
        ) : null
    }
</div> 
             
            
 

        </div>

        

            
    );
      
}

export default Navbar;











