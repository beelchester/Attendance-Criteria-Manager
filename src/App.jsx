import { useState, React } from "react";
import Navbar from "./components/Navbar";
import Heading from "./components/Heading";
import Leave from "./components/Leave";
import CardContainer from "./components/CardContainer";
function App() {
  const [subData, setSubData] = useState([])
  function click(object){
    setSubData((prev)=>{
      return [...prev, object]
    })
  }

  let headCondition = true
  let redSubs = []
  subData.map((item) => {
    const percent = (item.classesAttended / item.totalClasses )*100
    const roundedPercent = parseFloat(percent).toFixed(2)
    if (roundedPercent < 75) {
      headCondition = false
      redSubs.push(item)
    }
})

console.log(subData)

  
  return (
    <div className="w-[100%]  h-[100vh]  ">
      <Navbar onClk={click} />
        {subData.length===0? (""):(
      <div className="my-8 flex justify-between items-center">
         <Heading condition={headCondition} redSubs={redSubs}  />
        <Leave />
      </div>
        )}
      <div className="flex justify-center mt-20 mx-7 ">
          <CardContainer subData={subData} />
       
      </div>
    </div>
  );
}

export default App;
