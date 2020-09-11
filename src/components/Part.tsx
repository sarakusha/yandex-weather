/* eslint-disable camelcase */
import clsx from 'clsx';
import { FC } from 'react';
import styles from '../../styles/fact.module.css';
import { partNames, PartType } from '../lib/useWeather';
import Temperature from './Temperature';

type Props = Pick<
  PartType,
  'part_name' | 'temp_max' | 'temp_min' | 'prec_prob' | 'condition' | 'icon'
> & {
  className?: string;
};

const Part: FC<Props> = ({
  className,
  part_name,
  temp_min,
  temp_max,
  condition,
  icon,
  prec_prob,
}) => (
  <div className={clsx('flex_center', 'column', className)}>
    <div>{partNames[part_name]}</div>
    <div className="flex_center">
      <img
        className={clsx(styles.icon, styles.cond_proc)}
        alt={condition}
        src={`//yastatic.net/weather/i/icons/funky/light/${icon}.svg`}
      />
      <span className="small">
        <i className={clsx(styles.icon, styles.icon_small, styles.icon_humidity_white)} />
        <span className="light">{prec_prob}%</span>
      </span>
    </div>
    <div className="flex">
      <Temperature temp={temp_min} />
      ...
      <Temperature temp={temp_max} />
    </div>
  </div>
);

export default Part;
