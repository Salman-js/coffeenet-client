import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, TextField, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Description, Send, RestartAltRounded, Add } from '@mui/icons-material';
import { addWaybill } from '../../../actions/docmanagerActions';
import { emptyErrors, resetUpdate } from '../../../actions/generalActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateWayBill() {
  const { isDocmanagerAuthenticated } = useSelector((state) => state.auth);
  const { addDataLoading, dataUpdated } = useSelector(
    (state) => state.adminData
  );
  const errors = useSelector((state) => state.errors);
  const Day = new Date();
  const newDate = `${Day.getDate()}/${Day.getMonth() + 1}/${Day.getFullYear()}`;
  const [wayBill, setWayBill] = useState({
    consigne: '',
    transportType: '',
    product: '',
    containerNumbers: '',
    sealNumbers: '',
    wagonNumbers: '',
    containerNumbersArray: [''],
    sealNumbersArray: [''],
    wagonNumbersArray: [''],
    date: newDate,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  function onAddWayBill(e) {
    e.preventDefault();
    let newBill = wayBill;
    delete newBill.containerNumbersArray;
    delete newBill.sealNumbersArray;
    delete newBill.wagonNumbersArray;
    newBill.createdAt = new Date().getTime();
    setWayBill(newBill);
    console.log(wayBill);
    dispatch(addWaybill(wayBill));
    setWayBill({
      ...wayBill,
      containerNumbersArray: [''],
      sealNumbersArray: [''],
      wagonNumbersArray: [''],
    });
  }

  useEffect(() => {
    if (!isDocmanagerAuthenticated) {
      navigate('/');
    }
  }, [isDocmanagerAuthenticated, navigate]);
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
    if (dataUpdated === 'Way bill added') {
      toast.success('Way bill submitted', toastOptions);
      setTimeout(() => {
        dispatch(resetUpdate());
      }, 8000);
    }
  }, [dataUpdated, dispatch]);
  useEffect(() => {
    setValidated(
      Object.values(wayBill).every((value) => {
        if (!value.toString().trim().length || value === 0) {
          return false;
        }
        return true;
      })
    );
    setValidated(
      wayBill.containerNumbersArray[0] !== '' &&
        wayBill.sealNumbersArray[0] !== '' &&
        wayBill.wagonNumbersArray[0] !== ''
    );
  }, [wayBill]);
  useEffect(() => {
    if (!isDocmanagerAuthenticated) {
      navigate('/');
    }
  }, [isDocmanagerAuthenticated, navigate]);
  return (
    <>
      <Grid container className='dashboard-container justify-around'>
        <form onSubmit={onAddWayBill} className='w-full'>
          <Grid className='accounts-list-container w-full -mt-3'>
            <div className='w-full flex flex-row justify-between mb-2'>
              <p className='h4 text-left'>Way Bills</p>
              <div className='flex flex-row'>
                <IconButton
                  variant='contained'
                  onClick={() => {
                    setWayBill({
                      consigne: '',
                      transportType: '',
                      product: '',
                      containerNumbers: '',
                      sealNumbers: '',
                      wagonNumbers: '',
                      containerNumbersArray: [''],
                      sealNumbersArray: [''],
                      wagonNumbersArray: [''],
                      date: newDate,
                    });
                  }}
                >
                  <RestartAltRounded />
                </IconButton>
                <LoadingButton
                  type='submit'
                  variant='contained'
                  loading={addDataLoading}
                  sx={{
                    mr: 5,
                    ml: 5,
                  }}
                  disabled={!validated}
                  startIcon={<Send />}
                >
                  Submit
                </LoadingButton>
                <div>
                  <Button
                    startIcon={<Description />}
                    variant='contained'
                    onClick={() => navigate('/way-bills')}
                  >
                    View Way Bills
                  </Button>
                </div>
              </div>
            </div>
          </Grid>
          <Grid
            className='invoice-layout-container w-full bg-white p-6 overflow-auto'
            style={{ height: '70vh' }}
          >
            <Grid className='title-container w-full text-center mb-8'>
              <p className='h4 underline text-center text-gray-700'>Way Bill</p>
            </Grid>
            <Grid className='w-full'>
              <Grid
                container
                spacing={2}
                className='invoice-form-container w-full h-fit'
              >
                <Grid item lg={12} className='flex justify-start'>
                  <TextField
                    className='w-1/2'
                    type='text'
                    value={wayBill.consigne}
                    autoComplete='false'
                    onChange={(e) =>
                      setWayBill({
                        ...wayBill,
                        consigne: e.target.value,
                      })
                    }
                    label='Name of CONSIGNEE'
                  />
                </Grid>
                <Grid item lg={12} className='flex justify-start'>
                  <TextField
                    className='w-1/2'
                    type='text'
                    value={wayBill.transportType}
                    autoComplete='false'
                    onChange={(e) =>
                      setWayBill({
                        ...wayBill,
                        transportType: e.target.value,
                      })
                    }
                    label='Transportation'
                  />
                </Grid>
                <Grid item lg={12} className='flex justify-start'>
                  <TextField
                    className='w-1/2'
                    type='text'
                    value={wayBill.product}
                    autoComplete='false'
                    onChange={(e) =>
                      setWayBill({
                        ...wayBill,
                        product: e.target.value,
                      })
                    }
                    label='Product'
                  />
                </Grid>
                {wayBill.containerNumbersArray.map((containerNumber, index) => {
                  return (
                    <Grid key={index} item lg={9} className='flex self-center'>
                      <Grid container className='w-full' spacing={2}>
                        <Grid item lg={4} className='flex justify-center'>
                          <TextField
                            className='w-full'
                            type='text'
                            value={containerNumber}
                            autoComplete='false'
                            onChange={(e) => {
                              let newContainerNumbers =
                                wayBill.containerNumbersArray;
                              newContainerNumbers[index] = e.target.value;
                              setWayBill({
                                ...wayBill,
                                containerNumbersArray: newContainerNumbers,
                              });
                              setWayBill({
                                ...wayBill,
                                containerNumbers: String(newContainerNumbers),
                              });
                            }}
                            label='Container Number'
                          />
                        </Grid>
                        <Grid item lg={4} className='flex justify-center'>
                          <TextField
                            className='w-full'
                            type='text'
                            value={wayBill.sealNumbersArray[index]}
                            autoComplete='false'
                            onChange={(e) => {
                              let newSealNumbers = wayBill.sealNumbersArray;
                              newSealNumbers[index] = e.target.value;
                              setWayBill({
                                ...wayBill,
                                sealNumbersArray: newSealNumbers,
                              });
                              setWayBill({
                                ...wayBill,
                                sealNumbers: String(newSealNumbers),
                              });
                            }}
                            label='Seal Number'
                          />
                        </Grid>
                        <Grid item lg={4} className='flex justify-center'>
                          <TextField
                            className='w-full'
                            type='text'
                            value={wayBill.wagonNumbersArray[index]}
                            autoComplete='false'
                            onChange={(e) => {
                              let newWagonNumbers = wayBill.wagonNumbersArray;
                              newWagonNumbers[index] = e.target.value;
                              setWayBill({
                                ...wayBill,
                                wagonNumbersArray: newWagonNumbers,
                              });
                              setWayBill({
                                ...wayBill,
                                wagonNumbers: String(newWagonNumbers),
                              });
                            }}
                            label='Wagon Number'
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })}
                <Grid className='mt-3'>
                  <IconButton
                    onClick={() => {
                      let newContainerNumbersArray =
                        wayBill.containerNumbersArray;
                      newContainerNumbersArray =
                        newContainerNumbersArray.concat('');
                      let newSealNumbersArray = wayBill.sealNumbersArray;
                      newSealNumbersArray = newSealNumbersArray.concat('');
                      let newWagonNumbersArray = wayBill.wagonNumbersArray;
                      newWagonNumbersArray = newWagonNumbersArray.concat('');
                      setWayBill({
                        ...wayBill,
                        containerNumbersArray: newContainerNumbersArray,
                        sealNumbersArray: newSealNumbersArray,
                        wagonNumbersArray: newWagonNumbersArray,
                      });
                      console.log(wayBill.sealNumbers);
                    }}
                    sx={{
                      padding: 2,
                      margin: 'auto',
                    }}
                  >
                    <Add />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <ToastContainer />
    </>
  );
}

export default UpdateWayBill;
