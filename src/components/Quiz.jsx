import React from 'react'
import QuizChoice from './Quiz/QuizChoice'

const Quiz = (props) => {
    let options=props.options;
  return (
    <div className='h-screen'>
      <div className='h-[10%] font-bold text-3xl text-white flex justify-end items-center pr-15'>Timer</div>
      <div className='bg-[#200867] h-[30%] font-bold text-5xl text-white flex justify-center items-center'>
        <div className='w-[10%] flex justify-end items-center pr-2'>Q 1.</div>
        <div className='w-[85%] flex justify-center items-center pl-5'>Which is the city that has Eiffel Tower present in it? vgh gcgcjgc gcjgcjh jjhvjhv jhvhjvh</div>
        <div className='w-[5%] flex justify-center items-center'></div>
      </div>
      <div className='h-[60%] grid grid-cols-2 -mt-5'>
        <div className='w-full flex justify-end items-end'>
          <QuizChoice option={options[0]} />
        </div>
        <div className='w-full flex justify-start items-end'>
          <QuizChoice option={options[1]} />
        </div>
        <div className='w-full flex justify-end items-start'>
          <QuizChoice option={options[2]} />
        </div>
        <div className='w-full flex justify-start items-start'>
          <QuizChoice option={options[3]} />
        </div>
      </div>
    </div>
  )
}

export default Quiz