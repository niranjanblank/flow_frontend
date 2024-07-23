"use client"

import { useEffect, useRef } from 'react';
import { MdOutlineDeleteOutline } from "react-icons/md";

const Modal = ({ card, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

//   checks if clicked outside of modal
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  // deleting card 

  // copy the current link to the clipboard
  const handleCopyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}?cardId=${card.id}`;
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="fixed inset-0 z-20 bg-black bg-opacity-50 flex  justify-center">
      <div
        className="bg-zinc-800  p-6 rounded-lg shadow-lg relative mt-24 w-3/4 md:w-2/3 lg:w-1/3 h-fit text-gray-300"
        ref={modalRef}
      >
        <span
          className="absolute top-2 right-2 text-2xl cursor-pointer"
          onClick={onClose}
        >
          &times;
        </span>
        <h3 className="text-xl font-bold mb-4">{card.title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
                {/* for content */}
                <label>Description</label>
                <div
                className='bg-zinc-600 px-2 pt-2 rounded-md min-h-16'
                >Add a more detailed description</div>
                <p className="mb-4">{card.description}</p>
                </div>
            
            <div>
                {/* for actions */}
                <p className="text-sm">Actions</p>
                <div 
                className='bg-zinc-500  
                bg-opacity-70 p-1 rounded-md flex items-center gap-2 text-md hover:bg-gray-700'
                >
                    <MdOutlineDeleteOutline className='text-lg'/>
                    <p>Delete Card </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;