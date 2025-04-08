import { useContext, useRef, useState } from 'react';

import { CardsContext } from '../../../../../../contexts/CardsContext';
import { LoadingContext } from '../../../../../../contexts/LoadingContext';
import { PopupContext } from '../../../../../../contexts/PopupContext';

function NewCard() {
  const { handleCardCreation } = useContext(CardsContext);
  const { handleClosePopup } = useContext(PopupContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  const titleRef = useRef();
  const linkRef = useRef();

  const [newCard, setNewCard] = useState({ title: '', link: '' });

  const [isValid, setIsValid] = useState({ validTitle: ' ', validLink: ' ' });
  const [isActive, setIsActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    titleMsg: '',
    linkMsg: '',
  });

  const handleTitleChange = (evt) => {
    setNewCard({ ...newCard, title: evt.target.value });
    setIsValid({ ...isValid, validTitle: titleRef.current.validity.valid });
    setIsActive(
      titleRef.current.validity.valid && linkRef.current.validity.valid
    );
    setErrorMessage({
      ...errorMessage,
      titleMsg: titleRef.current.validationMessage,
    });
  };

  const handleLinkChange = (evt) => {
    setNewCard({ ...newCard, link: evt.target.value });
    setIsValid({ ...isValid, validLink: linkRef.current.validity.valid });
    setIsActive(
      titleRef.current.validity.valid && linkRef.current.validity.valid
    );
    setErrorMessage({
      ...errorMessage,
      linkMsg: linkRef.current.validationMessage,
    });
  };

  async function handleSubimit(evt) {
    evt.preventDefault();
    setIsLoading(true);
    await handleCardCreation(newCard);
    setIsLoading(false);
    handleClosePopup();
  }

  return (
    <form onSubmit={handleSubimit} className={`form  editor__form`} noValidate>
      <fieldset className='form__set'>
        <label className='form__field'>
          <input
            type='text'
            className={`form__input form__input_title
            ${isValid.validTitle ? `` : `form__input_type-error`}`}
            id='title'
            placeholder='Título'
            required
            minLength='2'
            maxLength='30'
            value={newCard.title}
            ref={titleRef}
            onChange={handleTitleChange}
          />
          <span
            className={`form__error about-error 
            ${isValid.validTitle ? `` : `form__error_visible`}`}
          >
            {errorMessage.titleMsg}
          </span>
        </label>
        <label className='form__field'>
          <input
            type='url'
            className={`form__input form__input_link 
            ${isValid.validLink ? `` : `form__input_type-error`}`}
            id='link'
            placeholder='Link de imagem'
            required
            value={newCard.link}
            ref={linkRef}
            onChange={handleLinkChange}
          />
          <span
            className={`form__error about-error 
            ${isValid.validLink ? `` : `form__error_visible`}`}
          >
            {errorMessage.linkMsg}
          </span>
        </label>
      </fieldset>
      <button
        type='submit'
        disabled={isLoading || !isActive}
        className={`form__submit-button 
        ${isActive ? `` : `form__submit-button-inactive`}
        ${isLoading ? 'form__submit-button-inactive' : ''}`}
      >
        {`${isLoading ? 'Criando...' : `Criar`}`}
      </button>
    </form>
  );
}

export default NewCard;
