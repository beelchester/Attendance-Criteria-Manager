import React from "react";

const Heading = (props) => {
  let fulfill = props.condition;

  const returnFulfill = fulfill ? (
    <h1 className="text-greenT">
      You fulfill the Minimum Attendance criteria 
    </h1>
  ) : (
    <div>
    <h1 className="text-redT ">
      You are Low on attendance
    </h1>

    </div>
  );

  return (
    <div className=" mb-5 text-[20px] font-sans font-semibold mx-7 tracking-wide ">
      {returnFulfill}
    </div>
  );
};

export default Heading;
