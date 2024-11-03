// src/components/ui/dialog.jsx
import React from 'react';

export const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={onOpenChange}>
      <div className="bg-white rounded-lg p-6" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export const DialogContent = ({ children }) => (
  <div>{children}</div>
);

export const DialogHeader = ({ children }) => (
  <div className="font-bold text-lg">{children}</div>
);

export const DialogTitle = ({ children }) => (
  <h2 className="text-xl">{children}</h2>
);




