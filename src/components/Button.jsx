import React from 'react';

const Button = ({ children, onClick, variant = 'primary', type = 'button', disabled = false, className = '' }) => {
  const baseStyles = 'px-4 py-2 rounded-md font-semibold transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';

  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 btn-glow',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
  };

  const disabledStyles = 'disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabledStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button; 