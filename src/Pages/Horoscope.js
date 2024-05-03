import Navbar from "../Components/Navbar";
import Navbar2 from "../Components/Navbar2";
import Footer from "../Components/Footer";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { useState } from "react";
import Spinner from "../Components/Spinner";

function Horoscope()
{
    const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
    console.log("islogged",isLoggedIn);
    const [zodiac, setZodiac] = useState("1.aries");
    const [day, dayHandler] = useState("today");
    const [click, setClick] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    let sign;
    function changeHandler(event)
    {
        setZodiac(event.target.value)
        console.log(zodiac);
        
      
    }




    const submitHandler = async (event) => {
        setLoading(true);
         sign = zodiac.split('.')[0];
        console.log(sign);
        console.log(day);
        event.preventDefault();

  const url =   `${process.env.REACT_APP_BASE_URL}/horoscope`;
const options = {
    method: 'POST',
      headers: {
                "Content-Type": "application/json",
            },
    body: JSON.stringify({sign, day})
	
};

try {
	 const response = await fetch(url, options);
	const result = await response.json();
    console.log(result);
    setData(result.data.horoscopeText);
    console.log("data", data);
    setClick(true);
} catch (error) {
	console.error(error);
        }
        setLoading(false);
    }
    



    return (

              <>
        <Navbar></Navbar>
            {
                loading ? (<Spinner></Spinner>) : (
                     <div className="flex min-h-[450px] px-3 mt-32 flex-col items-center justify-evenly"> 
                <div className="text-[50px] max-md:text-[30px] font-bold">Horoscope</div>
                <div className={click?("hidden"):("opacity-50 flex  justify-center text-center p-2 max-w-[400px] text-[18px]")}>Enter your zodiac sign to get your daily horoscope.</div>
                <form onSubmit={submitHandler} className={click?("hidden"):("flex flex-col gap-6")}>
                    <select onChange={changeHandler} value={zodiac} required="true" className=" border-[2px] max-[360px]:w-[240px] text-[16px] max-md:w-[300px] max-md:h-[48px] border-opacity-40  rounded-lg w-[500px] pl-3 h-[60px] outline-none border-stone-700" type="text" placeholder="Enter new password">
                        <option>1.aries</option>
                        <option>2.taurus</option>
                        <option>3.gemini</option>
                        <option>4.cancer</option>
                        <option>5.leo</option>
                        <option>6.virgo</option>
                        <option>7.libra</option>
                        <option>8.scorpio</option>
                        <option>9.saggitarius</option>
                        <option>10.capricorn</option>
                        <option>11.aquarius</option>
                         <option>12.pisces</option>
                    </select>
                    <select onChange={dayHandler} value={day}  className=" border-[2px] max-[360px]:w-[240px] text-[16px] max-md:w-[300px] max-md:h-[48px] border-opacity-40  rounded-lg w-[500px] pl-3 h-[60px] outline-none border-stone-700" >
                        <option>today</option>
                        <option>tomorrow</option>
                        <option>yesterday</option>
                    </select>
                 <button  className=" text-[16px] bg-[#FF8A00]  rounded-lg w-[500px] max-[360px]:w-[240px] max-md:w-[300px] max-md:h-[48px] pl-3 h-[60px] outline-none text-white border-stone-700">Submit</button>
                </form>
                <div className={click ? ("hidden") : ("cursor-pointer")}><a href="/">Back to Home</a></div>

                <div className={click ? "visible flex w-3/4 min-h-[400px] text-[30px] max-sm:text-[20px] text-black justify-center p-2" : "hidden"}>{data}</div>
            </div>
                )
           }
            <Footer></Footer>
        
        
        </>
        
        
        
    
    )
}

export default Horoscope;
