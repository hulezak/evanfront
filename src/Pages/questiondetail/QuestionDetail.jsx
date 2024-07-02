import React, { useEffect, useRef, useState } from "react";
import axios from "../../axiosConfig";
import { useParams, useNavigate, Link } from "react-router-dom";
import userImg from "../../assets/avatar.png";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
import classes from './Qdetail.module.css';
import { MdKeyboardArrowRight } from "react-icons/md";

const QuestionDetail = () => {
  const navigate = useNavigate();
  const answert = useRef();
  const { questionid } = useParams();
  const [questionDesc, setQuestionDesc] = useState({});
  const [answered, setAnswered] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");

  async function questionasked() {
    try {
      const result = await axios.get(`/questions/${questionid}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setQuestionDesc(result.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function answeredQuestion() {
    try {
      const result = await axios.get(`/answers/answers/${questionid}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setAnswered(result.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    questionasked();
    answeredQuestion();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const answerValue = answert.current.value;
    if (!answerValue) {
      alert("Please provide all required information");
      return;
    }
    setIsLoading(true);
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      await axios.post(
        `/answers/answerquestions/${questionid}`,
        {
          answer: answerValue,
        },
        config
      );
      toast.success("Answer posted successfully");
      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Something went wrong");
      console.error(error.response);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={classes.dquestion}>
      <div className={classes.inner_header}>
        <h2>Question</h2>
        {console.log(questionDesc)}
        <h4>{questionDesc[0]?.title}</h4>
        <p>{questionDesc[0]?.description}</p>
      </div>

      <div className={classes.answertitle}>
        <h2>Answer From The Community</h2>
      </div>

      {answered.map((answer, index) => (
        <div key={index} className={classes.eachquestion}>
          <div className={classes.profile}>
            <img src={userImg} alt="User" />
            <h5>{answer.username}</h5>
          </div>
          <div className={classes.question_title}>
            <p>{answer.answer}</p>
            <MdKeyboardArrowRight size={25} />
          </div>
        </div>
      ))}

      <div className={classes.answer_form}>
        <h2>Answer The Top Question</h2>
        <Link to="/home">Go to Question page</Link>
        <form onSubmit={handleSubmit}>
          <textarea ref={answert} required placeholder="Your Answer"></textarea>
          <button type="submit" className="answer_button">
            {isLoading ? <Loader color="#ff8500" size={5} /> : "Post Your Answer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuestionDetail;
