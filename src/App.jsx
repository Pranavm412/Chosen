import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import Quiz from './components/Quiz'
import CreateQuiz from './components/CreateQuiz'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/quiz' element={<CreateQuiz/>} />
      <Route path='/play' element={<Quiz/>} />
    </Routes>
    </>
  )
}

export default App
