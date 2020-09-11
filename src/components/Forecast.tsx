/* eslint-disable camelcase */
import clsx from 'clsx';
import { FC } from 'react';
import { ForecastType } from '../lib/useWeather';
import Part from './Part';

type Props = Pick<ForecastType, 'parts'> & {
  className?: string;
};
const Forecast: FC<Props> = ({ className, parts }) => (
  <div className={clsx('flex', className)}>
    {parts.map(props => (
      <Part key={props.part_name} {...props} />
    ))}
  </div>
);

export default Forecast;
