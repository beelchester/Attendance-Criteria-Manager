import React from 'react'
import Card from './Card'
const CardContainer = (props) => {
  if (props.subData.length === 0) {
    return <h2 className='text-white font-poppins text-md mt-[11rem] '>No content found, Add a subject</h2>;
  }
  return <div className='className=" grid lg:grid-cols-4 md:grid-cols-3 ss:grid-cols-2 grid-cols-1 gap-[50px] mb-6'>
     {props.subData.map((item) => (
         <Card
          //  key={item.id}
           name={item.name}
           classesAttended={item.classesAttended}
           totalClasses={item.totalClasses}
           
         />
       ))}
   </div>

}

export default CardContainer