import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import { CheckRounded, Receipt, Send } from '@mui/icons-material';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import { emptyErrors, resetUpdate } from '../../actions/generalActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingButton } from '@mui/lab';
import { addExpense } from '../../actions/financerActions';

const Input = styled('input')({
  display: 'none',
});

function ExpenseMain() {
  const { isFinancerAuthenticated } = useSelector((state) => state.auth);
  const { addDataLoading, dataUpdated } = useSelector(
    (state) => state.adminData
  );
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);
  const Day = new Date();
  const newDate = `${Day.getDate()}/${Day.getMonth() + 1}/${Day.getFullYear()}`;
  const [receiptFile, setReceipt] = useState(null);
  const navigate = useNavigate();
  const [expense, setExpense] = useState({
    type: '',
    description: '',
    amount: '',
    date: newDate,
    paymentMethod: '',
  });
  const expenseTypes = [
    {
      name: 'Stationary',
      route: 'stationary',
    },
    {
      name: 'Telephone',
      route: 'telephone',
    },
    {
      name: 'Rent',
      route: 'rent',
    },
    {
      name: 'Cleaning',
      route: 'cleaning',
    },
    {
      name: 'Bank Service Charge',
      route: 'bank-service',
    },
    {
      name: 'Repair',
      route: 'repair',
    },
    {
      name: 'Salary',
      route: 'salary',
    },
    {
      name: 'Pension',
      route: 'pension',
    },
    {
      name: 'Transport',
      route: 'transport',
    },
    {
      name: 'Fuel',
      route: 'fuel',
    },
    {
      name: 'Interest',
      route: 'interest',
    },
    {
      name: 'Donation',
      route: 'donation',
    },
    {
      name: 'Penality',
      route: 'penality',
    },
    {
      name: 'Postage',
      route: 'postage',
    },
    {
      name: 'Amortization',
      route: 'amortization',
    },
    {
      name: 'License',
      route: 'license',
    },
    {
      name: 'Depratation',
      route: 'depratation',
    },
    {
      name: 'Miscellaneous',
      route: 'miscellaneous',
    },
    {
      name: 'Utility',
      route: 'utility',
    },
    {
      name: 'Travel',
      route: 'travel',
    },
    {
      name: 'Insurance',
      route: 'insurance',
    },
    {
      name: 'Membership',
      route: 'membership',
    },
    {
      name: 'Protectional fee',
      route: 'protectional-fee',
    },
    {
      name: 'Promotion',
      route: 'promotion',
    },
    {
      name: 'Loading & Unloading',
      route: 'loading-unloading',
    },
  ];
  function onSubmit(e) {
    e.preventDefault();
    console.log('File: ', Object.keys(receiptFile));
    const expenseData = new FormData();
    expenseData.append('type', expense.type);
    expenseData.append('description', expense.description);
    expenseData.append('amount', expense.amount);
    expenseData.append('paymentMethod', expense.paymentMethod);
    Object.keys(receiptFile).forEach(function (key, index) {
      expenseData.append('receipt', receiptFile[key]);
    });
    expenseData.append('date', newDate);
    expenseData.append('createdAt', new Date().getTime());
    dispatch(addExpense(expenseData));
  }
  useEffect(() => {
    if (!isFinancerAuthenticated) {
      navigate('/');
    }
  }, [isFinancerAuthenticated, navigate]);
  useEffect(() => {
    const toastOptions = {
      position: 'top-right',
      autoClose: 5000,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
    };
    if (Object.keys(errors).length > 0 && errors.unknown) {
      toast.error('Unknown Error, Please Try Again', toastOptions);
      setTimeout(() => {
        dispatch(emptyErrors());
      }, 8000);
    }
  }, [errors, dispatch]);
  useEffect(() => {
    const toastOptions = {
      position: 'top-right',
      autoClose: 5000,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
    };
    if (dataUpdated === 'Expense added') {
      toast.success('Expense data submitted', toastOptions);
      setTimeout(() => {
        dispatch(resetUpdate());
      }, 8000);
    }
  }, [dataUpdated, dispatch]);
  return (
    <Grid container className='dashboard-container justify-around'>
      <form onSubmit={onSubmit} className='w-full'>
        <Grid className='accounts-list-container w-full -mt-4'>
          <div className='w-full flex flex-row justify-between mb-2'>
            <p className='h4 text-left'>Expenses</p>
            <LoadingButton
              type='submit'
              variant='contained'
              loading={addDataLoading}
              sx={{
                mr: 5,
                ml: 5,
              }}
              startIcon={<Send />}
              disabled={
                !expense.type || !expense.amount || !expense.paymentMethod
              }
            >
              Submit
            </LoadingButton>
          </div>
        </Grid>
        <Grid
          className='invoice-layout-container w-full bg-white p-6 overflow-auto'
          style={{ height: '70vh' }}
        >
          <Grid
            container
            gap={2}
            columns={13}
            className='w-full flex justify-start'
          >
            <Grid item lg={3}>
              <Grid item lg={12}>
                <FormControl fullWidth>
                  <InputLabel>Expense Type</InputLabel>
                  <Select
                    labelId='select-label'
                    id='simple-select'
                    value={expense.type}
                    className='text-left'
                    label='Expense Type'
                    onChange={(e) =>
                      setExpense({
                        ...expense,
                        type: e.target.value,
                      })
                    }
                  >
                    {expenseTypes.map((expenseType, index) => {
                      return (
                        <MenuItem value={expenseType.name}>
                          {expenseType.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item lg={12}>
                <TextField
                  className='w-full mt-3'
                  type='number'
                  value={expense.amount}
                  autoComplete='false'
                  onChange={(e) =>
                    setExpense({
                      ...expense,
                      amount: e.target.value,
                    })
                  }
                  label='Amount'
                />
              </Grid>
              <Grid item lg={12}>
                <FormControl fullWidth className='mt-3'>
                  <InputLabel>Method of Payment</InputLabel>
                  <Select
                    labelId='select-label'
                    id='simple-select'
                    value={expense.paymentMethod}
                    className='text-left'
                    label='Method of Payment'
                    onChange={(e) =>
                      setExpense({
                        ...expense,
                        paymentMethod: e.target.value,
                      })
                    }
                  >
                    <MenuItem value='Cash'>Cash</MenuItem>
                    <MenuItem value='Bank Transfer'>Bank Transfer</MenuItem>
                    <MenuItem value='Cheque'>Cheque</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item lg={5}>
              <Grid item lg={12}>
                <TextField
                  className='w-full'
                  type='text'
                  multiline
                  minRows={3}
                  value={expense.description}
                  autoComplete='false'
                  onChange={(e) =>
                    setExpense({
                      ...expense,
                      description: e.target.value,
                    })
                  }
                  label='Description'
                />
              </Grid>
            </Grid>
            <Grid item lg={4}>
              <Grid item lg={12}>
                <div className='admin-dashboard-main-item'>
                  <div className='file-upload-container'>
                    <div className='upload-icon-container p-3 w-fit text-center items-center flex justify-center mx-auto rounded-full border border-dashed border-gray-400'>
                      {receiptFile !== null ? <CheckRounded /> : <Receipt />}
                    </div>
                    <Box
                      sx={{
                        color: 'text.secondary',
                        fontSize: 18,
                        marginX: 'auto',
                      }}
                    >
                      Upload Receipt
                    </Box>
                    <Box>
                      <div className='file-upload-button-container'>
                        <label htmlFor='receipt-file'>
                          <Input
                            accept='image/*'
                            id='receipt-file'
                            name='receipt'
                            type='file'
                            multiple
                            onChange={(e) => setReceipt(e.target.files)}
                          />
                          <Button
                            sx={{ borderRadius: '2em' }}
                            variant='contained'
                            component='span'
                            disableElevation
                          >
                            Choose File
                          </Button>
                        </label>
                      </div>
                    </Box>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <ToastContainer />
      </form>
    </Grid>
  );
}

export default ExpenseMain;
