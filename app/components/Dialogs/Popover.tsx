"use client"

import React, { useState, useRef, useEffect } from 'react';

interface Props {
  children: React.ReactNode;
  content: React.ReactNode;
}

const Popover = ({ children, content }: Props) => {
  const [show, setShow] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside as unknown as (e: MouseEvent) => void);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside as unknown as (e: MouseEvent) => void);
    };
  }, []);

  return (
    <div ref={popoverRef} className="relative">
      <div onClick={() => setShow(!show)}>
        {children}
      </div>
      {show && (
        <div className="absolute z-10 shadow-md">
          {content}
        </div>
      )}
    </div>
  );
};

export default Popover;
