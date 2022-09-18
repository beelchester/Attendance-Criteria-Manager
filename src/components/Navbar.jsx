import { useState } from "react";
import Popup from "./Popup";
const Navbar = (props) => {
  const [addSub, setAddSub] = useState(false);

  function toggleAddSub() {
    setAddSub((prev) => !prev);
  }

  const [newSubData, setNewSubData] = useState({
    id:"",
    name: "",
    classesAttended: "",
    totalClasses: "",
  });
  function handleAddSubChange(event) {
    setNewSubData((prevData) => {
      return {
        ...prevData,
        id: Math.random().toString(),
        [event.target.name]: event.target.value,
      };
    });
  }
  function handleAddSubSubmit(event) {
    event.preventDefault()
    toggleAddSub()
    props.onClk(newSubData)
    setNewSubData((prevData) => {
      return {
          id:"",
          name: "",
          classesAttended: "",
          totalClasses: "",
      };
    });
}  
const subPopup = addSub ? (
    <Popup>
      <div className="flex flex-col  items-center h-[100%] ">
      <div className=" w-[100%] flex justify-end ">
        <button
          className="w-9 h-9 font-semibold font-poppins text-2xl  mt-4 mr-4 text-redT "
          onClick={toggleAddSub}
        >
          X
        </button>
      </div>

      <form className="flex flex-col  justify-center items-center w-[100%] h-[100%]">
        <h3 className="text-white font-poppins font-semibold mt-[-3rem]">Subject Name:</h3>
        <input
          type="text"
          name="name"
          onChange={handleAddSubChange}
          className="rounded px-3 mt-3 mb-6"
          value={newSubData.name}
        />
        <h3 className="text-white font-poppins font-semibold">
          Classes Attended:
        </h3>
        <div className="flex items-center justify-start mb-6">
          <input
            name="classesAttended"
            onChange={handleAddSubChange}
            type="text"
            className="rounded px-3 my-3 mr-3 w-16"
            value={newSubData.classesAttended}
          />
          <h3 className="text-white font-poppins"> Out Of</h3>
          <input
            name="totalClasses"
            onChange={handleAddSubChange}
            type="text"
            className="rounded px-3 ml-3 my-3 w-16"
            value={newSubData.totalClasses}
          />
        </div>
        <button
          className="w-20 h-12 text-black bg-accent rounded-lg font-poppins font-semibold mt-1"
          
          onClick={handleAddSubSubmit}  
        >
          Apply
        </button>
      </form>
      </div>
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
