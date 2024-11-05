import React from 'react'
import "../styles/card.css"
const Card = ({details, grouping}) => {
  const catgToIcon={
    Todo:"/assets/Todo.svg",
    Done:"/assets/Done.svg",
    Backlog:"/assets/Backlog.svg",
    Canceled:"/assets/Canceled.svg",
    "In progress":"/assets/In progress.svg"
  }

  const priorityToIcon={
      0:"/assets/priority0.svg",
      1:"/assets/priority1.svg",
      2:"/assets/priority2.svg",
      3:"/assets/priority3.svg",
      4:"/assets/priority4a.svg"
    }
    
    let statusShow= true
    let picShow= true
    let priorityShow= true
    if(grouping==='Status'){
      statusShow=false
    }else if(grouping==='Priority'){
      priorityShow=false
    }else{
      picShow=false
    }

  return (
    <div className='card grey-border shadow'>
      <div className='row-one'>
        <span className='id'>{details.id}</span>
        {picShow && <img src="/assets/person.svg" alt="pic" width={22} />}
      </div>
      <div className='row-two'>
        {statusShow && <img src={catgToIcon[details.status]} alt="" className='catg-icon'/>}
        <p className='title'>{details.title}</p>
      </div>
      <div className='row-three'>
        <span className='margin'> 
          {priorityShow && <img src={priorityToIcon[details.priority]} width={14} alt="" className=''/>}
        </span>
        {details.tag.map((item,key)=>{
          return <span className='tag bordered'><span>&#x25CF;</span>	<span>{item}</span></span>
        })}
      </div>
    </div>
  )
}

export default Card