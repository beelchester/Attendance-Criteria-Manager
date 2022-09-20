import React from "react";

const Heading = (props) => {
  let fulfill = props.condition;

let redSub = []

props.redSubs.map((item) => {
  const percent = (item.classesAttended / item.totalClasses )*100
  const roundedPercent = parseFloat(percent).toFixed(2)
  redSub.length === 0 ?(
    redSub.push(`${item.name.toUpperCase()} - ${roundedPercent}%`)
    ):(
      redSub.push(` , ${item.name.toUpperCase()} - ${roundedPercent}%`)
    )
})

  const returnFulfill = fulfill ? (
    <h1 className="text-greenT">
      You Fulfill the Minimum Attendance Criteria for all the Subjects
    </h1>
  ) : (
    <div>
    <h1 className="text-redT ">
      You are Low on Attendance for the Following Subjects
    </h1>
    <p className="text-white text-[19px] mt-2 tracking-wider">{redSub}</p>
    </div>
  );

  return (
    <div className=" mb-5 text-[25px] font-sans font-semibold mx-7 tracking-wide ">
      {returnFulfill}
    </div>
  );
};

export default Heading;
