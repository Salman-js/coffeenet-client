import axios from 'axios';
import { setAddLoading } from './adminActions';
import { GET_ERRORS, BASE_URL, DATA_UPDATED } from './types';

// Add invoice
export const addInvoice = (invoice) => async (dispatch) => {
  dispatch(setAddLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };

  const body = JSON.stringify(invoice);
  try {
    const res = await axios.post(
      `${BASE_URL}/api/document/add-invoice`,
      body,
      config
    );
    dispatch({
      type: DATA_UPDATED,
      payload: 'Invoice added',
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Add shipping
export const addShipping = (shipping) => async (dispatch) => {
  dispatch(setAddLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };

  const body = JSON.stringify(shipping);
  try {
    const res = await axios.post(
      `${BASE_URL}/api/document/add-shipping`,
      body,
      config
    );
    dispatch({
      type: DATA_UPDATED,
      payload: 'Shipping added',
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Add packing-list
export const addPacking = (packing) => async (dispatch) => {
  dispatch(setAddLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };

  const body = JSON.stringify(packing);
  try {
    const res = await axios.post(
      `${BASE_URL}/api/document/add-packing`,
      body,
      config
    );
    dispatch({
      type: DATA_UPDATED,
      payload: 'Packing list added',
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
