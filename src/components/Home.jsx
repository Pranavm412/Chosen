import React, { useState,useEffect } from 'react'
import Quiz from './Quiz'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const options=["Bangalore","Paris","Dallas","Beijing"];
    const [popUpOpen,setPopUpOpen]=useState(false);
    const [quizName,setQuizName]=useState('')
    const navigate=useNavigate();
    const [quizzes, setQuizzes] = useState([]);
    useEffect(() => {
  const saved = JSON.parse(localStorage.getItem('quizzes')) || [];
  setQuizzes(saved);
}, []);
  return (
    <>
    <div className='h-screen relative'>
        <div className='h-[51%] flex flex-col justify-center items-center pt-30'>
            <div className='font-bold text-9xl text-white'>Chosen</div>
            <div className='font-semibold text-4xl text-white'>For all your quiz events</div>
        </div>
        <div className='h-auto flex justify-center gap-5'>
            <div><button onClick={()=>setPopUpOpen(true)} className='bg-white w-[250px] h-[60px] text-3xl hover:cursor-pointer'>Create</button></div>
            <div><button onClick={()=>navigate('/play')} className='bg-white w-[250px] h-[60px] text-3xl hover:cursor-pointer'>Play Demo</button></div>
        </div>
        <div className='absolute left-1/2 transform -translate-x-1/2 my-7 w-[90%]'>
            <div className='text-3xl text-white font-bold p-3 px-8'>Your Quizzes:</div>
            {
                quizzes.length===0?
                <div className='px-9 text-white'>No quizzes created yet.</div>:
                <div className='grid gap-4 grid-cols-3 py-3 px-4'>
                    {quizzes.map((quiz, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition flex flex-col items-center">
                            <div className="text-3xl font-bold">{quiz.name}</div>
                            <div className="text-gray-600">{quiz.questions.length} questions</div>
                            <div className='flex'>
                                <div className='px-4 py-2 mt-3 mr-2 bg-yellow-400 hover:bg-yellow-300 hover:shadow-md rounded-lg shadow-black shadow-sm font-semibold'><button className='hover:cursor-pointer'>Play</button></div>
                                <div className='px-4 py-2 mt-3 mr-2 bg-yellow-400 hover:bg-yellow-300 hover:shadow-md rounded-lg shadow-black shadow-sm font-semibold'><button className='hover:cursor-pointer' onClick={() => navigate('/quiz', {state: {quizName: quiz.name, allQuestions: quiz.questions, quizIndex: idx, isEdit: true}})}>Edit</button></div>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
        {popUpOpen&&
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg px-6 py-2 shadow-black shadow-md'>
            <form className='flex flex-col items-center' onSubmit={(e)=>{e.preventDefault();navigate('/quiz',{state:{quizName:quizName}});}}>
                <div className='w-full pt-3 pb-2 flex justify-center relative'>
                    <div className='font-bold text-3xl'>Enter Quiz Name</div>
                    <button type='button' className='absolute right-0 font-bold bg-gray-100 py-1 px-2 rounded-lg hover:bg-gray-200 hover:cursor-pointer' onClick={()=>setPopUpOpen(false)}>X</button>
                </div>
                <input className='border border-2 m-3 w-[400px] h-[40px] focus:shadow-inner/50 px-3' placeholder='Enter the name of the quiz...' type="text" onChange={(e)=>setQuizName(e.target.value)} value={quizName}/>
                <button type='submit' className='py-1 px-3 mb-4 font-semibold text-lg bg-[#401B88] text-white hover:shadow-sm hover:shadow-black hover:cursor-pointer'>Create</button>
            </form>
        </div>
        }
    </div>
    </>
    // <Quiz options={options}/>
  )
}

export default Home