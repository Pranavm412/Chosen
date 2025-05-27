import React from 'react'

const QuizChoice = (props) => {
  return (
    <div className='bg-white h-[100px] w-[500px] mx-5 my-5 flex justify-center items-center font-bold text-5xl rounded-xl'>{props.option}</div>
  )
}

export default QuizChoice