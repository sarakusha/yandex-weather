import bs from '../../styles/background.module.css';
import { Condition, FactType } from './useWeather';

type BkgDayTime = 'day' | 'night' | 'dawn';
type BkgCondition = 'clear' | 'partly' | 'cloudy' | 'rain' | 'sleet' | 'snow';

const getCondition = (condition?: Condition): BkgCondition => {
  switch (condition) {
    case 'clear':
      return 'clear';
    case 'overcast':
    case 'cloudy':
      return 'cloudy';
    case 'partly-cloudy':
      return 'partly';
    case 'continuous-heavy-rain':
    case 'rain':
    case 'heavy-rain':
    case 'light-rain':
    case 'drizzle':
    case 'hail':
    case 'moderate-rain':
    case 'thunderstorm':
    case 'thunderstorm-with-hail':
    case 'thunderstorm-with-rain':
    case 'showers':
      return 'rain';
    case 'light-snow':
    case 'snow':
    case 'snow-showers':
    case 'wet-snow':
      return 'snow';
    default:
      return 'partly';
  }
};

const background = (fact?: FactType): string => {
  const daytime: BkgDayTime = fact && fact.daytime === 'n' ? 'night' : 'day';
  const condition = getCondition(fact?.condition);
  return bs[`fact__theme_${daytime}_${condition}`];
};

export default background;
