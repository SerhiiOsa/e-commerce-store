import ENV_VARS from '../config/envVars.js';
import authConfig from '../config/auth.js';

export const setTokenCookies = (accessToken, refreshToken, res) => {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: ENV_VARS.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: authConfig.accessTokenMaxAge,
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: ENV_VARS.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: authConfig.refreshTokenMaxAge,
  });
};

export const deleteTokenCookies = (res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
};
