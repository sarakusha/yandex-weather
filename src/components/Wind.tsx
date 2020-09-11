/* eslint-disable camelcase */
import clsx from 'clsx';
import { FC } from 'react';
import { FactType, shortDir } from '../lib/useWeather';
import styles from '../../styles/fact.module.css';

type Props = Pick<FactType, 'wind_speed' | 'wind_dir'> & { className?: string };

const Wind: FC<Props> = ({ className, wind_speed, wind_dir }) => (
  <div className={clsx('inline-block', 'flex_center', className)}>
    <i className={clsx(styles.icon, styles.icon_wind_airflow_white, styles.icon_weather)} />
    <span className="margin_right">{wind_speed} м/с</span>
    {wind_dir && wind_dir !== 'c' && (
      <>
        <i
          className={clsx(
            styles.icon,
            styles.icon_weather,
            styles.icon_wind,
            styles[`icon_wind_${wind_dir}`]
          )}
        />
        {shortDir[wind_dir]}
      </>
    )}
  </div>
);

export default Wind;
