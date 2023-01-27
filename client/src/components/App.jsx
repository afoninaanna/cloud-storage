import Navbar from "./Navbar/Navbar";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./Registration/Registration";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
