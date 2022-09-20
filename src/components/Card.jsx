import { useState, useEffect } from "react";
import Popup from "./Popup";

const Card = (props) => {
  const [editCard, setEditCard] = useState(false);

  function toggleEditCard() {
    setEditCard((prev) => !prev);
  }

  function cardDeleteHandler() {
    toggleEditCard();
    props.delete(props.id);
  }

  const [editSubData, setEditSubData] = useState({
    id: props.id,
    name: props.name,
    classesAttended: parseInt(props.classesAttended),
    totalClasses: parseInt(props.totalClasses),
  });

  function handleEditChange(event) {
    setEditSubData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleEditSubmit(event) {
    event.preventDefault();
    toggleEditCard();
    props.onClk(editSubData);

  }


  const editPopup = editCard ? (
    <Popup>
      <div className="flex flex-col  items-center h-[100%] ">
        <div className=" w-[100%] flex justify-end ">
          <button
            className="w-9 h-9 font-semibold font-poppins text-2xl  mt-4 mr-4 text-redT "
            onClick={toggleEditCard}
          >
            X
          </button>
        </div>

        <form className="flex flex-col  justify-center items-center w-[100%] h-[100%] ">
          <h3 className="text-white font-poppins font-semibold mt-[-3rem] ">
            Subject Name:
          </h3>
          <input
            name="name"
            onChange={handleEditChange}
            value={editSubData.name}
            type="text"
            className="rounded px-3 mt-3 mb-6"
          />
          <h3 className="text-white font-poppins font-semibold">
            Classes Attended:
          </h3>
          <div className="flex items-center justify-start mb-6">
            <input
              type="text"
              value={editSubData.classesAttended}
              className="rounded px-3 my-3 mr-3 w-16"
              name="classesAttended"
              onChange={handleEditChange}
            />
            <h3 className="text-white font-poppins"> Out Of</h3>
            <input
            value={editSubData.totalClasses}
             name="totalClasses"
              type="text"
              className="rounded px-3 ml-3 my-3 w-16"
              onChange={handleEditChange}
            />
          </div>
          <div className="flex justify-evenly w-[45%] ">
            <button
              className="w-20 h-12 bg-redT rounded-lg font-poppins font-semibold mt-1"
              onClick={cardDeleteHandler}
            >
              Delete
            </button>
            <button
              className="w-20 h-12 bg-accent rounded-lg font-poppins font-semibold mt-1"
              onClick={handleEditSubmit}
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </Popup>
  ) : (
    ""
  );
  const [addClassButton, setaddClassButton] = useState(false)
function toggleAddClass(){
  setaddClassButton(prev => !prev)
}
function yesHandler(){

     setEditSubData((prevData) => {
      return {
        ...prevData,
        classesAttended: parseInt(props.classesAttended)+1,
        totalClasses: parseInt(props.totalClasses)+1,
      };
    });
    props.onClk(editSubData);
  }
function noHandler(){
  // toggleAddClass()
  setEditSubData((prevData) => {
    return {
      ...prevData,
      totalClasses: parseInt(props.totalClasses)+1,
    };
  });
props.onClk(editSubData);

}
let a = parseInt(props.classesAttended);
let b = parseInt(props.totalClasses);
  const percent = (props.classesAttended / props.totalClasses) * 100;
  const roundedPercent = parseFloat(percent).toFixed(2);
  const percentText =
    roundedPercent >= 75 ? (
      <h3 className="text-greenT font-sans font-semibold mt-5">
        {roundedPercent + "%"}
      </h3>
    ) : (
      <h3 className="text-redT font-sans font-semibold mt-5">
        {roundedPercent + "% "}
      </h3>
    );
  let i;
  let j;
  let classesRequired;

  for (i = a + 1, j = b + 1; i > a, j > b; i++, j++) {
    if (i / j >= 0.75) {
      classesRequired = i - a;
      break;
    }
  }
  const addClass = <div className="flex flex-col items-start ml-6">
    <div className="flex items-center">
    <h3 className="text-white font-bold mt-[2px] text-sm animate-pulse"> Did you attend it?</h3>   
    <div className="fixed">
    <p className="text-white text-[10px] relative left-[7.2rem] top-[1.3rem] ">*Bug Alert* Please click twice</p>
    </div>
    </div>
    <div className="flex  w-[7rem] justify-around ">
    <button className="text-greenT mr-1 font-semibold text-[13px] " onClick={yesHandler}>Yes</button>
    <button className="text-redT mr-1 font-semibold text-[13px]"onClick={noHandler}>No</button>
    </div>
  </div> 
const dynMt = roundedPercent >= 75 ? ("mt-9"):("mt-3")

  return (
    <div className="h-[18rem] w-[18rem] bg-[#090d11bd] rounded-xl ring ring-[#0000007c] p-3 text-center">
      {editPopup}
      <h1 className="text-[#a0c4f0] font-poppins font-semibold uppercase text-3xl mt-2  ">
        {props.name}
      </h1>
      {percentText}
      <p className="text-white font-poppins font-semibold text-xs mt-1">
        ({a}/{b})
      </p>
      <h3 className=" font-sans font-semibold  mt-6 text-white">
        {roundedPercent >= 75
          ? `Keep maintaining the attendance :)`
          : `You need to attend atleast the next ${classesRequired} classes`}
      </h3>
        <div className="flex justify-around ">

        <div className="flex flex-col ">

      <button
        onClick={toggleAddClass}
        className={`bg-[#f1f1f1f1] h-10 px-4 text-sm ${dynMt} rounded-lg font-poppins font-semibold`}
        >
        Add a Class
      </button>

          </div>
      <button
        onClick={toggleEditCard}
        className={`bg-[#fee715e3] h-10 px-4 text-sm ${dynMt} rounded-lg font-poppins font-semibold`}
      >
        Edit
      </button>
      
        </div>
        {addClassButton ? addClass : ""}
        </div>

  );
};

export default Card;
