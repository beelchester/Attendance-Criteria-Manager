import React from "react";

const Heading = () => {
  let fulfill = false;
  const returnFulfill = fulfill ? (
    <h1 className="text-greenT">
      You fulfill the 75% Attendance criteria for all subjects
    </h1>
  ) : (
    <div>
    <h1 className="text-redT ">
      You are Low on attendance for the following subject/'s
    </h1>
    <p className="text-base text-white mt-2">DSA - 68%</p>
    </div>
  );

  return (
    <div className=" mb-5 text-[20px] font-sans font-semibold mx-7 tracking-wide ">
      {returnFulfill}
    </div>
  );
};

export default Heading;
