import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Button,
  FormControl,
  InputLabel,
  TextField,
  OutlinedInput,
  InputAdornment,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from '@mui/material';
import {
  CheckRounded,
  Description,
  ExpandMore,
  Receipt,
  Send,
} from '@mui/icons-material';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingButton } from '@mui/lab';
import { addCost } from '../../actions/financerActions';
import { emptyErrors, resetUpdate } from '../../actions/generalActions';

const Input = styled('input')({
  display: 'none',
});

function WarehouseMain() {
  const { isWarehouserAuthenticated } = useSelector((state) => state.auth);
  const { addDataLoading, dataUpdated } = useSelector(
    (state) => state.adminData
  );
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);
  const Day = new Date();
  const newDate = `${Day.getDate()}/${Day.getMonth() + 1}/${Day.getFullYear()}`;
  const [receiptFile, setReceipt] = useState(null);
  const navigate = useNavigate();
  const [coffee, setCoffee] = useState({
    total: '',
    export: '',
    cGrade: '',
    date: newDate,
    color: '',
    gravity: '',
  });
  function onSubmit(e) {
    e.preventDefault();
    const expenseData = new FormData();
    expenseData.append('type', coffee.type);
    expenseData.append('amount', coffee.amount);
    expenseData.append('unitPrice', coffee.unitPrice);
    expenseData.append('paymentMethod', coffee.paymentMethod);
    Object.keys(receiptFile).forEach(function (key, index) {
      expenseData.append('receipt', receiptFile[key]);
    });
    expenseData.append('date', newDate);
    expenseData.append('createdAt', new Date().getTime());
    dispatch(addCost(expenseData));
  }
  useEffect(() => {
    if (!isWarehouserAuthenticated) {
      navigate('/');
    }
  }, [isWarehouserAuthenticated, navigate]);
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
            <p className='h4 text-left'>Warehouse</p>
            <div>
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
                  !coffee.total.trim().length ||
                  parseInt(coffee.total) !==
                    parseInt(
                      parseInt(coffee.export) +
                        parseInt(coffee.cGrade) +
                        parseInt(coffee.color) +
                        parseInt(coffee.gravity)
                    )
                }
              >
                Submit
              </LoadingButton>
              <Button
                startIcon={<Description />}
                variant='contained'
                onClick={() => navigate('/warehouse')}
              >
                View List
              </Button>
            </div>
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
            <Grid item lg={5}>
              <Grid item lg={12}>
                <TextField
                  className='w-full'
                  type='number'
                  value={coffee.total}
                  autoComplete='false'
                  onChange={(e) =>
                    setCoffee({
                      ...coffee,
                      total: e.target.value,
                    })
                  }
                  label='Total'
                />
              </Grid>
            </Grid>
            <Grid item lg={4}>
              <TextField
                className='w-full'
                type='number'
                value={coffee.export}
                autoComplete='false'
                onChange={(e) =>
                  setCoffee({
                    ...coffee,
                    export: e.target.value,
                  })
                }
                label='Prepared for export'
              />
            </Grid>
            <Grid item lg={9}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                >
                  <Typography>
                    Rejected{' '}
                    <b>
                      {parseFloat(coffee.total - coffee.export).toFixed(2)}
                      &nbsp; Kg
                    </b>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container gap={2} columns={13} className='w-full'>
                    <Grid item lg={6}>
                      <TextField
                        className='w-full'
                        type='number'
                        value={coffee.cGrade}
                        autoComplete='false'
                        onChange={(e) =>
                          setCoffee({
                            ...coffee,
                            cGrade: e.target.value,
                          })
                        }
                        label='C-Grade'
                      />
                    </Grid>
                    <Grid item lg={6}>
                      <TextField
                        className='w-full'
                        type='number'
                        value={coffee.color}
                        autoComplete='false'
                        onChange={(e) =>
                          setCoffee({
                            ...coffee,
                            color: e.target.value,
                          })
                        }
                        label='Color Sorting'
                      />
                    </Grid>
                    <Grid item lg={6}>
                      <TextField
                        className='w-full'
                        type='number'
                        value={coffee.gravity}
                        autoComplete='false'
                        onChange={(e) =>
                          setCoffee({
                            ...coffee,
                            gravity: e.target.value,
                          })
                        }
                        label='Gravity'
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </Grid>
        <ToastContainer />
      </form>
    </Grid>
  );
}

export default WarehouseMain;
