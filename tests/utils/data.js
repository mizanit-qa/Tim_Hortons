import crypto from 'crypto';

export const makeEmail = (base = 'ilgar.rbi', domain = 'gmail.com') =>
  `${base}+${crypto.randomUUID()}@${domain}`;