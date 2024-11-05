import React from 'react'
import Card from './Card'
import "../styles/group.css"
import { useDisplay } from '../context/DisplayContext.jsx';

const Group = ({groupRecord}) => {
  const { grouping} = useDisplay();
  return (
    <div className='group'>
      <div className='header'>
        <div className='details'>
          <img src={groupRecord[1]} alt="group icon" width={18} className='margin'/>
          <span className='margin'>{groupRecord[0]}</span>
          <span>{groupRecord[2]}</span>
        </div>
        <div className='options'>
          <img src="/assets/add.svg" alt="add" className='margin btn'/>
          <img src="/assets/dots.svg" alt="" className="dots btn" />
        </div>
      </div>
      {groupRecord[3].map((item,key)=>{
        return <Card details={item} grouping={grouping}/>
      })}
    </div>
  )
}

export default Group