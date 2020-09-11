import clsx from 'clsx';
import { FC } from 'react';
import styles from '../../styles/fact.module.css';

const Pressure: FC<{ className?: string; value?: number }> = ({ className, value }) => (
  <div className={clsx('inline-block', 'flex_center', className)}>
    <i className={clsx(styles.icon, styles.icon_pressure_white, styles.icon_weather)} />
    <span>{value} мм рт.ст.</span>
  </div>
);

export default Pressure;
