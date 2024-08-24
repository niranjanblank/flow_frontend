"use client"

import Modal from "@/app/components/Dialogs/Modal";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Label } from "../../interfaces";
import { getLabelByBoardId } from "@/app/lib/db_queries/labels";

export default function CardToday({card, }:{card: any}){
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

  console.log(card.belongs_to_list.board)

return (
    <div className=" border-gray-500 p-2  py-4 rounded-md shadow-sm" onClick={openModal}>
    <div>
        <h1>{card.title}</h1>
        <p className="text-sm text-gray-700">in <Link 
        className="underline"
        href={`/boards/${card.belongs_to_list.board_id}`}> {card.belongs_to_list.board.title}</Link></p>
    </div>
    <p>{card.desc}</p>
    {isModalOpen && <Modal card={card} labels={[]} onClose={closeModal} />}
    </div>
)

}