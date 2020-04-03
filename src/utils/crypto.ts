import { createHash } from 'crypto';

export const randomString = () =>
  Math.random()
    .toString(16)
    .slice(2);

export const md5 = message => {
  const md5Hash = createHash('md5');
  return md5Hash.update(message).digest('hex');
};
