function ImagePopup({ currentCard }) {
  return (
    <>
      <img
        src={currentCard.link}
        alt={currentCard.name}
        className='viewer__image'
      />
      <p className='viewer__title'>{currentCard.name}</p>
    </>
  );
}

export default ImagePopup;
