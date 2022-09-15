import { useState, React } from 'react'
import Navbar from './components/Navbar'
import Heading from './components/Heading'
import Leave from './components/Leave'
function App() {

  return (
    <div className='w-[100%] bg-[#101820FF] h-[100vh]  '>
      <Navbar/>
      <div className='mt-14  flex justify-between'>
        <Heading/>
        <Leave/>
      </div>
    </div>
  )
}

export default App
