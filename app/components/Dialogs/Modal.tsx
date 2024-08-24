"use client"

import { useEffect, useRef, useState } from 'react';
import { MdOutlineDeleteOutline } from "react-icons/md";

import{Card, Label} from "../../boards/interfaces"
import { CardUpdate } from '../Forms/CardUpdate';
import { deleteCard } from '@/app/lib/db_queries/cards';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Popover from './Popover';
import AssignLabel from '@/app/boards/[slug]/components/card/labels/assign-label';


const Modal = ({ card, onClose, labels }:{card: Card, onClose: any, labels: Label[]}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // for datetime
  const router = useRouter()


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
  const onDeleteHandler = async () => {
    const result = await deleteCard(card.id)
    if (result) {
      toast.success("Card Deleted")
      router.refresh()
    }
    else{
      toast.error("Failed to delete Card")
    }
  }

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
                <CardUpdate card={card}/>
                <div className='flex flex-col gap-1'>
                  {/* for actions */}
                    <p className="text-sm">Actions</p>
                    <div 
                      className='bg-zinc-500  
                      bg-opacity-70 p-1 rounded-md flex items-center gap-2 text-md hover:bg-red-400'
                      onClick={onDeleteHandler}
                      >
                        <MdOutlineDeleteOutline className='text-lg'/>
                        <p>Delete Card </p>
                    </div>
                    <Popover content={<AssignLabel card={card} labels={labels}/>}>
                    <div 
                      className='bg-zinc-500  
                      bg-opacity-70 p-1 rounded-md flex items-center gap-2 text-md hover:bg-zinc-600'
                      >
                        <MdOutlineDeleteOutline className='text-lg'/>
                        <p>Labels </p>
                    </div>
                    </Popover>
                </div>
            </div>
      </div>
    </div>
  );
};

export default Modal;