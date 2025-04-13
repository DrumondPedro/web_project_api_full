import { useContext, useRef, useState } from 'react';

import { CurrentUserContext } from '../../../../../../contexts/CurrentUserContext';
import { LocalDataContext } from '../../../../../../contexts/LocalDataContext';
import { LoadingContext } from '../../../../../../contexts/LoadingContext';
import { PopupContext } from '../../../../../../contexts/PopupContext';

function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const { TokenInfo } = useContext(LocalDataContext);
  const { handleClosePopup } = useContext(PopupContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  const picture = useRef();

  const [avatar, setAvatar] = useState('');

  const [isValid, setIsValid] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [avatarLinkErrorMessage, setAvatarLinkErrorMessage] = useState('');

  const handleValidation = (evt) => {
    setAvatar(evt.target.value);
    setIsValid(picture.current.validity.valid);
    setIsActive(picture.current.validity.valid);
    setAvatarLinkErrorMessage(picture.current.validationMessage);
  };

  async function handleSubimit(evt) {
    evt.preventDefault();
    setIsLoading(true);
    const token = TokenInfo.get();
    await handleUpdateAvatar(token, picture.current.value);
    setIsLoading(false);
    handleClosePopup();
  }
  return (
    <form onSubmit={handleSubimit} className={`form editor__form`} noValidate>
      <fieldset className='form__set'>
        <label className='form__field'>
          <input
            type='url'
            className={`form__input form__input_picture ${
              isValid ? `` : `form__input_type-error`
            }`}
            id='picture'
            placeholder='Link da foto'
            required
            minLength='2'
            value={avatar}
            ref={picture}
            onChange={handleValidation}
          />
          <span
            className={`form__error about-error ${
              isValid ? `` : `form__error_visible`
            }`}
          >
            {avatarLinkErrorMessage}
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
        {`${isLoading ? 'Salvando...' : 'Salvar'}`}
      </button>
    </form>
  );
}

export default EditAvatar;
