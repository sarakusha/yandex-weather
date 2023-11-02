import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC } from 'react';
import clsx from 'clsx';

import styles from '../../styles/Home.module.css';
import bs from '../../styles/background.module.css';
import Details from '../components/Details';
import Forecast from '../components/Forecast';
import Header from '../components/Header';
import Fact from '../components/Fact';
import background from '../lib/background';
import getWeather from '../lib/getWeather';
import useWeather, { YandexWeatherV2 } from '../lib/useWeather';
import useWindowSize from '../lib/useWindowSize';

type Props = { initial?: YandexWeatherV2; width?: number; height?: number };

const Home: FC<Props> = ({ initial, width, height }) => {
  const { fact, forecast } = useWeather(initial) ?? {};
  const bkg = background(fact);
  const { query } = useRouter();
  const windowSize = useWindowSize();
  const isShowForecast =
    forecast && (query.forecast ? query.forecast === '1' : (height ?? windowSize.height) > 224);
  const fontSize =
    (Math.min(
      (width ?? windowSize.width) / 7,
      (height ?? windowSize.height) / (isShowForecast ? 5 : 3)
    ) /
      3) *
    (Number(query.zoom) ?? 1);
  return (
    <div>
      <Head>
        <title>Погода</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={clsx(styles.container, 'size')}>
        <div className={clsx(bs.fact__theme, bkg)} />
        <div className={clsx(styles.content)}>
          <Header />
          {fact && (
            <>
              <Fact {...fact} />
              <Details {...fact} />
            </>
          )}
          {isShowForecast && <Forecast {...forecast!} className={styles.forecast} />}
        </div>
      </div>
      <style global jsx>
        {`
          html {
            font-size: ${fontSize}px;
          }
        `}
      </style>
      <style jsx>
        {`
          .size {
            ${width ? `width: ${width}px;` : ''}
            ${height ? `height: ${height}px` : 'min-height: 100vh'}
          }
        `}
      </style>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, query }) => {
  try {
    const [initial] = await getWeather(req.url);
    const { width, height } = query;
    return {
      props: {
        initial,
        width: Number(width),
        height: Number(height),
      },
    };
  } catch (err) {
    console.error('error while request initial weather');
    return { props: {} };
  }
};

export default Home;
