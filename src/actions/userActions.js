import axios from 'axios';
import {
  ADD_SAMPLE,
  ADD_SITE,
  ADD_OFFICEMAT,
  SEND_PCR,
  GET_ERRORS,
  ADD_LOADING,
  BASE_URL,
} from './types';

// Add sample
export const addSample =
  ({ name, username, type, date }) =>
  async (dispatch) => {
    dispatch(setAddLoading());
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    const body = JSON.stringify({ name, username, type, date });
    try {
      const res = await axios.post(
        `${BASE_URL}/api/user/add-sample`,
        body,
        config
      );
      dispatch({
        type: ADD_SAMPLE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    }
  };

// Send pcr
export const sendPcr =
  ({ userId, fname, lname, reason, amount, date }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    const body = JSON.stringify({ userId, fname, lname, reason, amount, date });
    try {
      const res = await axios.post(
        `${BASE_URL}/api/user/send-pcr`,
        body,
        config
      );
      dispatch({
        type: SEND_PCR,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    }
  };

// Add site
export const addSite =
  ({ name, location, price, map }) =>
  async (dispatch) => {
    dispatch(setAddLoading());
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    const body = JSON.stringify({ name, location, price, map });
    try {
      const res = await axios.post(
        `${BASE_URL}/api/user/add-site`,
        body,
        config
      );
      dispatch({
        type: ADD_SITE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    }
  };

// Add office material
export const addOfficeMat =
  ({ type, name, dop, price, buyer }) =>
  async (dispatch) => {
    dispatch(setAddLoading());
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    const body = JSON.stringify({ type, name, dop, price, buyer });
    try {
      const res = await axios.post(
        `${BASE_URL}/api/user/add-officemat`,
        body,
        config
      );
      dispatch({
        type: ADD_OFFICEMAT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    }
  };

export const setAddLoading = () => (dispatch) => {
  dispatch({ type: ADD_LOADING });
};
