import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, TextField, InputAdornment } from '@mui/material';
import { Description, Send } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingButton } from '@mui/lab';
import { emptyErrors, resetUpdate } from '../../../actions/generalActions';
import { addAsset } from '../../../actions/financerActions';

function AssetMain() {
  const { isFinancerAuthenticated } = useSelector((state) => state.auth);
  const { addDataLoading, dataUpdated } = useSelector(
    (state) => state.adminData
  );
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);
  const Day = new Date();
  const newDate = `${Day.getDate()}/${Day.getMonth() + 1}/${Day.getFullYear()}`;
  const navigate = useNavigate();
  const [asset, setAsset] = useState({
    name: '',
    quantity: 0,
    unitPrice: 0,
    date: newDate,
  });
  function onSubmit(e) {
    e.preventDefault();
    const newAssetData = {
      ...asset,
      totalPrice: asset.unitPrice * asset.quantity,
      createdAt: new Date().getTime(),
    };
    dispatch(addAsset(newAssetData));
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
    if (dataUpdated === 'Asset added') {
      toast.success('Data submitted', toastOptions);
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
            <p className='h4 text-left'>New Asset</p>
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
                  !asset.name.trim().length ||
                  !asset.quantity ||
                  asset.unitPrice * asset.quantity < 1000 ||
                  !asset.unitPrice
                }
              >
                Submit
              </LoadingButton>
              <Button
                startIcon={<Description />}
                variant='contained'
                onClick={() => navigate('/asset')}
              >
                View Assets
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
                  value={asset.name}
                  autoComplete='false'
                  onChange={(e) =>
                    setAsset({
                      ...asset,
                      name: e.target.value,
                    })
                  }
                  label='Item Name'
                />
              </Grid>
            </Grid>
            <Grid item lg={4}>
              <Grid item lg={12}>
                <TextField
                  className='w-full'
                  type='number'
                  value={asset.quantity}
                  autoComplete='false'
                  onChange={(e) =>
                    setAsset({
                      ...asset,
                      quantity: e.target.value,
                    })
                  }
                  label='Quantity'
                />
              </Grid>
            </Grid>
            <Grid item lg={4}>
              <Grid item lg={12}>
                <TextField
                  className='w-full'
                  type='number'
                  value={asset.unitPrice}
                  autoComplete='false'
                  onChange={(e) =>
                    setAsset({
                      ...asset,
                      unitPrice: e.target.value,
                    })
                  }
                  inputProps={{
                    inputMode: 'numeric',
                    'aria-controls': 'false',
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='start'>ETB</InputAdornment>
                    ),
                  }}
                  label='Unit Price'
                />
              </Grid>
              <Grid item lg={12}>
                <TextField
                  className='w-full mt-3'
                  type='number'
                  value={asset.unitPrice * asset.quantity}
                  autoComplete='false'
                  inputProps={{
                    inputMode: 'numeric',
                    'aria-controls': 'false',
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='start'>ETB</InputAdornment>
                    ),
                  }}
                  label='Total Price'
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <ToastContainer />
      </form>
    </Grid>
  );
}

export default AssetMain;
