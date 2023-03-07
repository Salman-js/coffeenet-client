import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Button, TextField, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Add, Check } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { BASE_URL } from '../../../actions/types';

function UpdateWayBill() {
  const { isDocmanagerAuthenticated } = useSelector((state) => state.auth);
  const [updateData, setUpdateData] = useState({
    loading: false,
    addDataLoading: false,
    updateSuccess: false,
  });
  const [errors, setErrors] = useState(null);
  const { id } = useParams();
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
  const [validated, setValidated] = useState(false);
  function onUpdateWayBill(e) {
    e.preventDefault();
    let newBill = wayBill;
    let arrays = {
      containerNumbersArray: newBill.containerNumbersArray,
      wagonNumbersArray: newBill.wagonNumbers,
      sealNumbersArray: newBill.sealNumbersArray,
    };
    delete newBill.containerNumbersArray;
    delete newBill.sealNumbersArray;
    delete newBill.wagonNumbersArray;
    updateDoc('waybills', wayBill);
    setWayBill({
      ...wayBill,
      containerNumbersArray: arrays.containerNumbersArray,
      sealNumbersArray: arrays.sealNumbersArray,
      wagonNumbersArray: arrays.wagonNumbersArray,
    });
  }

  const updateDoc = async (table, wayBill) => {
    setUpdateData({
      ...updateData,
      addDataLoading: true,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    const body = JSON.stringify(wayBill);
    try {
      const res = await axios.post(
        `${BASE_URL}/api/document/update/${table}`,
        body,
        config
      );
      setUpdateData({
        ...updateData,
        addDataLoading: false,
        updateSuccess: true,
      });
    } catch (err) {
      setErrors(err.response.data);
      setUpdateData({
        ...updateData,
        loading: false,
        addDataLoading: false,
      });
    }
  };
  const getDataById = async (table, id) => {
    setUpdateData({
      ...updateData,
      loading: true,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };
    try {
      let res = await axios.get(
        `${BASE_URL}/api/document/${table}/${id}`,
        config
      );
      res.data[0].containerNumbersArray =
        res.data[0].containerNumbers.split(',');
      res.data[0].sealNumbersArray = res.data[0].sealNumbers.split(',');
      res.data[0].wagonNumbersArray = res.data[0].wagonNumbers.split(',');
      setWayBill(res.data[0]);
      console.log(wayBill);
      setUpdateData({
        ...updateData,
        loading: false,
      });
    } catch (err) {
      console.log(err);
      setErrors(err.response.data);
      setUpdateData({
        ...updateData,
        loading: false,
        addDataLoading: false,
      });
    }
  };
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
    if (errors && Object.keys(errors).length > 0 && errors.unknown) {
      toast.error('Unknown Error, Please Try Again', toastOptions);
      setTimeout(() => {
        setErrors(null);
      }, 8000);
    }
  }, [errors]);
  useEffect(() => {
    const toastOptions = {
      position: 'top-right',
      autoClose: 5000,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
    };
    if (updateData.updateSuccess) {
      toast.success('Data updated', toastOptions);
      setTimeout(() => {
        setUpdateData({
          ...updateData,
          updateSuccess: false,
        });
      }, 8000);
    }
  }, [updateData]);
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
  useEffect(() => {
    getDataById('waybills', id);
  }, [id]);
  return (
    <>
      <Grid container className='dashboard-container justify-around'>
        <form onSubmit={onUpdateWayBill} className='w-full'>
          <Grid className='accounts-list-container w-full -mt-3'>
            <div className='w-full flex flex-row justify-between mb-2'>
              <p className='h4 text-left'>Update Way Bill</p>
              <div className='flex flex-row'>
                <div>
                  <Button
                    variant='contained'
                    sx={{
                      backgroundColor: 'gray',
                      '&:hover': {
                        backgroundColor: '#6b6a6a',
                      },
                    }}
                    onClick={() => navigate('/way-bills')}
                  >
                    Cancel
                  </Button>
                </div>
                <LoadingButton
                  type='submit'
                  variant='contained'
                  loading={updateData.addDataLoading}
                  sx={{
                    ml: 3,
                  }}
                  disabled={!validated}
                  startIcon={<Check />}
                >
                  Submit
                </LoadingButton>
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
