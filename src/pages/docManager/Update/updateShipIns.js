import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Button, TextField, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Check } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { BASE_URL } from '../../../actions/types';

function UpdateShipmentInstructions() {
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
  const [shipment, setShipment] = useState({
    consigne: '',
    notifParty: '',
    address: '',
    shipment: '',
    portOfLoad: '',
    portOfDischarge: '',
    bookingNo: '',
    shippingLine: '',
    name: '',
    certNumbers: '',
    mnNetWeight: '',
    destination: '',
    description: '',
    icoNumber: '',
    hsCode: '',
    descNetWeight: '',
    packing: '',
    noOfBags: '',
    netWeight: '',
    grossWeight: '',
    transportation: '',
    date: newDate,
  });
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  function onUpdateShippment(e) {
    e.preventDefault();
    let newObj = shipment;
    newObj.createdAt = new Date().getTime();
    setShipment(newObj);
    updateDoc('shippinginstructions', shipment);
  }

  const updateDoc = async (table, shipment) => {
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

    const body = JSON.stringify(shipment);
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
      setShipment(res.data[0]);
      console.log(shipment);
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
      Object.values(shipment).every((value) => {
        if (!value.toString().trim().length || value === 0) {
          return false;
        }
        return true;
      })
    );
  }, [shipment]);
  useEffect(() => {
    if (!isDocmanagerAuthenticated) {
      navigate('/');
    }
  }, [isDocmanagerAuthenticated, navigate]);
  useEffect(() => {
    getDataById('shippinginstructions', id);
  }, [id]);
  return (
    <>
      <Grid container className='dashboard-container justify-around'>
        <form onSubmit={onUpdateShippment} className='w-full'>
          <Grid className='accounts-list-container w-full -mt-3'>
            <div className='w-full flex flex-row justify-between mb-2'>
              <p className='h4 text-left'>Update Shipping Instruction</p>
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
                    onClick={() => navigate('/shipping-instructions')}
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
                Shipping Instruction
              </p>
            </Grid>
            <Grid className='w-full'>
              <Grid
                container
                spacing={2}
                className='invoice-form-container w-full h-fit'
              >
                <Grid item lg={6}>
                  <div className='full'>
                    <Grid container spacing={2} className='w-full'>
                      <Grid item lg={12} className='flex justify-center'>
                        <p className='h5 text-center font-bold'>
                          Shipping Details
                        </p>
                      </Grid>
                      <Grid item lg={12} className='flex justify-center'>
                        <TextField
                          className='w-full'
                          type='text'
                          value={shipment.consigne}
                          autoComplete='false'
                          onChange={(e) =>
                            setShipment({
                              ...shipment,
                              consigne: e.target.value,
                            })
                          }
                          label='CONSIGNEE'
                        />
                      </Grid>
                      <Grid item lg={12} className='flex justify-center'>
                        <TextField
                          className='w-full'
                          type='text'
                          value={shipment.notifParty}
                          autoComplete='false'
                          onChange={(e) =>
                            setShipment({
                              ...shipment,
                              notifParty: e.target.value,
                            })
                          }
                          label='Notify Party'
                        />
                      </Grid>
                      <Grid item lg={12} className='flex justify-center'>
                        <TextField
                          className='w-full'
                          type='text'
                          value={shipment.address}
                          autoComplete='false'
                          onChange={(e) =>
                            setShipment({
                              ...shipment,
                              address: e.target.value,
                            })
                          }
                          label='Address'
                        />
                      </Grid>
                      <Grid item lg={12} className='flex justify-center'>
                        <TextField
                          className='w-full'
                          type='text'
                          value={shipment.shipment}
                          autoComplete='false'
                          onChange={(e) =>
                            setShipment({
                              ...shipment,
                              shipment: e.target.value,
                            })
                          }
                          label='Shipment'
                        />
                      </Grid>
                      <Grid item lg={12} className='flex justify-center'>
                        <TextField
                          className='w-full'
                          type='text'
                          value={shipment.portOfLoad}
                          autoComplete='false'
                          onChange={(e) =>
                            setShipment({
                              ...shipment,
                              portOfLoad: e.target.value,
                            })
                          }
                          label='Port of Loading'
                        />
                      </Grid>
                      <Grid item lg={12} className='flex justify-center'>
                        <TextField
                          className='w-full'
                          type='text'
                          value={shipment.portOfDischarge}
                          autoComplete='false'
                          onChange={(e) =>
                            setShipment({
                              ...shipment,
                              portOfDischarge: e.target.value,
                            })
                          }
                          label='Port of Discharge'
                        />
                      </Grid>
                      <Grid item lg={12} className='flex justify-center'>
                        <TextField
                          className='w-full'
                          type='text'
                          value={shipment.bookingNo}
                          autoComplete='false'
                          onChange={(e) =>
                            setShipment({
                              ...shipment,
                              bookingNo: e.target.value,
                            })
                          }
                          label='Booking Number'
                        />
                      </Grid>
                      <Grid item lg={12} className='flex justify-center'>
                        <TextField
                          className='w-full'
                          type='text'
                          value={shipment.shippingLine}
                          autoComplete='false'
                          onChange={(e) =>
                            setShipment({
                              ...shipment,
                              shippingLine: e.target.value,
                            })
                          }
                          label='Shipping Line'
                        />
                      </Grid>
                      <Grid item lg={12} className='flex justify-center'>
                        <p className='h5 text-center font-bold'>
                          Description of Packages and Goods
                        </p>
                      </Grid>
                      <Grid item lg={12} className='flex justify-center'>
                        <TextField
                          className='w-full'
                          type='text'
                          multiline
                          minRows={3}
                          value={shipment.description}
                          autoComplete='false'
                          onChange={(e) =>
                            setShipment({
                              ...shipment,
                              description: e.target.value,
                            })
                          }
                          label='Description'
                        />
                      </Grid>
                      <Grid item lg={6} className='flex justify-center'>
                        <TextField
                          className='w-full'
                          type='text'
                          value={shipment.icoNumber}
                          autoComplete='false'
                          onChange={(e) =>
                            setShipment({
                              ...shipment,
                              icoNumber: e.target.value,
                            })
                          }
                          label='ICO#'
                        />
                      </Grid>
                      <Grid item lg={6} className='flex justify-center'>
                        <TextField
                          className='w-full'
                          type='text'
                          value={shipment.hsCode}
                          autoComplete='false'
                          onChange={(e) =>
                            setShipment({
                              ...shipment,
                              hsCode: e.target.value,
                            })
                          }
                          label='HS CODE'
                        />
                      </Grid>
                      <Grid item lg={12} className='flex justify-center'>
                        <TextField
                          className='w-full'
                          type='number'
                          value={shipment.descNetWeight}
                          autoComplete='false'
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='start'>
                                kg
                              </InputAdornment>
                            ),
                          }}
                          onChange={(e) =>
                            setShipment({
                              ...shipment,
                              descNetWeight: e.target.value,
                            })
                          }
                          label='Net Weight'
                        />
                      </Grid>
                      <Grid item lg={12} className='flex justify-center'>
                        <TextField
                          className='w-full'
                          type='text'
                          multiline
                          minRows={3}
                          value={shipment.packing}
                          autoComplete='false'
                          onChange={(e) =>
                            setShipment({
                              ...shipment,
                              packing: e.target.value,
                            })
                          }
                          label='Packing'
                        />
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item lg={6}>
                  <div className='full'>
                    <Grid container spacing={2} className='w-full'>
                      <Grid item lg={12} className='flex justify-center'>
                        <p className='h5 text-center font-bold'>
                          Marks and Numbers
                        </p>
                      </Grid>
                      <Grid item lg={12} className='flex justify-center'>
                        <TextField
                          className='w-full'
                          type='text'
                          multiline
                          minRows={2}
                          value={shipment.name}
                          autoComplete='false'
                          onChange={(e) =>
                            setShipment({
                              ...shipment,
                              name: e.target.value,
                            })
                          }
                          label='Coffee Type'
                        />
                      </Grid>
                      <Grid item lg={12} className='flex justify-center'>
                        <TextField
                          className='w-full'
                          type='text'
                          value={shipment.certNumbers}
                          autoComplete='false'
                          onChange={(e) =>
                            setShipment({
                              ...shipment,
                              certNumbers: e.target.value,
                            })
                          }
                          label='CERT Numbers (separated by comma)'
                        />
                      </Grid>
                      <Grid item lg={12} className='flex justify-center'>
                        <TextField
                          className='w-full'
                          type='number'
                          value={shipment.mnNetWeight}
                          autoComplete='false'
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='start'>
                                kg
                              </InputAdornment>
                            ),
                          }}
                          onChange={(e) =>
                            setShipment({
                              ...shipment,
                              mnNetWeight: e.target.value,
                            })
                          }
                          label='Net Weight'
                        />
                      </Grid>
                      <Grid item lg={12} className='flex justify-center'>
                        <TextField
                          className='w-full'
                          type='text'
                          value={shipment.destination}
                          autoComplete='false'
                          onChange={(e) =>
                            setShipment({
                              ...shipment,
                              destination: e.target.value,
                            })
                          }
                          label='Destination'
                        />
                      </Grid>
                      <Grid item lg={12} className='flex justify-center'>
                        <p className='h5 text-center font-bold'>
                          Package, Weight & Transport Details
                        </p>
                      </Grid>
                      <Grid item lg={6} className='flex justify-center'>
                        <TextField
                          className='w-full'
                          type='number'
                          value={shipment.grossWeight}
                          autoComplete='false'
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='start'>
                                kg
                              </InputAdornment>
                            ),
                          }}
                          onChange={(e) =>
                            setShipment({
                              ...shipment,
                              grossWeight: e.target.value,
                            })
                          }
                          label='Gross Weight'
                        />
                      </Grid>
                      <Grid item lg={6} className='flex justify-center'>
                        <TextField
                          className='w-full'
                          type='number'
                          value={shipment.netWeight}
                          autoComplete='false'
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='start'>
                                kg
                              </InputAdornment>
                            ),
                          }}
                          onChange={(e) =>
                            setShipment({
                              ...shipment,
                              netWeight: e.target.value,
                            })
                          }
                          label='Net Weight'
                        />
                      </Grid>
                      <Grid item lg={6} className='flex justify-center'>
                        <TextField
                          className='w-full'
                          type='number'
                          value={shipment.noOfBags}
                          autoComplete='false'
                          onChange={(e) =>
                            setShipment({
                              ...shipment,
                              noOfBags: e.target.value,
                            })
                          }
                          label='Number of Bags'
                        />
                      </Grid>
                      <Grid item lg={6} className='flex justify-center'>
                        <TextField
                          className='w-full'
                          type='text'
                          value={shipment.transportation}
                          autoComplete='false'
                          onChange={(e) =>
                            setShipment({
                              ...shipment,
                              transportation: e.target.value,
                            })
                          }
                          label='Transportation'
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

export default UpdateShipmentInstructions;
