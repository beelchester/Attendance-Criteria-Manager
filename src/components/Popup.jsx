import React from 'react'

const Popup = (props) => {

  return (
    <div className='flex justify-center items-center fixed bg-[#00000086] w-[100%] h-[100vh] backdrop-blur-md top-0 left-0  '>
      <div className='w-[1000px] h-[500px] bg-primary rounded-xl ring ring-[#00000062] flex justify-center items-center'>
          {props.children}
      </div>
    </div>
    
  )
}

export default Popup