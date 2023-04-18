import axios from 'axios';
import { setAddLoading } from './adminActions';
import { BASE_URL, DATA_UPDATED, GET_ERRORS } from './types';

// Add Warehouse list
export const addWarehouseList = (coffeeData) => async (dispatch) => {
  dispatch(setAddLoading());
  const config = {
    headers: {
      'x-auth-token': localStorage.getItem('token'),
    },
    timeout: 5000,
  };
  try {
    const res = await axios.post(
      `${BASE_URL}/api/user/add-warehouse`,
      coffeeData,
      config
    );
    dispatch({
      type: DATA_UPDATED,
      payload: 'Warehouse added',
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
