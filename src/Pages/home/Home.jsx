import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppState } from "../../App";
import axios from "../../axiosConfig";
import avatar from './../../assets/avatar.png';
import classes from './home.module.css';
import { MdKeyboardArrowRight } from "react-icons/md";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AppState);
  const token = localStorage.getItem("token");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (!token || !user) {
      toast("Please Login");
      navigate("/");
      return;
    }

    axios
      .get("/questions/all-questions/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token, user, navigate]);

  const handleClick = (questionid) => {
    navigate(`/answerquestions/${questionid}`);
  };

  return (
    <div>
      <section className={classes.inner_header}>
        <Link to="/askquestion"><button>Ask Question</button></Link>
        <h2>Welcome: {user?.username}</h2>
      </section>

      <section className={classes.all_question}>
        <h2>Questions</h2>
        {questions.map((question) => (
          <div key={question.questionid} className={classes.eachquestion}>
            <div className={classes.profile}>
              <img src={avatar} alt="" />
              <h4>{question.username}</h4>
            </div>
            <div className={classes.question_title} onClick={() => handleClick(question.questionid)}>
              <p>{question.title}</p>
              <MdKeyboardArrowRight size={25}/>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;

