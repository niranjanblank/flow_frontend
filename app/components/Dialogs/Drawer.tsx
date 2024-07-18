"use client"
// drawer component that opens on the right to show menu items
// drawerComponent is the clickable component rendered on the parent component that opens the drawer
// children is the content to be rendered in the drawer

import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';


const Drawer = ({children, drawerComponent}:{children: React.ReactNode, drawerComponent: React.ReactNode}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="p-4 hover:bg-gray-500 hover:rounded-lg hover:bg-opacity-10"
        onClick={() => setIsOpen(true)}
      >
        {drawerComponent}
      </button>
      <div
        className={`fixed inset-0  z-50 transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* background overlay */}
        <div className="absolute inset-0 bg-black opacity-50" onClick={() => setIsOpen(false)}></div>
        {/*  main drawer */}
        <div className="absolute right-0 top-0 w-64 h-full bg-zinc-800 text-gray-400 shadow-lg p-4">
          <div className='flex justify-between pb-2 items-center'>
            <p className="font-bold">Menu</p>
            <button
              className="hover:bg-gray-500 p-2 text-xl hover:bg-opacity-10 hover:rounded-lg "
              onClick={() => setIsOpen(false)}
            >
              <IoMdClose/>
            </button>
          </div>
          
          <hr className='border-gray-400'></hr>
          <div className=" pt-2">
          {/* <button onClick={()=>deleteBoard(id)}>Delete</button>
           
           */}
           {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Drawer;
