import { useContext, useEffect, useState } from 'react';

import ImagePopup from '../Popup/components/ImagePopup/ImagePopup';
import ConfirmDeletion from '../Popup/components/ConfirmDeletion/ConfirmDeletion';

import { CardsContext } from '../../../../contexts/CardsContext';
import { CurrentUserContext } from '../../../../contexts/CurrentUserContext';
import { PopupContext } from '../../../../contexts/PopupContext';
import { LoadingContext } from '../../../../contexts/LoadingContext';

import deleteButton from '../../../../assets/images/gallery/gallery_card_delete_button.svg';

function Card({ card }) {
  const { handleCardDelete, handleCardLike, handleCardDisike } =
    useContext(CardsContext);
  const { currentUser } = useContext(CurrentUserContext);
  const { handleOpenPopup, handleClosePopup } = useContext(PopupContext);
  const { setIsLoading } = useContext(LoadingContext);

  const [currentCard, setCurrentCard] = useState(card);

  const imagePopup = {
    children: <ImagePopup currentCard={currentCard} />,
  };

  const ConfirmDeletionPopup = {
    title: 'Tem certeza?',
    children: <ConfirmDeletion onConfirm={handleDelete} />,
  };

  useEffect(() => {
    setCurrentCard(card);
  }, [card]);

  async function handleDelete() {
    if (currentCard.owner === currentUser._id) {
      setIsLoading(true);
      await handleCardDelete(currentCard._id);
      setIsLoading(false);
      handleClosePopup();
    } else {
      console.error('O usuário não é dono desse card');
    }
  }

  function handleDeleteButtonClick() {
    handleOpenPopup(ConfirmDeletionPopup);
  }

  function handleCardClick() {
    handleOpenPopup(imagePopup);
  }

  async function handleLikeButtonClick() {
    if (currentCard.isLiked) {
      await handleCardDisike(currentCard._id, (res) => {
        setCurrentCard(res);
      });
    } else {
      await handleCardLike(currentCard._id, (res) => {
        setCurrentCard(res);
      });
    }
  }

  return (
    <li className='gallery__card'>
      <img
        onClick={handleDeleteButtonClick}
        src={deleteButton}
        alt='Ícone de uma lixeira'
        className={`gallery__card-delete-button ${
          currentCard.owner === currentUser._id
            ? `gallery__card-delete-button-visible`
            : ''
        }`}
      />
      <img
        onClick={handleCardClick}
        className='gallery__card-image'
        src={currentCard.link}
        alt={currentCard.name}
      />
      <div className='gallery__card-information'>
        <p className='gallery__card-name '>{currentCard.name}</p>
        <div className='gallery__card-like-content'>
          <button
            onClick={handleLikeButtonClick}
            aria-label='Like do cartão'
            className={`gallery__card-like-button 
              ${currentCard.isLiked ? 'gallery__card-like-button-active' : ''}`}
          ></button>
          <p className='gallery__card-like-counter'>
            {currentCard.isLiked ? '1' : '0'}
          </p>
        </div>
      </div>
    </li>
  );
}

export default Card;
