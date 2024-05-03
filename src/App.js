import "./App.css";
import { Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Forgot from "./Pages/Forgot";
import Check from "./Pages/Check";
import Change from "./Pages/Change";
import Complete from "./Pages/Complete";
import Verify from "./Pages/Verify";
import Astrologer from "./Pages/Astrologer";
import Horoscope from "./Pages/Horoscope";
import Compatibility from "./Pages/Compatibility";
import Profile from "./Pages/Profile";
function App() {

  return (
    <div className="flex h-full w-[100vw] flex-col">
      <Routes>
        <Route path="/" element={<Home></Home>}>      </Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/forgot" element={<Forgot></Forgot>}></Route>
        <Route path="/check" element={<Check></Check>}></Route>
        <Route path="/complete" element={<Complete></Complete>}></Route>
        <Route path="/verify-email" element={<Verify></Verify>}></Route>
        <Route path="/update-password/:id" element={<Change></Change>}></Route>
        <Route path="/Astrologers" element={<Astrologer></Astrologer>}></Route>
        <Route path="/horoscope" element={<Horoscope></Horoscope>}></Route>
        <Route path="/compatibility" element={<Compatibility></Compatibility>}></Route>
        <Route path="/Astrologers/profile" element={<Profile></Profile>}></Route>
          
  
     </Routes>
   </div>
  );
}

export default App;
