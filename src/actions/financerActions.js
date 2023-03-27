import axios from 'axios';
import { setAddLoading } from './adminActions';
import { BASE_URL, DATA_UPDATED, GET_ERRORS } from './types';

// Add EXPENSE
export const addExpense = (invoice) => async (dispatch) => {
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
      `${BASE_URL}/api/finance/add-expense`,
      body,
      config
    );
    dispatch({
      type: DATA_UPDATED,
      payload: 'Expense added',
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
