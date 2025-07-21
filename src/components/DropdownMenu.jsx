import React, { useState, useEffect, useRef } from 'react';

const DropdownMenu = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {isOpen && (
        <div 
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-popover ring-1 ring-black ring-opacity-5 z-10 animate-scale-in"
          style={{ transformOrigin: 'top right' }}
        >
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export const DropdownMenuItem = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="w-full text-left block px-4 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground"
    role="menuitem"
  >
    {children}
  </button>
);

export default DropdownMenu; 