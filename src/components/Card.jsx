import { useState } from "react";
import Popup from "./Popup";

const Card = (props) => {
  const [editCard, setEditCard] = useState(false);

  function toggleEditCard() {
    setEditCard((prev) => !prev);
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
        <h3 className="text-white font-poppins font-semibold mt-[-3rem] ">Subject Name:</h3>
        <input
          value={props.name}
          type="text"
          className="rounded px-3 mt-3 mb-6"
        />
        <h3 className="text-white font-poppins font-semibold">
          Classes Attended:
        </h3>
        <div className="flex items-center justify-start mb-6">
          <input type="text" className="rounded px-3 my-3 mr-3 w-16" />
          <h3 className="text-white font-poppins"> Out Of</h3>
          <input type="text" className="rounded px-3 ml-3 my-3 w-16" />
        </div>
        <button
          className="w-20 h-12 bg-accent rounded-lg font-poppins font-semibold mt-1"
          onClick={toggleEditCard}
        >
          Apply
        </button>
      </form>
      </div>
    </Popup>
  ) : (
    ""
  );
  const a = parseInt(props.classesAttended);
  const b = parseInt(props.totalClasses);
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
      <button
        onClick={toggleEditCard}
        className="bg-[#fee715e3] h-10 px-4 text-sm mt-9 rounded-lg font-poppins font-semibold"
      >
        Edit
      </button>
    </div>
  );
};

export default Card;
