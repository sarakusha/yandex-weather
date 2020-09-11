/*
 * @license
 * Copyright (c) 2020. Nata-Info
 * @author Andrei Sarakeev <avs@nata-info.ru>
 *
 * This file is part of the "mcd" project.
 * For the full copyright and license information, please view
 * the EULA file that was distributed with this source code.
 */

import { useEffect, useState, FC } from 'react';
import clsx from 'clsx';

export type Props = {
  className?: string;
  blink?: boolean;
  align?: 'right' | 'center' | 'left';
};

const alignMap: { [A in NonNullable<Props['align']>]: string } = {
  right: 'flex-end',
  left: 'flex-start',
  center: 'center',
};

const twoDigits = (val: number): string => val.toString().padStart(2, '0');

const Clock: FC<Props> = ({ className, blink = true, align = 'center' }) => {
  const [hours, setHours] = useState(() => twoDigits(new Date().getHours()));
  const [minutes, setMinutes] = useState(() => twoDigits(new Date().getMinutes()));
  useEffect(() => {
    const update = (): void => {
      const now = new Date();
      setHours(twoDigits(now.getHours()));
      setMinutes(twoDigits(now.getMinutes()));
    };
    const next = 1000 - (Date.now() % 1000);
    let timer = 0;
    const alignTimer = window.setTimeout(() => {
      update();
      timer = window.setInterval(update, 1000);
    }, next);
    return () => {
      clearTimeout(alignTimer);
      clearInterval(timer);
    };
  }, [setHours, setMinutes]);
  return (
    <div className={clsx(className, 'root')}>
      <div className="hours">{hours}</div>
      <div className={clsx({ blink })}>:</div>
      <div className="minutes">{minutes}</div>
      {/* language=CSS */}
      <style jsx>
        {`
          .root {
            display: flex;
            justify-content: ${alignMap[align]};
          }

          .hours,
          .minutes {
            flex: ${align === 'center' ? 1 : 0} 0 0;
          }
        `}
      </style>
      {/* language=CSS */}
      <style jsx>
        {`
          .blink {
            animation: blinker 1s ease infinite;
          }

          .hours {
            text-align: right;
          }

          .minutes {
            text-align: left;
          }

          @keyframes blinker {
            20% {
              opacity: 1;
            }
            50% {
              opacity: 0;
            }
            80% {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Clock;
