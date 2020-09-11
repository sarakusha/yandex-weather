/* eslint-disable camelcase */
import ky from 'ky/umd';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const API = '/api/weather';

export type Condition =
  | 'clear'
  | 'partly-cloudy'
  | 'cloudy'
  | 'overcast'
  | 'drizzle'
  | 'light-rain'
  | 'rain'
  | 'moderate-rain'
  | 'heavy-rain'
  | 'continuous-heavy-rain'
  | 'showers'
  | 'wet-snow'
  | 'light-snow'
  | 'snow'
  | 'snow-showers'
  | 'hail'
  | 'thunderstorm'
  | 'thunderstorm-with-rain'
  | 'thunderstorm-with-hail';

export const conditions: Readonly<Record<Condition, string>> = {
  clear: 'Ясно',
  'partly-cloudy': 'Малооблачно',
  cloudy: 'Облачно с прояснениями',
  overcast: 'Пасмурно',
  drizzle: 'Морось',
  'light-rain': 'Небольшой дождь',
  rain: 'Дождь',
  'moderate-rain': 'Умеренно сильный дождь',
  'heavy-rain': 'Сильный дождь',
  'continuous-heavy-rain': 'Длительный сильный дождь',
  showers: 'Ливень',
  'wet-snow': 'Дождь со снегом',
  'light-snow': 'Небольшой снег',
  snow: 'Снег',
  'snow-showers': 'Снегопад',
  hail: 'Град',
  thunderstorm: 'Гроза',
  'thunderstorm-with-rain': 'Дождь с грозой',
  'thunderstorm-with-hail': 'Гроза с градом',
} as const;

export type Direction = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'c';
type DayNight = 'd' | 'n';

export const directions: Readonly<Record<Direction, string>> = {
  nw: 'северо-западный',
  n: 'северный',
  ne: 'северо-восточный',
  e: 'восточный',
  se: 'юго-восточный',
  s: 'южный',
  sw: 'юго-западный',
  w: 'западный',
  c: 'штиль',
};

export const shortDir: Readonly<Record<Direction, string>> = {
  nw: 'СЗ',
  n: 'С',
  ne: 'СВ',
  e: 'В',
  se: 'ЮВ',
  s: 'Ю',
  sw: 'ЮЗ',
  w: 'З',
  c: '',
};

type Season = 'summer' | 'autumn' | 'winter' | 'spring';

type Info = {
  /**
   * Широта (в градусах).
   */
  lat: number;
  /**
   * Долгота (в градусах).
   */
  lon: number;
  /**
   * Страница населенного пункта на сайте Яндекс.Погода
   */
  url: string;
};

type Common = {
  /**
   * Ощущаемая температура (°C).
   */
  feels_like: number;
  /**
   * Температура воды (°C)
   */
  temp_water?: number;
  /**
   * Код иконки погоды. Иконка доступна по адресу
   * https://yastatic.net/weather/i/icons/blueye/color/svg/<значение из поля icon>.svg.
   */
  icon: string;
  /**
   * Код расшифровки погодного описания
   */
  condition: Condition;
  /**
   * Скорость ветра (в м/с).
   */
  wind_speed: number;
  /**
   * Скорость порывов ветра (в м/с).
   */
  wind_gust: number;
  /**
   * Направление ветра
   */
  wind_dir: Direction;
  /**
   * Давление (в мм рт. ст.).
   */
  pressure_mm: number;
  /**
   * Давление (в гектопаскалях).
   */
  pressure_pa: number;
  /**
   * Влажность воздуха (в процентах).
   */
  humidity: number;
  /**
   * Светлое или темное время суток
   */
  daytime: DayNight;
};

export type FactType = Common & {
  /**
   * Температура (°C).
   */
  temp: number;
  /**
   * Признак того, что время суток, указанное в поле daytime, является полярным.
   */
  polar: boolean;
  /**
   * Время года в данном населенном пункте
   */
  season: Season;
  /**
   * Время замера погодных данных в формате Unixtime.
   */
  obs_time: number;
};

export type PartName = 'night' | 'morning' | 'day' | 'evening';

export const partNames: Readonly<Record<PartName, string>> = {
  night: 'Ночью',
  morning: 'Утром',
  day: 'Днем',
  evening: 'Вечером',
};

export type PartType = Common & {
  /**
   * Название времени суток
   */
  part_name: PartName;
  /**
   * Минимальная температура для времени суток (°C).
   */
  temp_min: number;
  /**
   * Максимальная температура для времени суток (°C).
   */
  temp_max: number;
  /**
   * Средняя температура для времени суток (°C).
   */
  temp_avg: number;
  /**
   * Прогнозируемое количество осадков (в мм).
   */
  prec_mm: number;
  /**
   * Прогнозируемый период осадков (в минутах).
   */
  prec_period: number;
  /**
   * Вероятность выпадения осадков.
   */
  prec_prob: number;
};

export type ForecastType = {
  /**
   * Дата прогноза в формате ГГГГ-ММ-ДД.
   */
  date: string;
  /**
   * Дата прогноза в формате Unixtime.
   */
  date_ts: number;
  /**
   * Порядковый номер недели.
   */
  week: number;
  /**
   * Время восхода Солнца, локальное время (может отсутствовать для полярных регионов).
   */
  sunrise?: string;
  /**
   * Время заката Солнца, локальное время (может отсутствовать для полярных регионов).
   */
  sunset?: string;
  /**
   * Код фазы Луны. Возможные значения:
   0 — полнолуние.
   1-3 — убывающая Луна.
   4 — последняя четверть.
   5-7 — убывающая Луна.
   8 — новолуние.
   9-11 — растущая Луна.
   12 — первая четверть.
   13-15 — растущая Луна.
   */
  moon_code: number;
  /**
   * Текстовый код для фазы Луны.
   */
  moon_text: string;
  /**
   * Прогнозы по времени суток на 2 ближайших периода.
   */
  parts: PartType[];
};

export type YandexWeatherV2 = {
  /**
   * Время сервера в формате Unixtime.
   */
  now: number;
  /**
   * Время сервера в UTC.
   */
  now_dt: string;
  /**
   * Объект информации о населенном пункте.
   */
  info: Info;
  /**
   * Объект фактической информации о погоде.
   */
  fact: FactType;
  /**
   * Объект прогнозной информации о погоде.
   */
  forecast: ForecastType;
};

const fetcher = (api: string): Promise<YandexWeatherV2> => ky.get(api).json();

const MINUTE = 60 * 1000;

const useWeather = (initial?: YandexWeatherV2): YandexWeatherV2 | undefined => {
  const { query } = useRouter();
  const searchParams = new URLSearchParams(query as Record<string, string>);
  const { data } = useSWR<YandexWeatherV2>(`${API}?${searchParams}`, fetcher, {
    initialData: initial,
    refreshWhenHidden: true,
    refreshInterval: MINUTE,
  });
  return data;
};

export default useWeather;
