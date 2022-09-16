import React from "react";

const Navbar = () => {
  return (
    <nav className="font-poppins font-semibold h-[60px]  flex  flex-row  justify-between px-7 py-14  bg-secondary ">
        <h1 className="text-[28px] flex items-center text-white ">
          Attendance Criteria Manager
        </h1>
        <div className="flex items-center ">
        <button className="bg-accent h-12 px-4 rounded-lg ">Add a Subject</button>
        </div>
    </nav>
  );
};

export default Navbar;
