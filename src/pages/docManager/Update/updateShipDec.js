import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Grid,
  Button,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Add, Check } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import axios from 'axios';
import { BASE_URL } from '../../../actions/types';
import moment from 'moment';

function UpdateShipDec() {
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
  const [shipDec, setShipDec] = useState({
    shipper: '',
    product: '',
    vesselAndVoyNumber: '',
    blNumber: '',
    icoNo: '',
    certNo: '',
    blDate: '',
    date: newDate,
    reciever: '',
    destination: '',
    osVesselAndVoyNumber: '',
    osBlNumber: '',
    osDate: '',
    containerNumbers: '',
    sealNumbers: '',
    noOfBags: '',
    grossWeights: '',
    netWeights: '',
    containerNumbersArray: [''],
    sealNumbersArray: [''],
    noOfBagsArray: [''],
    grossWeightsArray: [''],
    netWeightsArray: [''],
  });
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const dateChange = (newValue) => {
    setShipDec({
      ...shipDec,
      blDate: newValue,
    });
  };
  const osDateChange = (newValue) => {
    setShipDec({
      ...shipDec,
      osDate: newValue,
    });
  };
  function onUpdateDecleration(e) {
    e.preventDefault();
    let newDec = shipDec;
    console.log(shipDec.blDate._i);
    let arrays = {
      containerNumbersArray: newDec.containerNumbersArray,
      noOfBagsArray: newDec.noOfBagsArray,
      sealNumbersArray: newDec.sealNumbersArray,
      grossWeightsArray: newDec.grossWeightsArray,
      netWeightsArray: newDec.netWeightsArray,
    };
    delete newDec.containerNumbersArray;
    delete newDec.grossWeightsArray;
    delete newDec.netWeightsArray;
    delete newDec.noOfBagsArray;
    delete newDec.sealNumbersArray;
    newDec.createdAt = new Date().getTime();
    newDec.blDate = shipDec.blDate.format('DD/MM/YYYY');
    newDec.osDate = shipDec.osDate.format('DD/MM/YYYY');
    setShipDec(newDec);
    updateDoc('shippingdeclerations', shipDec);
    console.log(shipDec);
    setShipDec({
      ...shipDec,
      containerNumbersArray: arrays.containerNumbersArray,
      noOfBagsArray: arrays.noOfBagsArray,
      sealNumbersArray: arrays.sealNumbersArray,
      grossWeightsArray: arrays.grossWeightsArray,
      netWeightsArray: arrays.netWeightsArray,
      blDate: moment(shipDec.blDate, 'DD/MM/YYYY'),
      osDate: moment(shipDec.osDate, 'DD/MM/YYYY'),
    });
  }

  const updateDoc = async (table, shipDec) => {
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

    const body = JSON.stringify(shipDec);
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
      res.data[0].noOfBagsArray = res.data[0].noOfBags.split(',');
      res.data[0].netWeightsArray = res.data[0].netWeights.split(',');
      res.data[0].grossWeightsArray = res.data[0].grossWeights.split(',');
      res.data[0].blDate = moment(res.data[0].blDate, 'DD/MM/YYYY');
      res.data[0].osDate = moment(res.data[0].osDate, 'DD/MM/YYYY');
      setShipDec(res.data[0]);
      console.log('shipDec: ', shipDec);
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
      Object.values(shipDec).every((value) => {
        if (!value.toString().trim().length || value === 0) {
          return false;
        }
        return true;
      })
    );
    setValidated(
      shipDec.containerNumbersArray[0] !== '' &&
        shipDec.sealNumbersArray[0] !== '' &&
        shipDec.noOfBagsArray[0] !== '' &&
        shipDec.grossWeightsArray[0] !== '' &&
        shipDec.netWeightsArray[0] !== ''
    );
  }, [shipDec]);
  useEffect(() => {
    if (!isDocmanagerAuthenticated) {
      navigate('/');
    }
  }, [isDocmanagerAuthenticated, navigate]);
  useEffect(() => {
    getDataById('shippingdeclerations', id);
  }, [id]);
  return (
    <>
      <Grid container className='dashboard-container justify-around'>
        <form onSubmit={onUpdateDecleration} className='w-full'>
          <Grid className='accounts-list-container w-full -mt-3'>
            <div className='w-full flex flex-row justify-between mb-2'>
              <p className='h4 text-left'>Update Shippers Decleration</p>
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
                    onClick={() => navigate('/shipper-declerations')}
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
              <p className='h4 underline text-center text-gray-700'>
                Shippers Decleration
              </p>
            </Grid>
            <Grid className='w-full'>
              <Grid
                container
                spacing={2}
                className='invoice-form-container w-full h-fit'
              >
                <Grid item lg={6} className='flex justify-start'>
                  <div className='w-full'>
                    <p className='h5 text-center text-gray-700'>Original</p>
                    <Grid
                      container
                      spacing={2}
                      className='invoice-form-container w-full h-fit'
                    >
                      <Grid item lg={12}>
                        <FormControl fullWidth>
                          <InputLabel>Shipper</InputLabel>
                          <Select
                            labelId='select-label'
                            id='simple-select'
                            value={shipDec.shipper}
                            label='Shipper'
                            onChange={(e) =>
                              setShipDec({
                                ...shipDec,
                                shipper: e.target.value,
                              })
                            }
                          >
                            <MenuItem value='COFFEENET TRADING PLC'>
                              COFFEENET TRADING PLC
                            </MenuItem>
                            <MenuItem value='EYOB TESFAYE/SHEGA TEFF'>
                              EYOB TESFAYE/SHEGA TEFF
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item lg={12}>
                        <TextField
                          className='w-full'
                          type='text'
                          value={shipDec.product}
                          autoComplete='false'
                          onChange={(e) =>
                            setShipDec({
                              ...shipDec,
                              product: e.target.value,
                            })
                          }
                          label='Product'
                        />
                      </Grid>
                      <Grid item lg={6} className='flex justify-start'>
                        <TextField
                          className='w-full'
                          type='text'
                          value={shipDec.vesselAndVoyNumber}
                          autoComplete='false'
                          onChange={(e) =>
                            setShipDec({
                              ...shipDec,
                              vesselAndVoyNumber: e.target.value,
                            })
                          }
                          label='Vessel & Voy. #'
                        />
                      </Grid>
                      <Grid item lg={6} className='flex justify-start'>
                        <TextField
                          className='w-full'
                          type='text'
                          value={shipDec.blNumber}
                          autoComplete='false'
                          onChange={(e) =>
                            setShipDec({
                              ...shipDec,
                              blNumber: e.target.value,
                            })
                          }
                          label='BL #'
                        />
                      </Grid>
                      <Grid item lg={6} className='flex justify-start'>
                        <TextField
                          className='w-full'
                          type='text'
                          value={shipDec.certNo}
                          autoComplete='false'
                          onChange={(e) =>
                            setShipDec({
                              ...shipDec,
                              certNo: e.target.value,
                            })
                          }
                          label='CERT #'
                        />
                      </Grid>
                      <Grid item lg={6} className='flex justify-start'>
                        <TextField
                          className='w-full'
                          type='text'
                          value={shipDec.icoNo}
                          autoComplete='false'
                          onChange={(e) =>
                            setShipDec({
                              ...shipDec,
                              icoNo: e.target.value,
                            })
                          }
                          label='ICO #'
                        />
                      </Grid>
                      <Grid item lg={12} className='flex justify-start'>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                          <MobileDatePicker
                            className='w-full'
                            label='Date'
                            inputFormat='dd/MM/yyyy'
                            value={shipDec.blDate}
                            onChange={dateChange}
                            renderInput={(params) => (
                              <TextField {...params} className='w-full' />
                            )}
                          />
                        </LocalizationProvider>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item lg={6} className='flex justify-start'>
                  <div className='w-full'>
                    <p className='h5 text-center text-gray-700'>Other Side</p>
                    <Grid
                      container
                      spacing={2}
                      className='invoice-form-container w-full h-fit'
                    >
                      <Grid item lg={12}>
                        <TextField
                          className='w-full'
                          type='text'
                          value={shipDec.reciever}
                          autoComplete='false'
                          onChange={(e) =>
                            setShipDec({
                              ...shipDec,
                              reciever: e.target.value,
                            })
                          }
                          label='Reciever'
                        />
                      </Grid>
                      <Grid item lg={12}>
                        <TextField
                          className='w-full'
                          type='text'
                          value={shipDec.destination}
                          autoComplete='false'
                          onChange={(e) =>
                            setShipDec({
                              ...shipDec,
                              destination: e.target.value,
                            })
                          }
                          label='Destination'
                        />
                      </Grid>
                      <Grid item lg={6} className='flex justify-start'>
                        <TextField
                          className='w-full'
                          type='text'
                          value={shipDec.osVesselAndVoyNumber}
                          autoComplete='false'
                          onChange={(e) =>
                            setShipDec({
                              ...shipDec,
                              osVesselAndVoyNumber: e.target.value,
                            })
                          }
                          label='Vessel & Voy. #'
                        />
                      </Grid>
                      <Grid item lg={6} className='flex justify-start'>
                        <TextField
                          className='w-full'
                          type='text'
                          value={shipDec.osBlNumber}
                          autoComplete='false'
                          onChange={(e) =>
                            setShipDec({
                              ...shipDec,
                              osBlNumber: e.target.value,
                            })
                          }
                          label='BL #'
                        />
                      </Grid>
                      <Grid item lg={12} className='flex justify-start'>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                          <MobileDatePicker
                            className='w-full'
                            label='Date'
                            inputFormat='dd/MM/yyyy'
                            value={shipDec.osDate}
                            onChange={osDateChange}
                            renderInput={(params) => (
                              <TextField {...params} className='w-full' />
                            )}
                          />
                        </LocalizationProvider>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <p className='h5 text-center my-4 underline text-gray-700 w-full'>
                  Loading Details
                </p>
                {shipDec.containerNumbersArray.map((containerNumber, index) => {
                  return (
                    <Grid key={index} item lg={11} className='flex self-center'>
                      <Grid container className='w-full' spacing={2}>
                        <Grid item lg={2} className='flex justify-center'>
                          <TextField
                            className='w-full'
                            type='text'
                            value={containerNumber}
                            autoComplete='false'
                            onChange={(e) => {
                              let newContainerNumbers =
                                shipDec.containerNumbersArray;
                              newContainerNumbers[index] = e.target.value;
                              setShipDec({
                                ...shipDec,
                                containerNumbersArray: newContainerNumbers,
                              });
                              setShipDec({
                                ...shipDec,
                                containerNumbers: String(newContainerNumbers),
                              });
                            }}
                            label='Container Number'
                          />
                        </Grid>
                        <Grid item lg={2} className='flex justify-center'>
                          <TextField
                            className='w-full'
                            type='text'
                            value={shipDec.sealNumbersArray[index]}
                            autoComplete='false'
                            onChange={(e) => {
                              let newSealNumbers = shipDec.sealNumbersArray;
                              newSealNumbers[index] = e.target.value;
                              setShipDec({
                                ...shipDec,
                                sealNumbersArray: newSealNumbers,
                              });
                              setShipDec({
                                ...shipDec,
                                sealNumbers: String(newSealNumbers),
                              });
                            }}
                            label='Seal Number'
                          />
                        </Grid>
                        <Grid item lg={2} className='flex justify-center'>
                          <TextField
                            className='w-full'
                            type='text'
                            value={shipDec.noOfBagsArray[index]}
                            autoComplete='false'
                            onChange={(e) => {
                              let newNoOfBags = shipDec.noOfBagsArray;
                              newNoOfBags[index] = e.target.value;
                              setShipDec({
                                ...shipDec,
                                noOfBagsArray: newNoOfBags,
                              });
                              setShipDec({
                                ...shipDec,
                                noOfBags: String(newNoOfBags),
                              });
                            }}
                            label='No of Bags'
                          />
                        </Grid>
                        <Grid item lg={2} className='flex justify-center'>
                          <TextField
                            className='w-full'
                            type='text'
                            value={shipDec.grossWeightsArray[index]}
                            autoComplete='false'
                            onChange={(e) => {
                              let newGrossWeight = shipDec.grossWeightsArray;
                              newGrossWeight[index] = e.target.value;
                              setShipDec({
                                ...shipDec,
                                grossWeightsArray: newGrossWeight,
                              });
                              setShipDec({
                                ...shipDec,
                                grossWeights: String(newGrossWeight),
                              });
                            }}
                            label='Gross Weight'
                          />
                        </Grid>
                        <Grid item lg={2} className='flex justify-center'>
                          <TextField
                            className='w-full'
                            type='text'
                            value={shipDec.netWeightsArray[index]}
                            autoComplete='false'
                            onChange={(e) => {
                              let newNetWeight = shipDec.netWeightsArray;
                              newNetWeight[index] = e.target.value;
                              setShipDec({
                                ...shipDec,
                                netWeightsArray: newNetWeight,
                              });
                              setShipDec({
                                ...shipDec,
                                netWeights: String(newNetWeight),
                              });
                            }}
                            label='Net Weight'
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
                        shipDec.containerNumbersArray;
                      newContainerNumbersArray =
                        newContainerNumbersArray.concat('');
                      let newSealNumbersArray = shipDec.sealNumbersArray;
                      newSealNumbersArray = newSealNumbersArray.concat('');
                      let newNoOfBagsArray = shipDec.noOfBagsArray;
                      newNoOfBagsArray = newNoOfBagsArray.concat('');
                      let newNetWeightsArray = shipDec.netWeightsArray;
                      newNetWeightsArray = newNoOfBagsArray.concat('');
                      let newGrossWeightsArray = shipDec.grossWeightsArray;
                      newGrossWeightsArray = newNoOfBagsArray.concat('');
                      setShipDec({
                        ...shipDec,
                        containerNumbersArray: newContainerNumbersArray,
                        sealNumbersArray: newSealNumbersArray,
                        noOfBagsArray: newNoOfBagsArray,
                        netWeightsArray: newNetWeightsArray,
                        grossWeightsArray: newGrossWeightsArray,
                      });
                      console.log(shipDec.sealNumbers);
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

export default UpdateShipDec;
