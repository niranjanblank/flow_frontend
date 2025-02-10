"use client"

import Modal from "@/app/components/Dialogs/Modal";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Label } from "../../interfaces";
import { getLabelByBoardId } from "@/app/lib/db_queries/labels";
import { TableCell, TableRow } from "@/components/ui/table";
import LabelTag from "@/app/components/Label/LabelTag";
import moment from "moment";

export default function CardToday({card, }:{card: any}){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [labels, setLabels] = useState([])
    
 

//   searches the query params, if it contains cardId then it opens a model with this card
useEffect(() => {
    const cardId = searchParams.get('cardId');
    if (cardId && cardId == card.id.toString()) {
      setIsModalOpen(true);
    }
  }, [searchParams, card.id]);

useEffect(()=> {
  const getlabel = async () => {
    let data = await getLabelByBoardId(card.belongs_to_list.board_id)
    if(data){
      setLabels(data)
    }
  }

  getlabel()
},[card])

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
  <>

         <TableRow key={card.id} onClick={openModal} >
            <TableCell className="font-medium">{card.title}</TableCell>
            <TableCell>{card.desc}</TableCell>
            <TableCell>{card.belongs_to_list.board.title}</TableCell>
            <TableCell>
              {card.labels.length>0?(
                              <div className='text-xs flex flex-wrap gap-1'>
                                {card.labels.map((label: Label) => (
                                  <LabelTag label={label}  key={`card-label-${label.id}`}/>
                              
                                ))}
                            </div>
                            ): (<p className="text-gray-700 text-md">No Labels Assigned</p>)
                           }
            </TableCell>
            <TableCell className="text-right">{moment(card.due_date).format("MMM Do YY")}</TableCell>
          </TableRow>

    {isModalOpen && <Modal card={card} labels={labels} onClose={closeModal} />}
   
    </>
)

}