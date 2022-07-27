import axios from 'axios';
import {
  GET_ACTIVE_ACCOUNTS,
  GET_PENDING_ACCOUNTS,
  GET_ERRORS,
  REJECT_ACCOUNT,
  DELETE_ACCOUNT,
  UPDATE_PCR,
  DELETE_PCR,
  LOADING,
} from './types';

// Get active accounts
export const getActiveAccs = () => async (dispatch) => {
  dispatch(setLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };
  try {
    const res = await axios.get('/api/admin/active-accounts', config);
    dispatch({
      type: GET_ACTIVE_ACCOUNTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Get pending accounts
export const getPendingAccs = () => async (dispatch) => {
  dispatch(setLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };
  try {
    const res = await axios.get('/api/admin/pending-accounts', config);
    dispatch({
      type: GET_PENDING_ACCOUNTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Approve account
export const approveAcc =
  ({ id, fname, lname, email, password, type, approvedBy }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };
    const body = JSON.stringify({
      fname,
      lname,
      email,
      password,
      type,
      approvedBy,
    });
    const idObj = {
      id,
    };
    try {
      dispatch(rejectAcc(idObj));
      const res = await axios.post('/api/admin/approve-account', body, config);
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    }
  };

// Reject account
export const rejectAcc =
  ({ id }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };
    const body = JSON.stringify({ id });
    try {
      dispatch({
        type: REJECT_ACCOUNT,
        payload: id,
      });
      const res = await axios.post('/api/admin/reject-account', body, config);
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    }
  };

// Delete account
export const deleteAcc =
  ({ id, type }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };
    const body = JSON.stringify({ id, type });
    try {
      dispatch({
        type: DELETE_ACCOUNT,
        payload: id,
      });
      const res = await axios.post('/api/admin/delete-account', body, config);
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    }
  };

// Reject pcr
export const rejectPcr =
  ({ id }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };
    const body = JSON.stringify({ id });
    try {
      const res = await axios.post('/api/admin/reject-pcr', body, config);
      dispatch({
        type: DELETE_PCR,
        payload: id,
      });
      dispatch({
        type: UPDATE_PCR,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    }
  };

// Approve pcr
export const approvePcr =
  ({ id }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };
    const body = JSON.stringify({ id });
    try {
      const res = await axios.post('/api/admin/approve-pcr', body, config);
      dispatch({
        type: DELETE_PCR,
        payload: id,
      });
      dispatch({
        type: UPDATE_PCR,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    }
  };

export const setLoading = () => (dispatch) => {
  dispatch({ type: LOADING });
};
