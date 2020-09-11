import { Store } from 'keyv';
import NodeCache from 'node-cache';
import { YandexWeatherV2 } from './useWeather';

export default class StoreAdapter extends NodeCache implements Store<YandexWeatherV2> {
  // constructor(options?: Options) {
  //   super(options);
  // }
  delete(key: string): boolean | Promise<boolean> {
    return this.del(key) > 0;
  }

  clear(): void | Promise<void> {
    this.keys().forEach(key => this.del(key));
  }
}
