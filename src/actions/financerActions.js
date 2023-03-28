import axios from 'axios';
import { setAddLoading } from './adminActions';
import { BASE_URL, DATA_UPDATED, GET_ERRORS } from './types';

// Add EXPENSE
export const addExpense = (expenseData) => async (dispatch) => {
  console.log('Data: ', expenseData);
  dispatch(setAddLoading());
  const config = {
    headers: {
      'x-auth-token': localStorage.getItem('token'),
    },
    timeout: 5000,
  };
  try {
    const res = await axios.post(
      `${BASE_URL}/api/finance/add-expense`,
      expenseData,
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

// Add Cost
export const addCost = (costData) => async (dispatch) => {
  console.log('Data: ', costData);
  dispatch(setAddLoading());
  const config = {
    headers: {
      'x-auth-token': localStorage.getItem('token'),
    },
    timeout: 5000,
  };
  try {
    const res = await axios.post(
      `${BASE_URL}/api/finance/add-cost`,
      costData,
      config
    );
    dispatch({
      type: DATA_UPDATED,
      payload: 'Cost added',
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
