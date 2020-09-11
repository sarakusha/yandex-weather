import clsx from 'clsx';
import { FC } from 'react';

const Temperature: FC<{ temp?: number; className?: string }> = ({ temp, className }) => (
  <div className={clsx('inline-block', className)}>
    {temp !== undefined && `${temp > 0 ? '+' : ''}${temp}`}&deg;
  </div>
);

export default Temperature;
