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

// Add way-bill
export const addWaybill = (waybill) => async (dispatch) => {
  dispatch(setAddLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };

  const body = JSON.stringify(waybill);
  try {
    const res = await axios.post(
      `${BASE_URL}/api/document/add-waybill`,
      body,
      config
    );
    dispatch({
      type: DATA_UPDATED,
      payload: 'Way bill added',
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Add certificate
export const addCert = (cert) => async (dispatch) => {
  dispatch(setAddLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };

  const body = JSON.stringify(cert);
  try {
    const res = await axios.post(
      `${BASE_URL}/api/document/add-cert`,
      body,
      config
    );
    dispatch({
      type: DATA_UPDATED,
      payload: 'cert added',
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Add ship Dec
export const addShipDec = (shipDec) => async (dispatch) => {
  dispatch(setAddLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };

  const body = JSON.stringify(shipDec);
  try {
    const res = await axios.post(
      `${BASE_URL}/api/document/add-ship-dec`,
      body,
      config
    );
    dispatch({
      type: DATA_UPDATED,
      payload: 'shipDec added',
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Add Weight Note
export const addWeightNote = (weightNote) => async (dispatch) => {
  dispatch(setAddLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };

  const body = JSON.stringify(weightNote);
  try {
    const res = await axios.post(
      `${BASE_URL}/api/document/add-weight-note`,
      body,
      config
    );
    dispatch({
      type: DATA_UPDATED,
      payload: 'weight note added',
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
