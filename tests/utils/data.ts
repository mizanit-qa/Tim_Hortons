import crypto from 'crypto';

export const makeEmail = (
  base: string = 'ilgar.rbi',
  domain: string = 'gmail.com'
): string => `${base}+${crypto.randomUUID()}@${domain}`;
