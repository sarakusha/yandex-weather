import clsx from 'clsx';
import { useRouter } from 'next/router';
import { FC } from 'react';
import styles from '../../styles/header.module.css';
import Clock from './Clock';

const DAYS = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
] as const;

const MONTHS = [
  'Января',
  'Февраля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноября',
  'Декабря',
] as const;

const Header: FC = () => {
  const { query } = useRouter();
  const now = new Date();
  const day = DAYS[now.getDay()];
  return (
    <div className={clsx(styles.root)}>
      <div className={styles.info}>
        {query.city && <div className={styles.city}>{query.city}</div>}
        <div
          className={clsx(
            { [styles.secondary]: !!query.city, [styles.noban]: !!query.noban },
            'flex'
          )}
        >
          {day}, {now.getDate()} {MONTHS[now.getMonth()]},&nbsp; <Clock />
        </div>
      </div>
      {!query.noban && (
        <img src="/ya-weather-white.svg" alt="Яндекс Погода" className={styles.logo} />
      )}
    </div>
  );
};

export default Header;
