import { useState, React } from "react";
import Navbar from "./components/Navbar";
import Heading from "./components/Heading";
import Leave from "./components/Leave";
import Card from "./components/Card";
function App() {
  const [subData, setSubData] = useState([])
  function click(object){
    setSubData((prev)=>{
      return [...prev, object]
    })
  }
  console.log(subData)
  
  return (
    <div className="w-[100%]  h-[100vh]  ">
      <Navbar onClk={click} />
      <div className="my-8 flex justify-between items-center">
        <Heading />
        <Leave />
      </div>
      <div className="flex justify-center mt-20 mx-7 ">
        <div className=" grid lg:grid-cols-4 md:grid-cols-3 ss:grid-cols-2 grid-cols-1 gap-[50px]  ">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
}

export default App;
