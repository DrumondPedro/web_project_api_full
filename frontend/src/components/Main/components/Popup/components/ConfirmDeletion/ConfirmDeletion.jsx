import { useContext } from 'react';

import { LoadingContext } from '../../../../../../contexts/LoadingContext';

function ConfirmDeletion({ onConfirm }) {
  const { isLoading } = useContext(LoadingContext);

  return (
    <button
      type='submit'
      className={`form__submit-button ${
        isLoading ? 'form__submit-button-inactive' : ''
      }`}
      onClick={onConfirm}
      disabled={isLoading}
    >
      {`${isLoading ? 'Excluindo...' : `Sim`}`}
    </button>
  );
}

export default ConfirmDeletion;
