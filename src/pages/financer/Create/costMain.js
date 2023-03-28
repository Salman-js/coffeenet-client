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
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import { CheckRounded, Receipt, Send } from '@mui/icons-material';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import { emptyErrors, resetUpdate } from '../../../actions/generalActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingButton } from '@mui/lab';
import { addCost } from '../../../actions/financerActions';

const Input = styled('input')({
  display: 'none',
});

function CostMain() {
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
  const [cost, setCost] = useState({
    type: '',
    amount: '',
    unitPrice: '',
    date: newDate,
    paymentMethod: '',
  });
  const purchaseTypes = ['Local', 'ECX'];
  function onSubmit(e) {
    e.preventDefault();
    const expenseData = new FormData();
    expenseData.append('type', cost.type);
    expenseData.append('amount', cost.amount);
    expenseData.append('unitPrice', cost.unitPrice);
    expenseData.append('paymentMethod', cost.paymentMethod);
    Object.keys(receiptFile).forEach(function (key, index) {
      expenseData.append('receipt', receiptFile[key]);
    });
    expenseData.append('date', newDate);
    expenseData.append('createdAt', new Date().getTime());
    dispatch(addCost(expenseData));
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
    if (dataUpdated === 'Cost added') {
      toast.success('Cost/purchase data submitted', toastOptions);
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
            <p className='h4 text-left'>Cost/Purchase</p>
            <LoadingButton
              type='submit'
              variant='contained'
              loading={addDataLoading}
              sx={{
                mr: 5,
                ml: 5,
              }}
              startIcon={<Send />}
              disabled={!cost.type || !cost.amount || !cost.paymentMethod}
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
                  <InputLabel>Purchase Type</InputLabel>
                  <Select
                    labelId='select-label'
                    id='simple-select'
                    value={cost.type}
                    className='text-left'
                    label='Purchase Type'
                    onChange={(e) =>
                      setCost({
                        ...cost,
                        type: e.target.value,
                      })
                    }
                  >
                    {purchaseTypes.map((purchaseType, index) => {
                      return (
                        <MenuItem key={index} value={purchaseType}>
                          {purchaseType}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item lg={12}>
                <FormControl fullWidth className='mt-3'>
                  <InputLabel>Method of Payment</InputLabel>
                  <Select
                    labelId='select-label'
                    id='simple-select'
                    value={cost.paymentMethod}
                    className='text-left'
                    label='Method of Payment'
                    onChange={(e) =>
                      setCost({
                        ...cost,
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
                  type='number'
                  value={cost.amount}
                  autoComplete='false'
                  onChange={(e) =>
                    setCost({
                      ...cost,
                      amount: e.target.value,
                    })
                  }
                  label='Amount'
                />
              </Grid>
              <Grid item lg={12}>
                <FormControl fullWidth variant='outlined' className='mt-3'>
                  <InputLabel>Unit Price</InputLabel>
                  <OutlinedInput
                    className='w-full'
                    type='number'
                    value={cost.unitPrice}
                    autoComplete='false'
                    onChange={(e) =>
                      setCost({
                        ...cost,
                        unitPrice: e.target.value,
                      })
                    }
                    label='Unit Price'
                    endAdornment={
                      <InputAdornment position='end'>
                        Total: {cost.unitPrice * cost.amount}
                      </InputAdornment>
                    }
                  />
                </FormControl>
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

export default CostMain;
