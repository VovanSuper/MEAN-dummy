let hostUrl = `${app.host}:${app.port}` || '//localhost:8080';

export const Variables = {
  eventsUrl         : `${hostUrl}/events`,
  usersUrl          : `${hostUrl}/users`,
  loginUrl          : `${hostUrl}/login`,
  forgotPasswordUrl : `${hostUrl}/forgotpassword`,
  fbLoginUrl        : `${hostUrl}/auth/facebook`,
  fbMeInfoUrl       : `${hostUrl}/auth/me`
}
