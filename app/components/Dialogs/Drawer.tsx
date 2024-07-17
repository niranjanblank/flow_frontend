"use client"
import { useState } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
// delete the page
async function deleteBoard(id: number){
    const response = await fetch(`http://localhost:8000/boards/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }});
    const data = await response.json();
    return data
  }


const Drawer = ({children, id}:{children: React.ReactNode,id: number}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="p-4 hover:bg-gray-500 hover:rounded-lg hover:bg-opacity-10"
        onClick={() => setIsOpen(true)}
      >
        {children}
      </button>
      <div
        className={`fixed inset-0 z-50 transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="absolute inset-0 bg-black opacity-50" onClick={() => setIsOpen(false)}></div>
        <div className="absolute right-0 top-0 w-64 h-full bg-white shadow-lg p-4">
          <button
            className="p-2 text-gray-600"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
          <div className="mt-4">
          <button onClick={()=>deleteBoard(id)}>Delete</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Drawer;
