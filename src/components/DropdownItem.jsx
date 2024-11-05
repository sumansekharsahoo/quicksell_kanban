import React from 'react'
import '../styles/dropdown.css'
const DropdownItem = ({itemName, options,itemState, stateHandler}) => {
  return (
    <div className="dropdown-item grey">
      <label>{itemName}</label>
      <select value={itemState} onChange={stateHandler} className='select-field dark-grey'>
        {options.map((opt,key)=>{
          return <option>{opt}</option>
        })}
      </select>
    </div>
  )
}

export default DropdownItem