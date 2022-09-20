import {useState} from 'react'
import Popup from './Popup';
const Leave = (props) => {
  const [leave, setLeave] = useState(false);

  function toggleLeave() {
    setLeave(prev => !prev);
  }
  const [leaveValue, setleaveValue] = useState('')
  function leaveChange(){
    setleaveValue(event.target.value)
  }

  const [leaveData, setLeaveData] = useState(props.subData)
const [leaveText, setleaveText] = useState('')
function leaveSubmitHandler(){
  event.preventDefault()
  props.subData.map((item) => (
    setLeaveData((prev)=>{
      return {
      ...prev,
      classesAttended : parseInt(item.classesAttended) + parseInt(leaveValue),
      totalClasses : parseInt(item.totalClasses) + parseInt(leaveValue)
    }}
    )))
setleaveText( <h3>{leaveData.classesAttended},{leaveData.totalClasses}</h3>)
}
  console.log(leaveValue)
  console.log(leaveData)
  const leavePopup = leave ? <Popup >
    {/* <h3>Can I take a Leave?</h3>
    <form >
      <h3>For how many days?</h3>
      <input type="number" onChange={leaveChange} value={leaveValue}/>
    <button className='w-20 h-12 bg-accent rounded-lg font-poppins font-semibold' onClick={leaveSubmitHandler} >click</button>
    {leaveText}
    </form> */}
    <button
            className="w-9 h-9 font-semibold font-poppins text-2xl  mt-4 mr-4 text-redT "
            onClick={toggleLeave}
          >
            X
          </button>
          <div className='flex justify-center '>
          <img src="https://i.imgflip.com/6u2xgr.jpg" alt='Upcoming' width={250}/>
          </div>
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