import cookie from 'cookie';

export function createSerializedRegisterSessionTokenCookie(token: string) {
  // check if we are in production e.g Fly.io
  const isProduction = process.env.NODE_ENV === 'production';

  const maxAge = 60 * 60 * 24; // 24 hours in seconds

  return cookie.serialize('sessionToken', token, {
    // new browsers
    maxAge: maxAge,
    // for internet explorer and old browsers
    expires: new Date(
      Date.now() /** current date in milliseconds */ +
        maxAge * 1000 /** 24  hours in milliseconds */,
    ),
    httpOnly: true,
    secure: isProduction,
    path: '/',
    // Be explicit about new default behavior
    // in browsers
    // https://web.dev/samesite-cookies-explained/
    sameSite: 'lax',
  });
}
