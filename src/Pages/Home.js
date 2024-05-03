import Navbar from "../Components/Navbar";
import Main from "../Components/Main";
import Icons from "../Components/Icons";
import Services from "../Components/Services";
import What from "../Components/What";
import Astrologers from "../Components/Astrologers";
import Why from "../Components/Why";
import Footer from "../Components/Footer";
import Navbar2 from "../Components/Navbar2";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
function Home()
{
      const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
    return (
        <>
           <Navbar></Navbar>
      <Main></Main>
      <Icons></Icons>
      <Services></Services>
      <What></What>
      <Astrologers></Astrologers>
      <Why></Why>
            <Footer></Footer>
            </>
    )
}

export default Home;