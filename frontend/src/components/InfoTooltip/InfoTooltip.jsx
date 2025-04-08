import successIcon from '../../assets/images/infoTooltip/success_icon.svg';
import errorIcon from '../../assets/images/infoTooltip/error_icon.svg';

function InfoTooltip({ isSuccess }) {
  return (
    <>
      {isSuccess ? (
        <section className='infoTooltip'>
          <img
            src={successIcon}
            alt='Circulo com um simbulo de certo no meio'
            className='infoTooltip__image'
          ></img>
          <p className='infoTooltip__text'>
            Vitória! Você precisa fazer login.
          </p>
        </section>
      ) : (
        <section className='infoTooltip'>
          <img
            src={errorIcon}
            alt='Circulo com um simbulo de certo no meio'
            className='infoTooltip__image'
          ></img>
          <p className='infoTooltip__text'>
            Ops, algo deu errado! Por favor, tente novamente.
          </p>
        </section>
      )}
    </>
  );
}

export default InfoTooltip;
