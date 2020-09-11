/* eslint-disable camelcase */
import clsx from 'clsx';
import { FC } from 'react';
import { FactType } from '../lib/useWeather';
import Humidity from './Humidity';
import Pressure from './Pressure';
import Wind from './Wind';

type Props = Pick<FactType, 'wind_speed' | 'wind_dir' | 'pressure_mm' | 'humidity'> & {
  className?: string;
  showHumidity?: boolean;
};

const Details: FC<Props> = ({
  className,
  showHumidity,
  wind_speed,
  wind_dir,
  pressure_mm,
  humidity,
}) => (
  <div className={clsx(className, 'flex')}>
    <Wind wind_speed={wind_speed} wind_dir={wind_dir} className="margin_right" />
    {showHumidity && <Humidity value={humidity} className="margin_right" />}
    <Pressure value={pressure_mm} />
  </div>
);

export default Details;
