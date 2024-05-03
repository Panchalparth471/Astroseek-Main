import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import Navbar2 from "../Components/Navbar2";
import Footer from "../Components/Footer";
import Spinner from "../Components/Spinner";

function Profile() {
  const navigate = useNavigate();
  const { name } = useContext(AppContext);
  const [data, setData] = useState(null); // Initialize data as null
  const { isLoggedIn } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const Handler = () => {
    navigate("/login");
  };

  const fetchAstrologer = async () => {
    setLoading(true);
    try {
      const allAstrologers = await fetch(  `${process.env.REACT_APP_BASE_URL}/fetch-astrologer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      const response = await allAstrologers.json();
      console.log(response);
      setData(response.astro); // Set data to response.astro
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      Handler();
    }
    fetchAstrologer();
  }, [isLoggedIn]);

  return (
    <>
      <Navbar2 />
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col mt-32 w-[100vw] items-center justify-evenly">
          <div className="w-full text-center font-semibold text-[50px]">Profile</div>
          <div className="flex mt-5 justify-between w-2/3 max-md:flex-col max-md:justify-evenly max-md:w-[100vw] max-md:p-4 max-md:items-center">
            <div className="w-[250px] h-[250px] max-md:w-[130px] max-md:h-[130px] rounded-full">
              <img src={data?.image} alt="astro" className="w-full h-full rounded-full" />
            </div>
            <div className="flex flex-col justify-evenly items-center">
              <div className="text-[40px] max-md:text-[30px]">{data?.name}</div>
              <div className="text-[30px] max-md:text-[20px]">{data?.occupation}</div>
              <div className="text-[25px] max-md:text-[15px]">Experience:-5 Years</div>
              <div>
                <button className="text-[16px] mt-6 bg-[#FF8A00] rounded-lg w-[300px] max-md:w-[300px] max-[360px]:w-[200px] max-md:h-[35px] pl-3 h-[60px] outline-none text-white border-stone-700">Contact Now</button>
              </div>
            </div>
          </div>
          <div className="mt-20 flex flex-col max-md:items-center">
            <div className="text-[35px] p-6 font-semibold">About Me</div>
            <div className="text-[20px] p-6">{data?.Aboutme}</div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default Profile;
