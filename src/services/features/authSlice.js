import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const getUserFromCookies = () => {
  const user = Cookies.get('user');
  return user ? JSON.parse(user) : null;
};
const getModulesFromCookies = () => {
  const modules = localStorage.getItem('modules');
  return modules ? JSON.parse(modules) : null;
};
const getTokenFromCookies = () => {
  const token = Cookies.get('token');
  return token ? token : null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getUserFromCookies(),
    token: getTokenFromCookies(),
    modules: getModulesFromCookies(),
  },
  reducers: {
    setCredentials: (state, action) => {
      const payload = action.payload;
      const data = payload?.data?.data;
      state.user = data?.data?.data;
      state.token = data?.token;
      state.modules = data?.data?.modul;

      const expireDays = 3;
      const cookieOptions = { expires: expireDays };

      Cookies.set('user', JSON.stringify(data?.data?.data), cookieOptions);
      Cookies.set('token', data?.token, cookieOptions);
      localStorage.setItem('modules', JSON.stringify(data?.data?.modul));
    },
    logOut: (state) => {
      state.user = {};
      state.token = null;

      Cookies.remove('user');
      Cookies.remove('token');
      localStorage.removeItem('modules');
      localStorage.removeItem('side-open');
      window.location.reload();
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentModules = (state) => state.auth.modules;
export const selectCurrentToken = (state) => state.auth.token;
