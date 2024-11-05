import React, { useState, useRef, useEffect } from 'react';
import { useDisplay } from '../context/DisplayContext';
import "../styles/dropdown.css";
import DropdownItem from './DropdownItem';

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const { grouping, ordering, updateSelection } = useDisplay();
  
  const toggleDropdown = () => setIsOpen(prev => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleGroupingChange = (event) => {
    updateSelection(event.target.value, ordering);
  };
  
  const handleOrderingChange = (event) => {
    updateSelection(grouping, event.target.value);
  };

  const dropdownMenu = [
    { itemName: "Grouping", options: ["Status", "Priority", "User"], stateHandler: handleGroupingChange, itemState: grouping },
    { itemName: "Ordering", options: ["Priority", "Title"], stateHandler: handleOrderingChange, itemState: ordering }
  ];

  return (
    <>
      <button ref={buttonRef} onClick={toggleDropdown} className='dropdown-btn shadow grey-border'>
        <img src="/assets/Display.svg" alt="*" />
        <span className='medium-dark-grey weight'> Display </span>
        <img src="/assets/down.svg" alt="V" />
      </button>

      {isOpen && (
        <div ref={dropdownRef} className="dropdown-menu shadow grey-border">
          {dropdownMenu.map((item, key) => (
            <DropdownItem 
              key={key}
              itemName={item.itemName} 
              options={item.options} 
              stateHandler={item.stateHandler} 
              itemState={item.itemState} 
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Dropdown;
