import { useState } from "react";
import Popup from "./Popup";

const Card = () => {
  const [editCard, setEditCard] = useState(false);

  function toggleEditCard() {
    setEditCard((prev) => !prev);
  }
  const editPopup = editCard ? (
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
        className="w-20 h-12 bg-accent rounded-lg font-poppins font-semibold"
        onClick={toggleEditCard}
        >
        click
      </button>
        </form>
    </Popup>
  ) : (
    ""
  );
  return (
    <div className="h-[18rem] w-[18rem] bg-[#090d11bd] rounded-xl ring ring-[#0000007c] p-3 text-center">
      {editPopup}
      <h1 className="text-[#a0c4f0] font-poppins font-semibold uppercase text-3xl mt-2  ">
        DSA
      </h1>
      {/* <h3 className='text-greenT font-sans font-semibold'>82%</h3> */}
      <h3 className="text-redT font-sans font-semibold mt-8">68%</h3>
      <h3 className=" font-sans font-semibold my-3 text-white">
        You need to attend atleast the next 3 classes
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
