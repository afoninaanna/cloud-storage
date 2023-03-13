import Navbar from "./Navbar/Navbar";
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Registration from "./Registration/Registration";
import Login from "./Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth } from "../actions/user";
import Disk from "./Disk/Disk";
import Profile from "./Profile/Profile";

function App() {
  const isAuth = useSelector(state => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth())
  }, [])
  
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        {!isAuth ?
          <Routes>
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          :
          <Routes>
            <Route path="/" element={<Disk />} />
            <Route path="/profile" element={<Profile/>}/>
            <Route path="*" element={<Navigate to='/'/>}/>
          </Routes>
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
