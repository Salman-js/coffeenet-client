import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, TextField, InputAdornment } from '@mui/material';
import { Description, Send } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingButton } from '@mui/lab';
import { emptyErrors, resetUpdate } from '../../../actions/generalActions';
import { addInventory } from '../../../actions/financerActions';

function InventoryMain() {
  const { isFinancerAuthenticated } = useSelector((state) => state.auth);
  const { addDataLoading, dataUpdated } = useSelector(
    (state) => state.adminData
  );
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);
  const Day = new Date();
  const newDate = `${Day.getDate()}/${Day.getMonth() + 1}/${Day.getFullYear()}`;
  const navigate = useNavigate();
  const [inventory, setInventory] = useState({
    sellerName: '',
    coffeeType: '',
    totalPrice: 0,
    date: newDate,
  });
  function onSubmit(e) {
    e.preventDefault();
    const newInventoryData = {
      ...inventory,
      createdAt: new Date().getTime(),
    };
    dispatch(addInventory(newInventoryData));
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
    if (dataUpdated === 'Inventory added') {
      toast.success('Entry submitted', toastOptions);
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
            <p className='h4 text-left'>New Inventory Entry</p>
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
                  !inventory.sellerName.trim().length ||
                  !inventory.coffeeType.trim().length ||
                  !inventory.totalPrice
                }
              >
                Submit
              </LoadingButton>
              <Button
                startIcon={<Description />}
                variant='contained'
                onClick={() => navigate('/inventory')}
              >
                View Inventory
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
            <Grid item lg={4}>
              <Grid item lg={12}>
                <TextField
                  className='w-full'
                  value={inventory.sellerName}
                  autoComplete='false'
                  onChange={(e) =>
                    setInventory({
                      ...inventory,
                      sellerName: e.target.value,
                    })
                  }
                  label='Seller Name'
                />
              </Grid>
            </Grid>
            <Grid item lg={4}>
              <Grid item lg={12}>
                <TextField
                  className='w-full'
                  value={inventory.coffeeType}
                  autoComplete='false'
                  onChange={(e) =>
                    setInventory({
                      ...inventory,
                      coffeeType: e.target.value,
                    })
                  }
                  label='Coffee Type'
                />
              </Grid>
            </Grid>
            <Grid item lg={4}>
              <TextField
                className='w-full'
                type='number'
                value={inventory.totalPrice}
                autoComplete='false'
                onChange={(e) =>
                  setInventory({
                    ...inventory,
                    totalPrice: e.target.value,
                  })
                }
                inputProps={{ inputMode: 'numeric', 'aria-controls': 'false' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='start'>ETB</InputAdornment>
                  ),
                }}
                label='TotalPrice'
              />
            </Grid>
          </Grid>
        </Grid>
        <ToastContainer />
      </form>
    </Grid>
  );
}

export default InventoryMain;
