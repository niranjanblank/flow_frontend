"use client"

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Modal from '../Dialogs/Modal';
import { Draggable } from '@hello-pangea/dnd';
import { Card, Label } from '@/app/boards/interfaces';
import { FaRegClock } from "react-icons/fa6";
import moment from 'moment';

export default function SingleCard({ card, index, labels }:{card: Card,index: number,labels: Label[]}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();


//   searches the query params, if it contains cardId then it opens a model with this card
  useEffect(() => {
    const cardId = searchParams.get('cardId');
    if (cardId && cardId == card.id.toString()) {
      setIsModalOpen(true);
    }
  }, [searchParams, card.id]);

//   open the modal and set cardId in the url
  const openModal = () => {
    router.push(`${pathname}?cardId=${card.id}`);
    setIsModalOpen(true);
  };

// close the modal  
  const closeModal = () => {
    setIsModalOpen(false);
    router.push(pathname);
  };

  return (
    <Draggable
    draggableId={`card-${card.id.toString()}`}
    index={index}
    isDragDisabled={isModalOpen}
    >
      {(provided)=>
        (
          <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          >
            <div
              className="bg-zinc-800 py-2 px-2 rounded-lg cursor-pointer flex flex-col gap-2"
              onClick={openModal}
            >
              {card.labels.length>0 && (
                <div className='text-xs flex flex-wrap gap-1'>
                  {card.labels.map(label => (
                    <span 
                    className='px-2 rounded-sm py-1'
                    style={{backgroundColor: label.color}}
                    key={`card-label-${label.id}`}>{label.title}</span>
                  ))}
              </div>
            )}
              <h1>
                {card.title}
              </h1>
              {card.due_date?(
                <div className='flex items-center gap-2 text-sm rounded-sm bg-gray-600 w-fit p-1 px-2'>
                  <FaRegClock/>
                  {moment(card.due_date).format("MMM Do YY")}
                  </div>
                ):""}
              
            </div>
            {isModalOpen && <Modal card={card} labels={labels} onClose={closeModal} />}
        </div>
        )
      }
    
  
    </Draggable>
  );
}