import React from 'react';

const Card = ({ children, className = '' }) => {
  const baseStyles = 'bg-card text-card-foreground rounded-lg shadow-soft p-6 card-hover';

  return (
    <div className={`${baseStyles} ${className}`}>
      {children}
    </div>
  );
};

export default Card; 