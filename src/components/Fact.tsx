/* eslint-disable camelcase */
import clsx from 'clsx';
import { FC } from 'react';
import styles from '../../styles/fact.module.css';
import { conditions, FactType } from '../lib/useWeather';
import Temperature from './Temperature';

type Props = Pick<FactType, 'temp' | 'icon' | 'condition' | 'feels_like'>;

const Fact: FC<Props> = ({
  temp,
  condition,
  icon,
  feels_like,
}) =>
  (
    <div className={clsx(styles.root)}>
      <Temperature className={styles.temperature} temp={temp} />
      <img
        className={clsx(styles.icon, styles.cond)}
        alt={condition}
        src={`//yastatic.net/weather/i/icons/funky/light/${icon}.svg`}
      />
      <div className={styles.description}>
        <div>{conditions[condition]}</div>
        <div className="secondary">
          Ощущается как <Temperature temp={feels_like} />
        </div>
      </div>
    </div>
  );

export default Fact;
