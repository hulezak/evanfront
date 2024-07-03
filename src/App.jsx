import React, { useEffect, useState, createContext } from "react";
import Home from "./Pages/home/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "./axiosConfig";
import Askquestion from "./Pages/AskQuestion/AskQ";
import QuestionDetail from "./Pages/questiondetail/QuestionDetail";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Header from './components/Header/Header'
import Footer from "./components/footer/Footer"
import Login from './Pages/Login'
import Register from './Pages/Register'
export const AppState = createContext();

function App() {
  const [user, setUser] = useState({});

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  async function checkUser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setUser(data);
    } catch (error) {
      console.log(error.message);
      setUser(error.response.data);
      navigate("/login");
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AppState.Provider value={{ user, setUser }}>
      
       <Header/>
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />        
          <Route path="/register" element={<Register/>} />        
          <Route path="/login" element={<Login/>} />        
          <Route path="/askquestion" element={<Askquestion />} />
          <Route
            path="/answerquestions/:questionid"
            element={<QuestionDetail />}
          />
        </Routes>
  <Footer/>
    </AppState.Provider>
  );
}

export default App;