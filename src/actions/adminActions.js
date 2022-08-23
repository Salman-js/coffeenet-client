import axios from 'axios';
import {
  GET_ACTIVE_ACCOUNTS,
  GET_PENDING_ACCOUNTS,
  GET_ERRORS,
  REJECT_ACCOUNT,
  DELETE_ACCOUNT,
  UPDATE_PCR,
  DELETE_PCR,
  GET_PCR,
  LOADING,
  ADD_CUPPING,
  ADD_LOADING,
  BASE_URL,
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
    const res = await axios.get(
      `${BASE_URL}/api/admin/active-accounts`,
      config
    );
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
    const res = await axios.get(
      `${BASE_URL}/api/admin/pending-accounts`,
      config
    );
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
      const res = await axios.post(
        `${BASE_URL}/api/admin/approve-account`,
        body,
        config
      );
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
      const res = await axios.post(
        `${BASE_URL}/api/admin/reject-account`,
        body,
        config
      );
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
      const res = await axios.post(
        `${BASE_URL}/api/admin/delete-account`,
        body,
        config
      );
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
      const res = await axios.post(
        `${BASE_URL}/api/admin/reject-pcr`,
        body,
        config
      );
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
      const res = await axios.post(
        `${BASE_URL}/api/admin/approve-pcr`,
        body,
        config
      );
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

// Get pcrs
export const getPcrs = () => async (dispatch) => {
  dispatch(setLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };
  try {
    const res = await axios.get(`${BASE_URL}/api/admin/pcr`, config);
    dispatch({
      type: GET_PCR,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Add cupping
export const addCupping =
  ({
    name,
    createdBy,
    cup1,
    cup2,
    cup3,
    cup1Total,
    cup2Total,
    cup3Total,
    cup1Overall,
    cup2Overall,
    cup3Overall,
    qualityscale,
  }) =>
  async (dispatch) => {
    dispatch(setAddLoading());
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    const body = JSON.stringify({
      name,
      createdBy,
      cup1,
      cup2,
      cup3,
      cup1Total,
      cup2Total,
      cup3Total,
      cup1Overall,
      cup2Overall,
      cup3Overall,
      qualityscale,
    });
    try {
      const res = await axios.post(
        `${BASE_URL}/api/admin/add-cuppings`,
        body,
        config
      );
      dispatch({
        type: ADD_CUPPING,
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

export const setAddLoading = () => (dispatch) => {
  dispatch({ type: ADD_LOADING });
};
