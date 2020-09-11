import Cors from 'cors';
import promisifyMiddleware from './promisifyMiddleware';

const whitelist = ['https://db.onlinewebfonts.com1', 'https://api.weather.yandex.ru'];

const cors = Cors({
  origin(origin, cb) {
    if (!origin || whitelist.includes(origin)) {
      cb(null, true);
    } else {
      cb(new Error('Not allowed by CORS'));
      console.error('Not allowed by CORS');
    }
  },
});

export default promisifyMiddleware(cors);
