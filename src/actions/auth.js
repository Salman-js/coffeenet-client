import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  ADMIN_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  ADMIN_LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LOADING,
  GET_ERRORS,
  FINANCER_LOADED,
  FINANCER_LOGIN_SUCCESS,
  BASE_URL,
  DOCMANAGER_LOGIN_SUCCESS,
  DOCMANAGER_LOADED,
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`${BASE_URL}/api/auth`);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Load Admin
export const loadAdmin = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`${BASE_URL}/api/auth/admin`);

    dispatch({
      type: ADMIN_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Load Financer
export const loadFinancer = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`${BASE_URL}/api/auth/financer`);

    dispatch({
      type: FINANCER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Load Doc manager
export const loadDocmanager = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`${BASE_URL}/api/auth/documenter`);

    dispatch({
      type: DOCMANAGER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Register User
export const register =
  ({ fname, lname, type, email, password, date }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ fname, lname, type, email, password, date });
    try {
      const res = await axios.post(`${BASE_URL}/api/user`, body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    }
  };
export const emptyRegUser = () => (dispatch) => {
  dispatch({
    type: REGISTER_SUCCESS,
    payload: null,
  });
};
// Login User
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(loading());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post(`${BASE_URL}/api/auth`, body, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data ? err.response.data : err,
      });
    }
  };

// Login Admin
export const adminLogin = (email, password) => async (dispatch) => {
  dispatch(loading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(`${BASE_URL}/api/auth/admin`, body, config);

    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadAdmin());
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOGIN_FAIL,
    });
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data ? err.response.data : err,
    });
  }
};

// Login Financer
export const financerLogin = (email, password) => async (dispatch) => {
  dispatch(loading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(`${BASE_URL}/api/auth/financer`, body, config);

    dispatch({
      type: FINANCER_LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadFinancer());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data ? err.response.data : err,
    });
  }
};

// Login Doc Manager
export const docmanagerLogin = (email, password) => async (dispatch) => {
  dispatch(loading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      `${BASE_URL}/api/auth/documenter`,
      body,
      config
    );

    dispatch({
      type: DOCMANAGER_LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadDocmanager());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data ? err.response.data : err,
    });
  }
};

export const loading = () => (dispatch) => {
  dispatch({ type: LOADING });
};
// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
