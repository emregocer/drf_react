const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_BASE
    : process.env.REACT_APP_DEV_BASE;
const authBaseURL = `${baseURL}/auth/jwt`;
export const refreshUrl = `${authBaseURL}/refresh/`;
export const loginURL = `${authBaseURL}/create/`;
