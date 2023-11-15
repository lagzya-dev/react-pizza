import styles from './ErrorBlock.module.scss';

function index() {
  return (
    <div className={styles.root}>
      <h1>
        <span>😔</span>
        <br />
        Произошла ошибка
      </h1>
      <p className={styles.description}>
        К сожалению сейчас возникла ошибка, попробуйте позже заказать пиццу
      </p>
    </div>
  );
}

export default index;
