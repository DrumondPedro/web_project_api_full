import { useContext, useEffect, useState } from 'react';

import ImagePopup from '../Popup/components/ImagePopup/ImagePopup';
import ConfirmDeletion from '../Popup/components/ConfirmDeletion/ConfirmDeletion';

import { CardsContext } from '../../../../contexts/CardsContext';
import { LocalDataContext } from '../../../../contexts/LocalDataContext';
import { CurrentUserContext } from '../../../../contexts/CurrentUserContext';
import { PopupContext } from '../../../../contexts/PopupContext';
import { LoadingContext } from '../../../../contexts/LoadingContext';

import deleteButton from '../../../../assets/images/gallery/gallery_card_delete_button.svg';

function Card({ card }) {
  const { handleCardDelete, handleCardLike, handleCardDisike } =
    useContext(CardsContext);
  const { currentUser } = useContext(CurrentUserContext);
  const { TokenInfo } = useContext(LocalDataContext);
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
    if (currentCard.owner._id === currentUser._id) {
      setIsLoading(true);
      const token = TokenInfo.get();
      await handleCardDelete(currentCard._id, token);
      setIsLoading(false);
      handleClosePopup();
    } else {
      console.error('O usuário não é dono desse card');
      handleClosePopup();
    }
  }

  function handleDeleteButtonClick() {
    handleOpenPopup(ConfirmDeletionPopup);
  }

  function handleCardClick() {
    handleOpenPopup(imagePopup);
  }

  async function handleLikeButtonClick() {
    const token = TokenInfo.get();
    if (
      currentCard.likes.find((element) => {
        return element._id === currentUser._id;
      })
    ) {
      await handleCardDisike(currentCard._id, token, (res) => {
        setCurrentCard(res);
      });
    } else {
      await handleCardLike(currentCard._id, token, (res) => {
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
          currentCard.owner._id === currentUser._id
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
            className={`gallery__card-like-button ${
              currentCard.likes.find((element) => {
                return element._id === currentUser._id;
              })
                ? 'gallery__card-like-button-active'
                : ''
            }`}
          ></button>
          <p className='gallery__card-like-counter'>
            {currentCard.likes.length}
          </p>
        </div>
      </div>
    </li>
  );
}

export default Card;
