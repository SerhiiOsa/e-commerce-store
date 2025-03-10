export default {
  passwordMinLength: 6,
  saltRounds: 10,
  accessTokenExpIn: '15m', //for jwt
  accessTokenMaxAge: 15 * 60 * 1000, // 15m, for cookie
  refreshTokenExpIn: '7d', //for jwt
  refreshTokenMaxAge: 7 * 24 * 60 * 60 * 1000, // 7 days, for cookie and redis
};
