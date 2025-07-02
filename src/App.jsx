import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'


import Landing from './pages/Landing.jsx'
import Error from './pages/Error.jsx'
import Success from './pages/Success.jsx'
function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Landing/>} />
      <Route path='/error' element={<Error/>} />
      <Route path='/success' element={<Success/>} />
      
    </Routes>
      
    </>
  )
}

export default App;