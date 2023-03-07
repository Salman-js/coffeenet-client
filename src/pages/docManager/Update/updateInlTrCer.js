import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Check } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import axios from 'axios';
import { BASE_URL } from '../../../actions/types';
import moment from 'moment';

function UpdateInlTrCert() {
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
    newCert.blDate = cert.blDate.format('DD/MM/YYYY');
    setCert(newCert);
    updateDoc('certificates', cert);
  }

  const updateDoc = async (table, cert) => {
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

    const body = JSON.stringify(cert);
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
      res.data[0].blDate = moment(res.data[0].blDate, 'DD/MM/YYYY');
      setCert(res.data[0]);
      console.log(cert);
      setUpdateData({
        ...updateData,
        loading: false,
      });
    } catch (err) {
      console.log(err);
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
  useEffect(() => {
    getDataById('certificates', id);
  }, [id]);
  return (
    <>
      <Grid container className='dashboard-container justify-around'>
        <form onSubmit={onAddCertificate} className='w-full'>
          <Grid className='accounts-list-container w-full -mt-3'>
            <div className='w-full flex flex-row justify-between mb-2'>
              <p className='h4 text-left'>
                Update Inland Transport Certificate
              </p>
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
                    onClick={() => navigate('/certificates')}
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
                        <LocalizationProvider dateAdapter={AdapterMoment}>
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

export default UpdateInlTrCert;
