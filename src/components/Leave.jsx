import {useState} from 'react'
import Popup from './Popup';
const Leave = () => {
  const [leave, setLeave] = useState(false);

  function toggleLeave() {
    setLeave(prev => !prev);
  }
  const leavePopup = leave ? <Popup >
    <button className='w-20 h-12 bg-accent rounded-lg font-poppins font-semibold' onClick={toggleLeave} >click</button>
  </Popup> : "";
  return (
    <div>
        {leavePopup}
    <button onClick={toggleLeave} className='h-[120px] w-[144px]  mr-7 bg-white rounded-xl flex justify-center items-center p-12'>
      <h1 className='font-poppins font-semibold text-[20px] text-center'>
         Can I Take a Leave?
        </h1>
    </button>
    </div>
  )
}

export default Leave