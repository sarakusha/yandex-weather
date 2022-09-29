import { HttpError } from 'http-errors';
import { NextApiHandler } from 'next';
import getWeather from '../../lib/getWeather';

const weather: NextApiHandler = async (req, res) => {
  try {
    const [value, maxAge] = await getWeather(req.url);
    res.setHeader(
      'Cache-Control',
      maxAge && maxAge > 0 ? `max-age=${Math.min(maxAge, 30 * 60)}, public` : 'no-store'
    );
    return res.json(value);
  } catch (e) {
    const err = e as HttpError;
    return res.status(err.status ?? err.statusCode ?? 500).send(err.message);
  }
};

export default weather;
