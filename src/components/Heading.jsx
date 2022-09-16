import React from 'react'

const Heading = () => {
let  fulfill = true
  const returnFulfill = fulfill? <h1 className='text-[#bcffbc]'>You fulfill the 75% Attendance criteria for all subjects</h1> : <h1 className='text-[#ff9595] '>You are Low on attendance on the following subjects</h1>
  
  
  
  return (
    <div className=' mb-5 text-[20px] font-poppins font-semibold mx-7 ' >
      {returnFulfill}
    </div>
  )
}

export default Heading