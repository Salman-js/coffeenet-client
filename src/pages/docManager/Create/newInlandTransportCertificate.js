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
  InputAdornment,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Description, Send, RestartAltRounded } from '@mui/icons-material';
import { addCert } from '../../../actions/docmanagerActions';
import { emptyErrors, resetUpdate } from '../../../actions/generalActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function NewInlandTransportCertificate() {
  const { isDocmanagerAuthenticated } = useSelector((state) => state.auth);
  const { addDataLoading, dataUpdated } = useSelector(
    (state) => state.adminData
  );
  const errors = useSelector((state) => state.errors);
  const Day = new Date();
  const newDate = `${Day.getDate()}/${Day.getMonth() + 1}/${Day.getFullYear()}`;
  const [cert, setCert] = useState({
    shipper: '',
    notifParty: '',
    npAddress: '',
    description: '',
    blNumber: '',
    blDate: '',
    vesselAndVoyNumber: '',
    portOfLoading: '',
    portOfDischarge: '',
    quantity: '',
    netWeight: '',
    grossWeight: '',
    noOfBags: '',
    packing: '',
    date: newDate,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const blDateChange = (newValue) => {
    setCert({
      ...cert,
      blDate: newValue,
    });
  };
  function onAddCertificate(e) {
    e.preventDefault();
    let newCert = cert;
    newCert.createdAt = new Date().getTime();
    newCert.blDate = `${cert.blDate.getDate()} / ${
      cert.blDate.getMonth() + 1
    }/${cert.blDate.getFullYear()}`;
    setCert(newCert);
    dispatch(addCert(cert));
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
    if (dataUpdated === 'cert added') {
      toast.success('Inland Transport Certificate submitted', toastOptions);
      setTimeout(() => {
        dispatch(resetUpdate());
      }, 8000);
    }
  }, [dataUpdated, dispatch]);
  useEffect(() => {
    setValidated(
      Object.values(cert).every((value) => {
        if (!value.toString().trim().length || value === 0) {
          return false;
        }
        return true;
      })
    );
  }, [cert]);
  useEffect(() => {
    if (!isDocmanagerAuthenticated) {
      navigate('/');
    }
  }, [isDocmanagerAuthenticated, navigate]);
  return (
    <>
      <Grid container className='dashboard-container justify-around'>
        <form onSubmit={onAddCertificate} className='w-full'>
          <Grid className='accounts-list-container w-full -mt-3'>
            <div className='w-full flex flex-row justify-between mb-2'>
              <p className='h4 text-left'>Inland Transport Certificates</p>
              <div className='flex flex-row'>
                <IconButton
                  variant='contained'
                  onClick={() => {
                    setCert({
                      shipper: '',
                      notifParty: '',
                      npAddress: '',
                      description: '',
                      blNumber: '',
                      blDate: '',
                      vesselAndVoyNumber: '',
                      portOfLoading: '',
                      portOfDischarge: '',
                      quantity: '',
                      netWeight: '',
                      grossWeight: '',
                      noOfBags: '',
                      packing: '',
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
                    onClick={() => navigate('/certificates')}
                  >
                    View Certificates
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
                Inland Transport Certificate
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
                            value={cert.shipper}
                            label='Shipper'
                            onChange={(e) =>
                              setCert({
                                ...cert,
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
                      <Grid item lg={12} className='flex justify-start'>
                        <TextField
                          className='w-full'
                          type='text'
                          value={cert.notifParty}
                          autoComplete='false'
                          onChange={(e) =>
                            setCert({
                              ...cert,
                              notifParty: e.target.value,
                            })
                          }
                          label='Notify Party'
                        />
                      </Grid>
                      <Grid item lg={12} className='flex justify-start'>
                        <TextField
                          className='w-full'
                          type='text'
                          value={cert.npAddress}
                          autoComplete='false'
                          onChange={(e) =>
                            setCert({
                              ...cert,
                              npAddress: e.target.value,
                            })
                          }
                          label='Address'
                        />
                      </Grid>
                      <Grid item lg={12} className='flex justify-start'>
                        <TextField
                          className='w-full'
                          type='text'
                          value={cert.description}
                          autoComplete='false'
                          onChange={(e) =>
                            setCert({
                              ...cert,
                              description: e.target.value,
                            })
                          }
                          label='Description'
                        />
                      </Grid>
                      <Grid item lg={6} className='flex justify-start'>
                        <TextField
                          className='w-full'
                          type='text'
                          value={cert.blNumber}
                          autoComplete='false'
                          onChange={(e) =>
                            setCert({
                              ...cert,
                              blNumber: e.target.value,
                            })
                          }
                          label='BL Number'
                        />
                      </Grid>
                      <Grid item lg={6} className='flex justify-start'>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <MobileDatePicker
                            className='w-full'
                            label='BL Date'
                            inputFormat='dd/MM/yyyy'
                            value={cert.blDate}
                            onChange={blDateChange}
                            renderInput={(params) => (
                              <TextField {...params} className='w-full' />
                            )}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item lg={12} className='flex justify-start'>
                        <TextField
                          className='w-full'
                          type='text'
                          value={cert.vesselAndVoyNumber}
                          autoComplete='false'
                          onChange={(e) =>
                            setCert({
                              ...cert,
                              vesselAndVoyNumber: e.target.value,
                            })
                          }
                          label='Vessel & Voy. No'
                        />
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item lg={6} className='flex justify-start'>
                  <div className='w-full'>
                    <Grid
                      container
                      spacing={2}
                      className='invoice-form-container w-full h-fit'
                    >
                      <Grid item lg={12} className='flex justify-start'>
                        <TextField
                          className='w-full'
                          type='text'
                          value={cert.portOfLoading}
                          autoComplete='false'
                          onChange={(e) =>
                            setCert({
                              ...cert,
                              portOfLoading: e.target.value,
                            })
                          }
                          label='Port of Loading'
                        />
                      </Grid>
                      <Grid item lg={12} className='flex justify-start'>
                        <TextField
                          className='w-full'
                          type='text'
                          value={cert.portOfDischarge}
                          autoComplete='false'
                          onChange={(e) =>
                            setCert({
                              ...cert,
                              portOfDischarge: e.target.value,
                            })
                          }
                          label='Port of Discharge'
                        />
                      </Grid>
                      <Grid item lg={6} className='flex justify-start'>
                        <TextField
                          className='w-full'
                          type='number'
                          value={cert.quantity}
                          autoComplete='false'
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='start'>
                                MT
                              </InputAdornment>
                            ),
                          }}
                          onChange={(e) =>
                            setCert({
                              ...cert,
                              quantity: e.target.value,
                            })
                          }
                          label='Quantity'
                        />
                      </Grid>
                      <Grid item lg={6} className='flex justify-start'>
                        <TextField
                          className='w-full'
                          type='number'
                          value={cert.noOfBags}
                          autoComplete='false'
                          onChange={(e) =>
                            setCert({
                              ...cert,
                              noOfBags: e.target.value,
                            })
                          }
                          label='No of Bags'
                        />
                      </Grid>
                      <Grid item lg={6} className='flex justify-start'>
                        <TextField
                          className='w-full'
                          type='number'
                          value={cert.grossWeight}
                          autoComplete='false'
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='start'>
                                kg
                              </InputAdornment>
                            ),
                          }}
                          onChange={(e) =>
                            setCert({
                              ...cert,
                              grossWeight: e.target.value,
                            })
                          }
                          label='Gross Weight'
                        />
                      </Grid>
                      <Grid item lg={6} className='flex justify-start'>
                        <TextField
                          className='w-full'
                          type='number'
                          value={cert.netWeight}
                          autoComplete='false'
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='start'>
                                kg
                              </InputAdornment>
                            ),
                          }}
                          onChange={(e) =>
                            setCert({
                              ...cert,
                              netWeight: e.target.value,
                            })
                          }
                          label='Net Weight'
                        />
                      </Grid>
                      <Grid item lg={12} className='flex justify-start'>
                        <TextField
                          className='w-full'
                          type='number'
                          value={cert.packing}
                          autoComplete='false'
                          onChange={(e) =>
                            setCert({
                              ...cert,
                              packing: e.target.value,
                            })
                          }
                          label='Packing'
                        />
                      </Grid>
                    </Grid>
                  </div>
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

export default NewInlandTransportCertificate;
