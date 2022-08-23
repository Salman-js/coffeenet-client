import {
  LOADING,
  REGISTER_FAIL,
  USER_LOADED,
  ADMIN_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  ADMIN_LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  FINANCER_LOGIN_SUCCESS,
  FINANCER_LOADED,
  DOCMANAGER_LOGIN_SUCCESS,
  DOCMANAGER_LOADED,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isAdminAuthenticated: null,
  isFinancerAuthenticated: null,
  isDocmanagerAuthenticated: null,
  loading: false,
  user: null,
  admin: null,
  financer: null,
  docManager: null,
};

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case ADMIN_LOADED:
      return {
        ...state,
        isAdminAuthenticated: true,
        loading: false,
        admin: payload,
      };
    case FINANCER_LOADED:
      return {
        ...state,
        isFinancerAuthenticated: true,
        loading: false,
        financer: payload,
      };
    case DOCMANAGER_LOADED:
      return {
        ...state,
        isDocmanagerAuthenticated: true,
        loading: false,
        docManager: payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case ADMIN_LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAdminAuthenticated: true,
        loading: false,
      };
    case FINANCER_LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isFinancerAuthenticated: true,
        loading: false,
      };
    case DOCMANAGER_LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isDocmanagerAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isAdminAuthenticated: false,
        isFinancerAuthenticated: false,
        isDocmanagerAuthenticated: false,
        user: null,
        admin: null,
        financer: null,
        docManager: null,
        loading: false,
      };
    default:
      return state;
  }
};
