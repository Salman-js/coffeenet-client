import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
import { Description, Send, RestartAltRounded, Add } from '@mui/icons-material';
import { addWeightNote } from '../../../actions/docmanagerActions';
import { emptyErrors, resetUpdate } from '../../../actions/generalActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

function NewWeightNote() {
  const { isDocmanagerAuthenticated } = useSelector((state) => state.auth);
  const { addDataLoading, dataUpdated } = useSelector(
    (state) => state.adminData
  );
  const errors = useSelector((state) => state.errors);
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
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const dateChange = (newValue) => {
    setWeightNote({
      ...weightNote,
      blDate: newValue,
    });
  };
  function onAddWeightNote(e) {
    e.preventDefault();
    let newDec = weightNote;
    delete newDec.containerNumbersArray;
    delete newDec.grossWeightsArray;
    delete newDec.netWeightsArray;
    delete newDec.noOfBagsArray;
    delete newDec.sealNumbersArray;
    newDec.createdAt = new Date().getTime();
    newDec.blDate = weightNote.blDate.format('DD/MM/YYYY');
    setWeightNote(newDec);
    dispatch(addWeightNote(weightNote));
    console.log(weightNote);
    setWeightNote({
      ...weightNote,
      containerNumbersArray: [''],
      sealNumbersArray: [''],
      noOfBagsArray: [''],
      grossWeightsArray: [''],
      netWeightsArray: [''],
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
    if (dataUpdated === 'weight note added') {
      toast.success('Weight note submitted', toastOptions);
      setTimeout(() => {
        dispatch(resetUpdate());
      }, 8000);
    }
  }, [dataUpdated, dispatch]);
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
    if (!isDocmanagerAuthenticated) {
      navigate('/');
    }
  }, [isDocmanagerAuthenticated, navigate]);
  return (
    <>
      <Grid container className='dashboard-container justify-around'>
        <form onSubmit={onAddWeightNote} className='w-full'>
          <Grid className='accounts-list-container w-full -mt-3'>
            <div className='w-full flex flex-row justify-between mb-2'>
              <p className='h4 text-left'>New Weight Note</p>
              <div className='flex flex-row'>
                <IconButton
                  variant='contained'
                  onClick={() => {
                    setWeightNote({
                      shipper: '',
                      packing: '',
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
                    onClick={() => navigate('/weight-notes')}
                  >
                    View Weight Notes
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

export default NewWeightNote;
