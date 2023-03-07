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

function UpdateWeightNote() {
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
  const [weightNote, setWeightNote] = useState({
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
    portOfLoading: '',
    portOfDischarge: '',
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
    setWeightNote({
      ...weightNote,
      blDate: newValue,
    });
  };
  function onUpdateWeightNote(e) {
    e.preventDefault();
    let newDec = weightNote;
    let arrays = {
      containerNumbersArray: newDec.containerNumbersArray,
      grossWeightsArray: newDec.grossWeightsArray,
      netWeightsArray: newDec.netWeightsArray,
      noOfBagsArray: newDec.noOfBagsArray,
      sealNumbersArray: newDec.sealNumbersArray,
    };
    delete newDec.containerNumbersArray;
    delete newDec.grossWeightsArray;
    delete newDec.netWeightsArray;
    delete newDec.noOfBagsArray;
    delete newDec.sealNumbersArray;
    newDec.blDate = weightNote.blDate.format('DD/MM/YYYY');
    setWeightNote(newDec);
    updateDoc('weightnotes', weightNote);
    setWeightNote({
      ...weightNote,
      containerNumbersArray: arrays.containerNumbersArray,
      sealNumbersArray: arrays.sealNumbersArray,
      noOfBagsArray: arrays.noOfBagsArray,
      grossWeightsArray: arrays.grossWeightsArray,
      netWeightsArray: arrays.netWeightsArray,
      blDate: moment(weightNote.blDate, 'DD/MM/YYYY'),
    });
  }
  const updateDoc = async (table, weightNote) => {
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

    const body = JSON.stringify(weightNote);
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
      res.data[0].grossWeightsArray = res.data[0].grossWeights.split(',');
      res.data[0].netWeightsArray = res.data[0].netWeights.split(',');
      res.data[0].blDate = moment(res.data[0].blDate, 'DD/MM/YYYY');
      setWeightNote(res.data[0]);
      setUpdateData({
        ...updateData,
        loading: false,
      });
    } catch (err) {
      setErrors(err.response.data);
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
      Object.values(weightNote).every((value) => {
        if (!value.toString().trim().length || value === 0) {
          return false;
        }
        return true;
      })
    );
    setValidated(
      weightNote.containerNumbersArray[0] !== '' &&
        weightNote.sealNumbersArray[0] !== '' &&
        weightNote.noOfBagsArray[0] !== '' &&
        weightNote.netWeightsArray[0] !== '' &&
        weightNote.grossWeightsArray[0] !== ''
    );
  }, [weightNote]);
  useEffect(() => {
    getDataById('weightnotes', id);
  }, [id]);
  return (
    <>
      <Grid container className='dashboard-container justify-around'>
        <form onSubmit={onUpdateWeightNote} className='w-full'>
          <Grid className='accounts-list-container w-full -mt-3'>
            <div className='w-full flex flex-row justify-between mb-2'>
              <p className='h4 text-left'>Update Weight Note</p>
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
                    onClick={() => navigate('/weight-notes')}
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
                  Update
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
                Weight Note
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
                            value={weightNote.shipper}
                            label='Shipper'
                            onChange={(e) =>
                              setWeightNote({
                                ...weightNote,
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
                          multiline
                          minRows={2}
                          type='text'
                          value={weightNote.product}
                          autoComplete='false'
                          onChange={(e) =>
                            setWeightNote({
                              ...weightNote,
                              product: e.target.value,
                            })
                          }
                          label='Desc. of Goods'
                        />
                      </Grid>
                      <Grid item lg={6} className='flex justify-start'>
                        <TextField
                          className='w-full'
                          type='text'
                          value={weightNote.vesselAndVoyNumber}
                          autoComplete='false'
                          onChange={(e) =>
                            setWeightNote({
                              ...weightNote,
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
                          value={weightNote.blNumber}
                          autoComplete='false'
                          onChange={(e) =>
                            setWeightNote({
                              ...weightNote,
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
                          value={weightNote.certNo}
                          autoComplete='false'
                          onChange={(e) =>
                            setWeightNote({
                              ...weightNote,
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
                          value={weightNote.icoNo}
                          autoComplete='false'
                          onChange={(e) =>
                            setWeightNote({
                              ...weightNote,
                              icoNo: e.target.value,
                            })
                          }
                          label='ICO #'
                        />
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
                          value={weightNote.reciever}
                          autoComplete='false'
                          onChange={(e) =>
                            setWeightNote({
                              ...weightNote,
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
                          value={weightNote.destination}
                          autoComplete='false'
                          onChange={(e) =>
                            setWeightNote({
                              ...weightNote,
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
                          value={weightNote.portOfLoading}
                          autoComplete='false'
                          onChange={(e) =>
                            setWeightNote({
                              ...weightNote,
                              portOfLoading: e.target.value,
                            })
                          }
                          label='Port of Loading'
                        />
                      </Grid>
                      <Grid item lg={6} className='flex justify-start'>
                        <TextField
                          className='w-full'
                          type='text'
                          value={weightNote.portOfDischarge}
                          autoComplete='false'
                          onChange={(e) =>
                            setWeightNote({
                              ...weightNote,
                              portOfDischarge: e.target.value,
                            })
                          }
                          label='Port of Discharge'
                        />
                      </Grid>
                      <Grid item lg={12} className='flex justify-start'>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                          <MobileDatePicker
                            className='w-full'
                            label='Date'
                            inputFormat='dd/MM/yyyy'
                            value={weightNote.blDate}
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
                <p className='h5 text-center my-4 underline text-gray-700 w-full'>
                  Loading Details
                </p>
                {weightNote.containerNumbersArray.map(
                  (containerNumber, index) => {
                    return (
                      <Grid
                        key={index}
                        item
                        lg={11}
                        className='flex self-center'
                      >
                        <Grid container className='w-full' spacing={2}>
                          <Grid item lg={2} className='flex justify-center'>
                            <TextField
                              className='w-full'
                              type='text'
                              value={containerNumber}
                              autoComplete='false'
                              onChange={(e) => {
                                let newContainerNumbers =
                                  weightNote.containerNumbersArray;
                                newContainerNumbers[index] = e.target.value;
                                setWeightNote({
                                  ...weightNote,
                                  containerNumbersArray: newContainerNumbers,
                                });
                                setWeightNote({
                                  ...weightNote,
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
                              value={weightNote.sealNumbersArray[index]}
                              autoComplete='false'
                              onChange={(e) => {
                                let newSealNumbers =
                                  weightNote.sealNumbersArray;
                                newSealNumbers[index] = e.target.value;
                                setWeightNote({
                                  ...weightNote,
                                  sealNumbersArray: newSealNumbers,
                                });
                                setWeightNote({
                                  ...weightNote,
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
                              value={weightNote.noOfBagsArray[index]}
                              autoComplete='false'
                              onChange={(e) => {
                                let newNoOfBags = weightNote.noOfBagsArray;
                                newNoOfBags[index] = e.target.value;
                                setWeightNote({
                                  ...weightNote,
                                  noOfBagsArray: newNoOfBags,
                                });
                                setWeightNote({
                                  ...weightNote,
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
                              value={weightNote.grossWeightsArray[index]}
                              autoComplete='false'
                              onChange={(e) => {
                                let newGrossWeight =
                                  weightNote.grossWeightsArray;
                                newGrossWeight[index] = e.target.value;
                                setWeightNote({
                                  ...weightNote,
                                  grossWeightsArray: newGrossWeight,
                                });
                                setWeightNote({
                                  ...weightNote,
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
                              value={weightNote.netWeightsArray[index]}
                              autoComplete='false'
                              onChange={(e) => {
                                let newNetWeight = weightNote.netWeightsArray;
                                newNetWeight[index] = e.target.value;
                                setWeightNote({
                                  ...weightNote,
                                  netWeightsArray: newNetWeight,
                                });
                                setWeightNote({
                                  ...weightNote,
                                  netWeights: String(newNetWeight),
                                });
                              }}
                              label='Net Weight'
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  }
                )}
                <Grid className='mt-3'>
                  <IconButton
                    onClick={() => {
                      let newContainerNumbersArray =
                        weightNote.containerNumbersArray;
                      newContainerNumbersArray =
                        newContainerNumbersArray.concat('');
                      let newSealNumbersArray = weightNote.sealNumbersArray;
                      newSealNumbersArray = newSealNumbersArray.concat('');
                      let newNoOfBagsArray = weightNote.noOfBagsArray;
                      newNoOfBagsArray = newNoOfBagsArray.concat('');
                      let newNetWeightsArray = weightNote.netWeightsArray;
                      newNetWeightsArray = newNoOfBagsArray.concat('');
                      let newGrossWeightsArray = weightNote.grossWeightsArray;
                      newGrossWeightsArray = newNoOfBagsArray.concat('');
                      setWeightNote({
                        ...weightNote,
                        containerNumbersArray: newContainerNumbersArray,
                        sealNumbersArray: newSealNumbersArray,
                        noOfBagsArray: newNoOfBagsArray,
                        netWeightsArray: newNetWeightsArray,
                        grossWeightsArray: newGrossWeightsArray,
                      });
                      console.log(weightNote.sealNumbers);
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

export default UpdateWeightNote;
