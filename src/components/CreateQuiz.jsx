import React, { useState,useEffect } from 'react'
import { useLocation,useNavigate } from 'react-router-dom'

const CreateQuiz = () => {
    const location=useLocation();
    const navigate=useNavigate();
    const quizNameFromRoute = location.state?.quizName || "";
    const draft=JSON.parse(localStorage.getItem('quizDraft'));
    let questionsFromRoute;
    if(draft){
        questionsFromRoute = draft.allQuestions
    }
    else if(location.state?.allQuestions){
        questionsFromRoute = location.state?.allQuestions
    }
    else{
        questionsFromRoute = []
    }
    const isEdit = location.state?.isEdit || false;
    const quizIndex = location.state?.quizIndex;
    const [quizName, setQuizName] = useState(quizNameFromRoute);
    const [popUpOpen,setPopUpOpen]=useState(true)
    const [allQuestions, setAllQuestions] = useState(questionsFromRoute || []);
    const [question, setQuestion]=useState("")
    const [options,setOptions]=useState(["","","",""])
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(NaN);
    const [editQuestion,setEditQuestion]=useState(false);
    const [qIndex,setQIndex]=useState(NaN);

    useEffect(() => {
        const draft = JSON.parse(localStorage.getItem('quizDraft'));
        if (draft) {
            setQuestion(draft.question || "");
            setOptions(draft.options || ["", "", "", ""]);
            setCorrectAnswerIndex(draft.correctAnswerIndex ?? NaN);
            setAllQuestions(draft.allQuestions || []);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('quizDraft', JSON.stringify({
            question,
            options,
            correctAnswerIndex,
            allQuestions
        }));
    }, [question, options, correctAnswerIndex, allQuestions]);

    function handleOptions(index, value){
        const updatedOptions=[...options];
        updatedOptions[index]=value;
        setOptions(updatedOptions)
    }

    function isValidQuestion() {
        return (
            question.trim() !== "" &&
            options.every((opt) => opt.trim() !== "") &&
            !Number.isNaN(correctAnswerIndex)
        );
    }

    function addMore(){
        if (!isValidQuestion()) {
            alert("Please fill out all fields and select the correct answer.");
            return;
        }
        const newQuestion={
            question,
            options,
            answerIndex:correctAnswerIndex
        }
        if(editQuestion){
            const updatedQuestions=[...allQuestions];
            updatedQuestions[qIndex]=newQuestion;
            setAllQuestions(updatedQuestions);
            setQIndex(NaN);
            setEditQuestion(false);
        }
        else{
            setAllQuestions([...allQuestions,newQuestion]);
        }
        setQuestion("");
        setOptions(["","","",""]);
        setCorrectAnswerIndex(NaN);
    }
    function finishQuiz() {
        if (allQuestions.length === 0) {
            navigate("/");
            return;
        }
        const savedQuizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
        const newQuiz = {
            name: quizName,
            questions: allQuestions,
        };
        let updatedQuizzes;
        if (isEdit) {
            updatedQuizzes = [...savedQuizzes];
            updatedQuizzes[quizIndex] = newQuiz;
        } else {
            updatedQuizzes = [...savedQuizzes, newQuiz];
        }
        localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
        localStorage.removeItem("quizDraft");
        navigate("/");
    }
    function clearQuestion(){
        setQuestion("");
        setOptions(["","","",""]);
        setCorrectAnswerIndex(NaN);
        setEditQuestion(false);
        setQIndex(NaN);
    }
    function deleteQuiz(){
        const savedQuizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
        const updatedQuizzes = savedQuizzes.filter((q) => q.name !== quizName);
        localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
        localStorage.removeItem("quizDraft");
        navigate("/");
    }
    function deleteQuestion(index){
        const updatedQuestions=allQuestions.filter((_,id)=>id!==index);
        setAllQuestions(updatedQuestions)
    }
  return (
    <>
    <div className='h-screen relative'>
        <div className='bg-black text-white font-bold text-3xl h-[10%] flex justify-center items-center'>{quizName}</div>
        <div className='absolute top-[12%] left-1/2 transform -translate-x-1/2 w-[85%] p-4'>
            <div className='flex justify-between items-center'>
                <div className='text-3xl text-white font-bold mb-4 mx-6'>Questions:</div>
                <div className='flex'>
                    <div className='px-4 py-2 mb-3 mr-2 bg-yellow-400 hover:bg-yellow-300 hover:shadow-md rounded-lg shadow-black shadow-sm font-semibold' hidden={allQuestions.length===0 || popUpOpen}><button className='hover:cursor-pointer' onClick={deleteQuiz}>Delete</button></div>
                    <div className='px-4 py-2 mb-3 mr-2 bg-yellow-400 hover:bg-yellow-300 hover:shadow-md rounded-lg shadow-black shadow-sm font-semibold' hidden={popUpOpen}><button className='hover:cursor-pointer' onClick={()=>setPopUpOpen(true)}>Add More</button></div>
                    <div className='px-4 py-2 mb-3 mr-2 bg-yellow-400 hover:bg-yellow-300 hover:shadow-md rounded-lg shadow-black shadow-sm font-semibold' hidden={popUpOpen}><button className='hover:cursor-pointer' onClick={finishQuiz}>{allQuestions.length===0?'Cancel':'Finish'}</button></div>
                </div>
            </div>
            <div className='text-xl'>
                <ol className='space-y-4 list-decimal list-inside'>
                    {allQuestions.map((q, idx) => (
                    <li key={idx} className='bg-white rounded-lg shadow p-4 break-all'>
                        {q.question}
                        <ul className='list-[lower-alpha] list-inside px-4'>
                        {q.options.map((opt, i) => (
                            <li
                            key={i}
                            className={i === q.answerIndex ? 'text-green-600 font-semibold' : ''}
                            >
                            {opt}
                            </li>
                        ))}
                        </ul>
                        <div className='flex justify-end'>
                            <div className='px-4 py-2 mr-2 bg-yellow-400 hover:bg-yellow-300 hover:shadow-md rounded-lg shadow-black shadow-sm text-sm font-semibold' hidden={popUpOpen}><button className='hover:cursor-pointer' onClick={()=>{setQuestion(q.question);setOptions(q.options);setCorrectAnswerIndex(q.answerIndex);setEditQuestion(true);setQIndex(idx);setPopUpOpen(true)}}>Edit</button></div>
                            <div className='px-4 py-2 mr-2 bg-yellow-400 hover:bg-yellow-300 hover:shadow-md rounded-lg shadow-black shadow-sm text-sm font-semibold' hidden={popUpOpen}><button className='hover:cursor-pointer' onClick={()=>deleteQuestion(idx)}>Delete</button></div>
                        </div>
                    </li>
                    ))}
                </ol>
            </div>
            <div className='flex justify-center'>
                
            </div>
        </div>
        {popUpOpen&&
            <div className='bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40%] pt-4 px-6 pb-7 rounded shadow-black shadow-md flex flex-col justify-center'>
                <div className='flex justify-end'><button className='hover:bg-gray-100 py-1 px-[0.6rem] -mt-1 mb-1 -mr-3 hover:shadow-md hover:cursor-pointer' onClick={()=>{clearQuestion();setPopUpOpen(false)}}>X</button></div>
                <form onSubmit={(e) => {e.preventDefault();addMore();}}>
            <div className='m-2'><input className='border-2 w-full p-2 px-3' type="text" name='question' placeholder='Enter the question' value={question} onChange={(e)=>setQuestion(e.target.value)} required/></div>
            <div className='m-2 mx-3 grid grid-cols-2 gap-x-7 gap-y-4'>
                {options.map((opt, index) => (
                    <input
                    key={index}
                    className="border-2 w-full p-1 px-3"
                    type="text"
                    placeholder={`Enter choice ${index + 1}`}
                    value={opt}
                    onChange={(e) => handleOptions(index, e.target.value)}
                    required
                    />
                ))}
            </div>
            <div className='mx-3 mt-1 flex items-center gap-2 justify-center'>
                <div>Correct answer: </div>
                <div className='flex gap-2'>
                    {options.map((opt,index)=>(
                        <button type='button' key={index} onClick={()=>setCorrectAnswerIndex(index)} className={`w-[40px] py-2 rounded-md shadow-sm hover:shadow-md hover:cursor-pointer text-white ${correctAnswerIndex === index ? "bg-green-600" : "bg-[#401B88]"}`}>{index+1}</button>
                    ))}
                </div>
            </div>
            <div className='flex justify-center items-center gap-6 mt-4'>
                <button type='submit' className='bg-[#401B88] w-[130px] text-white rounded-md shadow-black shadow-sm hover:shadow-md py-2 hover:cursor-pointer'>{editQuestion?"Update":"Add"}</button>
                {/* <button type='submit' className='bg-[#401B88] w-[130px] text-white rounded-md shadow-black shadow-sm hover:shadow-md py-2 hover:cursor-pointer'>Finish</button> */}
            </div>
            </form>
        </div>}
        </div>
    </>
  )
}

export default CreateQuiz