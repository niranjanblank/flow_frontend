"use client"
// drawer component that opens on the right to show menu items
// drawerComponent is the clickable component rendered on the parent component that opens the drawer
// children is the content to be rendered in the drawer

import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';

const Drawer = ({ children, drawerComponent, title }: { children: React.ReactNode, drawerComponent: React.ReactNode, title: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
      className=''
        onClick={() => setIsOpen(true)}
      >
        {drawerComponent}
      </button>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black opacity-50 ${isOpen ? 'block' : 'hidden'}`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 w-80 h-full bg-zinc-800 text-gray-400 shadow-lg p-4 z-50 transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className='flex justify-between pb-2 items-center'>
          <p className="font-bold pl-3">{title}</p>
          <button
            className="hover:bg-gray-500 p-2 text-xl hover:bg-opacity-10 hover:rounded-lg"
            onClick={() => setIsOpen(false)}
          >
            <IoMdClose/>
          </button>
        </div>
        <hr className='border-gray-600'></hr>
        <div className="pt-2">
          {children}
        </div>
      </div>
    </>
  );
};

export default Drawer;
