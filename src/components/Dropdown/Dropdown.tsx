import React, { HTMLAttributes, RefObject, useEffect, useState } from 'react';
import './Dropdown.css';
import { createPortal } from 'react-dom';

interface DropdownType extends HTMLAttributes<HTMLElement> {
  targetRef: RefObject<HTMLElement>;
}

const calcCoodrinates = (targetElement: HTMLElement) => {
  const rect = targetElement.getBoundingClientRect();
  return {
    top: window.scrollY + rect.bottom,
    right: window.innerWidth - rect.right - window.scrollX,
  };
};

export const Dropdown: React.FC<DropdownType> = ({ targetRef, children }) => {
  const [coords, setCoords] = useState({ top: 0, right: 0 });

  useEffect(() => {
    setCoords(calcCoodrinates(targetRef.current as HTMLElement));
  }, []);

  return createPortal(
    <div className="dropdown" style={{ ...coords }}>
      {children}
    </div>,
    document.getElementById('overlay') as HTMLElement
  );
};
