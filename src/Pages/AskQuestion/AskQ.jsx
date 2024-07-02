import React, { useRef, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig'; // Ensure axiosConfig is correctly configured
import classes from './askQ.module.css';
import { AppState } from '../../App';
import Loader from './../../components/Loader/Loader';

function AskQ() {
  const titleRef = useRef(null);
  const detailRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useContext(AppState);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const questionTitleValue = titleRef.current.value;
    const questionDetailValue = detailRef.current.value;

    if (!questionDetailValue || !questionTitleValue) {
      alert('Please provide all required information');
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
        "questions/add-question",
        {
          title:questionTitleValue,
          description: questionDetailValue,
        },
        config
      );
      // alert("question post sucessful");

      navigate("/");
      setIsLoading(true)
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error.response);
      setIsLoading(false)
    }
 
 
  };

  return (
    <div>
      {/* Question page header tips */}
      <div className={classes.question_tips}>
        <h3>Steps to write a good question</h3>
        <ul>
          <li>Summarize your problem in a one-line title</li>
          <li>Describe your problem in more detail</li>
          <li>Describe what you tried and what you expected to happen</li>
          <li>Review your question and post it to the site</li>
        </ul>
      </div>

      <div className={classes.lower_tips}>
        <h2>Ask a public question</h2>
        <p onClick={() => navigate('/home')}>Go to Question page</p>
      </div>

      <form className={classes.form} onSubmit={handleSubmit}>
        <input 
          type="text" 
          className={classes.Qtitle} 
          ref={titleRef} 
          placeholder="Title" 
          required 
        />
        <textarea 
          className={classes.Qdetail} 
          ref={detailRef} 
          placeholder="Question Details" 
          required 
        />
        <button type="submit">
          {isLoading ? <Loader color="#ff8500" size={5} /> : 'Post your Question'}
        </button>
      </form>
    </div>
  );
}

export default AskQ;
