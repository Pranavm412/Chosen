import React, { useState,useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import QuizChoice from './Quiz/QuizChoice'

const sampleQuestions = [
      {
        question: "What is the capital of France?",
        options: ["Madrid", "Paris", "Berlin", "Rome"],
        answerIndex: 1
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Venus", "Mars", "Jupiter"],
        answerIndex: 2
      },
      {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
        answerIndex: 1
      },
      {
        question: "What is the chemical symbol for Gold?",
        options: ["Au", "Ag", "Fe", "Gd"],
        answerIndex: 0
      },
      {
        question: "Which language is primarily used for Android app development?",
        options: ["Swift", "Java", "Python", "C#"],
        answerIndex: 1
      }
    ];

const Quiz = () => {
  const navigate=useNavigate();
  const location=useLocation();
  const quizFromRoute = location.state?.quiz || [];
  console.log("quiz=",quizFromRoute)
  const quizName=quizFromRoute.name||"Demo Quiz";
  console.log("name=",quizName)
  const questions=quizFromRoute.questions||sampleQuestions;
  console.log("questions=",questions)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [phase, setPhase] = useState('quiz');
    useEffect(()=>{
      const handleNextKeys = (e) => {
        if (e.code === "Space" || e.code === "ArrowRight") {
          e.preventDefault();
          handleNext();
        }
      }
      window.addEventListener("keydown", handleNextKeys);
      return () => window.removeEventListener("keydown", handleNextKeys);
    }, [currentIndex, phase]);
  function handleNext() {
    if (phase === 'quiz') {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setPhase('answers-intro');
        setCurrentIndex(0);
      }
    } else if (phase === 'answers-intro') {
      setPhase('review');
      setCurrentIndex(0);
    } else if (phase === 'review') {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        navigate("/");
      }
    }
  }
  return (
    <div className='h-screen'>
      {phase === 'answers-intro' ? (<div className='h-full flex flex-col justify-center items-center font-bold text-9xl text-white'><div>Answers</div><div className='m-5 text-2xl'>Press spacebar or right arrow to continue</div></div>) : (<>
      <div className='h-[8%] font-bold text-3xl text-white flex justify-center items-center'>{quizName}</div>
      <div className='bg-[#200867] h-[27%] font-bold text-5xl text-white flex justify-center items-center'>
        <div className='w-[10%] flex justify-end items-center pr-2'>Q{currentIndex+1}.</div>
        <div className='w-[85%] flex justify-start items-center pl-5'>{questions[currentIndex]?.question}</div>
        <div className='w-[5%] flex justify-center items-center'></div>
      </div>
      {phase !== 'answers-intro' && (
      <div className='h-[55%] grid grid-cols-2'>
        {questions[currentIndex]?.options.map((op,idx)=>(
          <div key={idx} className={`flex items-center ${idx % 2 === 0 ? 'justify-end' : 'justify-start'} ${idx < 2 ? 'items-end' : 'items-start'}`}>
            <div>
              <QuizChoice option={op} isAnswer={idx===questions[currentIndex].answerIndex} ifAnswer={phase === 'review'}></QuizChoice>
            </div>
          </div>
        ))}
      </div>
      )}
      <button className='bg-[#200867] w-full h-[10%] font-bold text-4xl text-white flex justify-center items-center hover:cursor-pointer' onClick={handleNext}>{phase==='review'&&currentIndex===questions.length-1?'Finish':'Next'}</button>
      </>)}
    </div>
  )
}

export default Quiz