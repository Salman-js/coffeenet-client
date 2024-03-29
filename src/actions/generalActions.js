import axios from 'axios';
import {
  GET_SAMPLES,
  GET_ERRORS,
  LOADING,
  GET_OFFICEMATS,
  GET_PCR,
  GET_SITES,
  GET_CUPPINGS,
  BASE_URL,
  RESET_UPDATE,
  GET_INVOICES,
  GET_SHIPPING,
  GET_PACKING,
  GET_WAYBILLS,
  GET_CERTS,
  GET_SHIPDECS,
  GET_WEIGHTNOTES,
  GET_EXPENSES,
  GET_COSTS,
  GET_WAREHOUSE,
  GET_INVENTORY,
  GET_ASSETS,
} from './types';

// Get samples
export const getSamples = () => async (dispatch) => {
  dispatch(setLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };
  try {
    const res = await axios.get(`${BASE_URL}/api/admin/samples`, config);
    dispatch({
      type: GET_SAMPLES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Get office materials
export const getOfficeMats = () => async (dispatch) => {
  dispatch(setLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };
  try {
    const res = await axios.get(`${BASE_URL}/api/admin/officemat`, config);
    dispatch({
      type: GET_OFFICEMATS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Get office sites
export const getSites = () => async (dispatch) => {
  dispatch(setLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };
  try {
    const res = await axios.get(`${BASE_URL}/api/admin/sites`, config);
    dispatch({
      type: GET_SITES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Get user pcrs
export const getMyPcrs =
  ({ id }) =>
  async (dispatch) => {
    dispatch(setLoading());
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };
    try {
      const res = await axios.get(`${BASE_URL}/api/user/pcr/${id}`, config);
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

// Get cuppings
export const getCuppings = () => async (dispatch) => {
  dispatch(setLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };
  try {
    const res = await axios.get(`${BASE_URL}/api/admin/cuppings`, config);
    dispatch({
      type: GET_CUPPINGS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Get invoices
export const getInvoices = () => async (dispatch) => {
  dispatch(setLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };
  try {
    const res = await axios.get(`${BASE_URL}/api/document/invoices`, config);
    dispatch({
      type: GET_INVOICES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Get shippingInstructions
export const getShippings = () => async (dispatch) => {
  dispatch(setLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };
  try {
    const res = await axios.get(`${BASE_URL}/api/document/shippings`, config);
    dispatch({
      type: GET_SHIPPING,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Get packing lists
export const getPackings = () => async (dispatch) => {
  dispatch(setLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };
  try {
    const res = await axios.get(`${BASE_URL}/api/document/packings`, config);
    dispatch({
      type: GET_PACKING,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Get waybills
export const getWaybills = () => async (dispatch) => {
  dispatch(setLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };
  try {
    const res = await axios.get(`${BASE_URL}/api/document/waybills`, config);
    dispatch({
      type: GET_WAYBILLS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Get CERTIFICATES
export const getCerts = () => async (dispatch) => {
  dispatch(setLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };
  try {
    const res = await axios.get(`${BASE_URL}/api/document/certs`, config);
    dispatch({
      type: GET_CERTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Get Shipping Declerations
export const getShipDecs = () => async (dispatch) => {
  dispatch(setLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };
  try {
    const res = await axios.get(`${BASE_URL}/api/document/ship-decs`, config);
    dispatch({
      type: GET_SHIPDECS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Get Weight Notes
export const getWeightNotes = () => async (dispatch) => {
  dispatch(setLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };
  try {
    const res = await axios.get(
      `${BASE_URL}/api/document/weight-notes`,
      config
    );
    dispatch({
      type: GET_WEIGHTNOTES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Get Expenses
export const getExpenses = () => async (dispatch) => {
  dispatch(setLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };
  try {
    const res = await axios.get(`${BASE_URL}/api/finance/expenses`, config);
    dispatch({
      type: GET_EXPENSES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Get Costs
export const getCosts = () => async (dispatch) => {
  dispatch(setLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };
  try {
    const res = await axios.get(`${BASE_URL}/api/finance/costs`, config);
    dispatch({
      type: GET_COSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Get Warehouse list
export const getWarehouseList = () => async (dispatch) => {
  dispatch(setLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };
  try {
    const res = await axios.get(`${BASE_URL}/api/user/warehouse`, config);
    dispatch({
      type: GET_WAREHOUSE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Get Inventory Entries
export const getInventoryEntries = () => async (dispatch) => {
  dispatch(setLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };
  try {
    const res = await axios.get(`${BASE_URL}/api/finance/inventories`, config);
    dispatch({
      type: GET_INVENTORY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Get Assets
export const getAssets = () => async (dispatch) => {
  dispatch(setLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };
  try {
    const res = await axios.get(`${BASE_URL}/api/finance/assets`, config);
    dispatch({
      type: GET_ASSETS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const emptyErrors = () => (dispatch) => {
  dispatch({
    type: GET_ERRORS,
    payload: {},
  });
};
export const setLoading = () => (dispatch) => {
  dispatch({ type: LOADING });
};
export const resetUpdate = () => (dispatch) => {
  dispatch({ type: RESET_UPDATE });
};
