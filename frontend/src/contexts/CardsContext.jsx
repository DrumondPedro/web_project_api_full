import { createContext, useState } from 'react';

import { client } from '../utils/api';

export const CardsContext = createContext();

export function CardsProvider({ children }) {
  const [cards, setCards] = useState([]);

  async function handleInitialCards(token) {
    try {
      const data = await client.getInitialCards('/cards', token);
      setCards(data);
    } catch (error) {
      console.log('GET - /cards -', error);
      setCards([]);
    }
  }

  async function handleCardCreation(token, newCardData) {
    try {
      const newCard = await client.addNewCard('/cards', token, newCardData);
      setCards([newCard, ...cards]);
    } catch (error) {
      console.log('POST - /cards -', error);
    }
  }

  async function handleCardLike(id, token, executor) {
    try {
      const cardLiked = await client.like(`/cards/${id}/likes`, token);
      executor(cardLiked);
    } catch (error) {
      console.log(`PUT - /cards/${id}/likes -`, error);
    }
  }

  async function handleCardDisike(id, token, executor) {
    try {
      const cardDesliked = await client.dislike(`/cards/${id}/likes`, token);
      executor(cardDesliked);
    } catch (error) {
      console.log(`DELETE - /cards/${id}/likes -`, error);
    }
  }

  async function handleCardDelete(id, token) {
    try {
      await client.deleteCard(`/cards/${id}`, token);
      setCards(cards.filter((card) => card._id !== id));
    } catch (error) {
      console.log(`DELETE - /cards/${id} -`, error);
    }
  }

  return (
    <CardsContext.Provider
      value={{
        cards,
        handleInitialCards,
        handleCardCreation,
        handleCardLike,
        handleCardDisike,
        handleCardDelete,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
}
