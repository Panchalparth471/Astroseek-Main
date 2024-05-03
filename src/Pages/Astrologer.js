import { useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import Astrologers from "../Components/Astrologers";
import Navbar2 from "../Components/Navbar2";
import Footer from "../Components/Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import img1 from "../Assets/Ellipse 41.png";
import img2 from "../Assets/Ellipse 42.png";
import img3 from "../Assets/Ellipse 45.png";
import { useNavigate } from "react-router-dom";
import Hamburger from 'hamburger-react';
import { Link } from "react-router-dom";
import { useState } from "react";


function Astrologer()
{
  const navigate = useNavigate();
  const { name, setName } = useContext(AppContext);
    const [data, setData] = useState([]);
    const { savedUser } = useContext(AppContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  let response;
    
      const Handler = () => {
    navigate("/login");
  };


  const fetchAstrologers = async () => {
    setLoading(true);
    try {
      const allAstrologers = await fetch(  `${process.env.REACT_APP_BASE_URL}/getAllAstrologers`);
      response = await allAstrologers.json();
      console.log(response);
      setData(response.astrologers);
      console.log("DATA", data);
      
    }

    catch (e)
    {
      console.log(e);
    }
    setLoading(false);
  }

    

    const [isOpen, setOpen] = useState(false)
     useEffect(() => {
    if (!isLoggedIn) {
      Handler();
       }
       
       fetchAstrologers();

     }, [isLoggedIn]);
  
  
  
    
    return (
        <>
            {
                isLoggedIn ? (<>
           
             <Navbar2></Navbar2>
            <div className="flex flex-col h-[700px] max-md:h-[1000px] mt-32 w-[100vw] items-center gap-16">
            <div className="w-full text-center font-semibold text-[#FF8A00] text-[50px]">Astrologers</div>
            <div className="flex  gap-8 justify-evenly w-[100vw] h-[300px] max-md:h-[1000px] max-md:flex-col max-md:items-center mx-auto max-sm:w-full">
             
               {
                  data.map((astrologer) => {
                    return (<Link to="profile"><div onClick={()=>{setName(astrologer.name)}} className="max-w-[360px] cursor-pointer max-md:w-[250px]  max-md:h-[250px]  h-[400px]  bg-[#FF8A00] text-white rounded-xl flex flex-col justify-center items-center">

                      <div className="flex py-4 flex-col h-full items-center justify-evenly  max-sm:gap-1 max-sm:p-0 p-4">
                        <p className="text-center w-full p-2 h-28 max-[400px]:h-20 text-[14px] max-[400px]:p-1 max-sm:text-[12px] max-[300px]:text-[9px]">{astrologer.Aboutme}</p>
                        <div className="h-28 w-28 p-1 justify-self-center mx-auto aspect-square flex justify-center items-center rounded-full  max-md:w-[50px] max-[400px]:h-[60px] max-[400px]:w-[60px]">
                          <img src={astrologer.image}></img>
                        </div>
                        <p className="text-[20px] font-medium max-sm:text-[15px] text-center  max-[300px]:text-[9px] w-28 h-12 md:w-44">{astrologer.name}
                          <p className="text-[15px] font-normal max-sm:text-[13px]">{astrologer.name}</p></p>

                      </div>
                    </div></Link>);
                    
                  })
                 }
              
         
            </div>
                    </div>
                     <Footer></Footer>
                </>
                ) : (null)
            }
           
        </>

    );
    
}

export default Astrologer;