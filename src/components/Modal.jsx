import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children, size = 'default' }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const sizeClasses = {
    default: 'max-w-2xl',
    large: 'max-w-4xl',
  };

  if (!isOpen) {
    return null;
  }

  return (
    // Portal-like structure: Overlay + Content
    <div 
        className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
    >
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm animate-fade-in" 
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Modal Content */}
      <div 
        className={`relative bg-card rounded-lg shadow-strong w-full flex flex-col animate-scale-in my-auto ${sizeClasses[size]}`}
        onClick={(e) => e.stopPropagation()} // Impede que o clique no modal feche o modal
      >
        <header className="flex items-center justify-between p-4 border-b border-border">
          <h2 id="modal-title" className="text-xl font-bold text-foreground">{title}</h2>
          <button 
            onClick={onClose} 
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Fechar modal"
          >
            {/* Ícone de Fechar (X) */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </header>
        <main className="p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Modal; 