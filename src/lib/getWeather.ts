import NodeCache from 'node-cache';
// eslint-disable-next-line import/no-unresolved
import got from 'got';
import createError from 'http-errors';

// import testData from '../json/informers-yandex-weather.json';
import testData1 from '../json/informers-yandex-weather-1.json';
import { YandexWeatherV2 } from './useWeather';

const YANDEX_WEATHER = 'https://api.weather.yandex.ru/v2/informers';

const validQueries = ['lat', 'lon', 'api', 'lang'];

// type Item = {
//   value: YandexWeatherV2;
//   expired?: boolean;
// };

console.log('create new cache');
const cache = new NodeCache({
  stdTTL: 30 * 60, // 30 мин
  // deleteOnExpire: false,
  // useClones: false,
});

const isProdMode = process.env.NODE_ENV === 'production';

if (!isProdMode) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cache.set<YandexWeatherV2>('TEST', testData1 as any, 0);
}

// cache.on('expired', (key: string, _value: YandexWeatherV2) => {
//   // eslint-disable-next-line no-param-reassign
//   // value.expired = true;
//   console.log(key, 'expired');
// });

const getKey = (searchParams: URLSearchParams): string =>
  isProdMode
    ? Array.from(searchParams.entries())
        .filter(([key]) => validQueries.includes(key))
        .sort(([a], [b]) => (a < b ? -1 : a === b ? 0 : 1))
        .map(([name, value]) => `${name}=${value}`)
        .join('&')
    : 'TEST';

type WeatherData = [weather: YandexWeatherV2, maxAge?: number];

const getWeather = async (url?: string): Promise<WeatherData> => {
  if (!url) throw createError(400);
  const { searchParams } = new URL(url, YANDEX_WEATHER);
  const api = searchParams.get('api');
  if (!api || api.length !== 36) throw createError(400, 'Yandex API-key required');
  const key = getKey(searchParams);
  if (!key) {
    throw createError(404, 'Unknown coordinates');
  }
  const item = cache.get<YandexWeatherV2>(key);
  if (item) {
    const ttl = cache.getTtl(key);
    const now = Date.now();
    const maxAge = ttl && Math.round((ttl - now) / 1000);
    return [item, maxAge];
  }
  const headers = {
    'X-Yandex-API-Key': api,
  };
  searchParams.delete('api');
  try {
    const value = await got(YANDEX_WEATHER, {
      searchParams,
      headers,
    }).json<YandexWeatherV2>();
    cache.set<YandexWeatherV2>(key, value);
    return [value, cache.options.stdTTL];
  } catch (err: any) {
    console.error(
      'error while getting a forecast',
      err.response.url,
      err.response.statusCode,
      err.response.body
    );
    if (item) {
      return [item, -1];
    }
    throw createError(err.response.statusCode, err.response.body);
  }
};

export default getWeather;
