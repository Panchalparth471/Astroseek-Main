import Navbar from "../Components/Navbar";
import Navbar2 from "../Components/Navbar2";
import Footer from "../Components/Footer";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import Spinner from "../Components/Spinner";

function Compatibility()
{
     const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
    const [zodiac, setZodiac] = useState("0.aries");
    const [zodiac2, setZodiac2] = useState("0.aries");
    const [click, setClick] = useState(false);
    const [data, setData] = useState([]);
     const [loading, setLoading] = useState(false);
    let sign1;
    let sign2;
    function changeHandler(event)
    {
        setZodiac(event.target.value)
        console.log(zodiac);
        
      
    }

       function changeHandler2(event)
    {
        setZodiac2(event.target.value)
        console.log(zodiac2);
        
      
    }



    const submitHandler = async (event) => {
        setLoading(true);
        sign1 = zodiac.split('.')[0];
        sign2 = zodiac2.split('.')[0];
        
        console.log(sign1);
        console.log(sign2);
        event.preventDefault();

  const url =   `${process.env.REACT_APP_BASE_URL}/compatibility`;
const options = {
    method: 'POST',
      headers: {
                "Content-Type": "application/json",
            },
    body: JSON.stringify({sign1, sign2})
	
};

try {
	 const response = await fetch(url, options);
	const result = await response.json();
    console.log(result);
    setData(result.data);
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
                loading?(<Spinner></Spinner>):( <div className="flex min-h-[450px] px-3 mt-32 flex-col items-center justify-evenly"> 
                <div className="text-[50px] max-md:text-[30px] font-bold">Compatibility</div>
                <div className={click?("hidden"):("opacity-50 flex  justify-center text-center p-2 max-w-[400px] text-[18px]")}>Enter the zodiac signs you want to compare.</div>
                <form onSubmit={submitHandler} className={click?("hidden"):("flex flex-col gap-6")}>
                    <select onChange={changeHandler} value={zodiac} required="true" className=" border-[2px] max-[360px]:w-[240px] text-[16px] max-md:w-[300px] max-md:h-[48px] border-opacity-40  rounded-lg w-[500px] pl-3 h-[60px] outline-none border-stone-700" type="text" placeholder="Enter new password">
                        <option>0.aries</option>
                        <option>1.taurus</option>
                        <option>2.gemini</option>
                        <option>3.cancer</option>
                        <option>4.leo</option>
                        <option>5.virgo</option>
                        <option>6.libra</option>
                        <option>7.scorpio</option>
                        <option>8.saggitarius</option>
                        <option>9.capricorn</option>
                        <option>10.aquarius</option>
                         <option>11.pisces</option>
                    </select>
                    <select onChange={changeHandler2} value={zodiac2} className=" border-[2px] max-[360px]:w-[240px] text-[16px] max-md:w-[300px] max-md:h-[48px] border-opacity-40  rounded-lg w-[500px] pl-3 h-[60px] outline-none border-stone-700" >
                       <option>0.aries</option>
                        <option>1.taurus</option>
                        <option>2.gemini</option>
                        <option>3.cancer</option>
                        <option>4.leo</option>
                        <option>5.virgo</option>
                        <option>6.libra</option>
                        <option>7.scorpio</option>
                        <option>8.saggitarius</option>
                        <option>9.capricorn</option>
                        <option>10.aquarius</option>
                         <option>11.pisces</option>
                    </select>
                 <button  className=" text-[16px] bg-[#FF8A00]  rounded-lg w-[500px] max-[360px]:w-[240px] max-md:w-[300px] max-md:h-[48px] pl-3 h-[60px] outline-none text-white border-stone-700">Submit</button>
                </form>
                <div className={click ? ("hidden") : ("cursor-pointer")}><a href="/">Back to Home</a></div>

                <div className={click ? "visible flex w-3/4 min-h-[400px] flex-col text-[30px] max-sm:text-[20px] text-black justify-center gap-5 items-center p-2" : "hidden"}>
                    <h1 className="text-[30px] font-semibold">{data.compatibilityScore}</h1>
                    <p className="max-sm:text-[12px]">{data.compatibilityText}</p>
                    <p className="font-bold cursor-pointer"><a href="/">Back to Home</a></p>
                </div>
            </div>)
          } 
            <Footer></Footer>
        
        
        </>
        
        
        
    
    )
}

export default Compatibility;
