"use client"

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Modal from '../Dialogs/Modal';

export default function SingleCard({ card }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

//   searches the query params, if it contains cardId then it opens a model with this card
  useEffect(() => {
    const cardId = searchParams.get('cardId');
    if (cardId && cardId == card.id) {
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
    <div>
      <div
        className="bg-zinc-800 py-2 px-2 rounded-lg cursor-pointer"
        onClick={openModal}
      >
        {card.title}
      </div>
      {isModalOpen && <Modal card={card} onClose={closeModal} />}
    </div>
  );
}