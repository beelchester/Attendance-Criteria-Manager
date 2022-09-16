import { useState } from "react";
import Popup from "./Popup";
const Navbar = () => {
  const [addSub, setAddSub] = useState(false);

  function toggleAddSub() {
    setAddSub(prev => !prev);
  }
  const subPopup = addSub ? <Popup >
    <button className='w-20 h-12 bg-accent rounded-lg font-poppins font-semibold' onClick={toggleAddSub} >click</button>
  </Popup> : "";
  return (
    <div>
      {subPopup}
      <nav className="font-poppins font-semibold h-[60px]  flex  flex-row  justify-between px-7 py-14  bg-secondary ">
        <h1 className="text-[28px] flex items-center text-white ">
          Attendance Criteria Manager
        </h1>
        <div className="flex items-center ">
          <button
            className="bg-accent h-12 px-4 rounded-lg "
            onClick={toggleAddSub}
          >
            Add a Subject
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
