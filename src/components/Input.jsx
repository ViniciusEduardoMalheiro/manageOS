import React from 'react';

const Input = ({ type = 'text', placeholder, value, onChange, name, label, error }) => {
  const baseStyles = 'w-full px-3 py-2 border bg-transparent rounded-md text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';
  const borderStyles = error
    ? 'border-destructive'
    : 'border-input';

  return (
    <div className="w-full mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-foreground mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${baseStyles} ${borderStyles}`}
      />
      {error && <p className="text-sm text-destructive mt-2">{error}</p>}
    </div>
  );
};

export default Input; 