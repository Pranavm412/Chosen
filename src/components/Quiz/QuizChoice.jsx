import React from 'react'

const QuizChoice = (props) => {
  return (
    <div className={`${props.ifAnswer ? (props.isAnswer?'bg-green-600' : 'bg-white'):'bg-white'} h-[100px] w-[500px] mx-5 my-5 flex justify-center items-center font-bold text-5xl rounded-xl`}>{props.option}</div>
  )
}

export default QuizChoice