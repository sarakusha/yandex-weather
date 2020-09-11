import clsx from 'clsx';
import { FC } from 'react';
import styles from '../../styles/fact.module.css';

const Humidity: FC<{ className?: string; value?: number }> = ({ className, value }) => (
  <div className={clsx('inline-block', 'flex_center', className)}>
    <i className={clsx(styles.icon, styles.icon_humidity_white, styles.icon_weather)} />
    <span>{value}%</span>
  </div>
);

export default Humidity;
