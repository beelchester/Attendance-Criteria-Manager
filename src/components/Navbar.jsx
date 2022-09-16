import { useState } from "react";
import Popup from "./Popup";
const Navbar = () => {
  const [addSub, setAddSub] = useState(false);

  function toggleAddSub() {
    setAddSub((prev) => !prev);
  }
  const subPopup = addSub ? (
    <Popup>
      <form className="flex flex-col ">
        <h3 className="text-white font-poppins font-semibold">Subject Name:</h3>
        <input type="text" className="rounded px-3 mt-3 mb-6" />
        <h3 className="text-white font-poppins font-semibold">
          Classes Attended:
        </h3>
        <div className="flex items-center justify-start mb-6">
          <input type="text" className="rounded px-3 my-3 mr-3 w-16" />
          <h3 className="text-white font-poppins"> Out Of</h3>
          <input type="text" className="rounded px-3 ml-3 my-3 w-16" />
        </div>
        <button
          className="w-20 h-12 text-black bg-accent rounded-lg font-poppins font-semibold"
          onClick={toggleAddSub}
        >
          click
        </button>
      </form>
    </Popup>
  ) : (
    ""
  );
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
