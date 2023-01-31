import cookie from 'cookie';

// import Cookies from 'js-cookie';

// export function getParsedCookie(key: string): FruitCookieItem[] | undefined {
//   const cookieValue = Cookies.get(key); // Type string | Undefined

//   if (!cookieValue) {
//     return undefined;
//   }

//   try {
//     return JSON.parse(cookieValue); // Type should be a string
//   } catch (err) {
//     return undefined;
//   }
// }

// type FruitCookieItem = {
//   id: string;
//   stars: number;
// };

// export function setStringifiedCookie(key: string, value: FruitCookieItem[]) {
//   Cookies.set(key, JSON.stringify(value));
// }

// export function stringifyCookieValue(value: FruitCookieItem[]) {
//   return JSON.stringify(value);
// }

// export function deleteCookie(key: string) {
//   Cookies.remove(key);
// }

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
