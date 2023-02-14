import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Description, Send, RestartAltRounded } from '@mui/icons-material';
import { addPacking } from '../../../actions/docmanagerActions';
import { emptyErrors, resetUpdate } from '../../../actions/generalActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdatePackingList() {
  const { isDocmanagerAuthenticated } = useSelector((state) => state.auth);
  const { addDataLoading, dataUpdated } = useSelector(
    (state) => state.adminData
  );
  const errors = useSelector((state) => state.errors);
  const Day = new Date();
  const newDate = `${Day.getDate()}/${Day.getMonth() + 1}/${Day.getFullYear()}`;
  const [packingList, setPackingList] = useState({
    buyer: '',
    type: '',
    icoNumber: '',
    certNumbers: '',
    mnNetWeight: '',
    crop: '',
    destination: '',
    description: '',
    noOfBags: '',
    bagWeight: '',
    contractNumber: '',
    contractDate: newDate,
    container: '',
    quantity: '',
    grossWeight: '',
    netWeight: '',
    transportation: '',
    reciever: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  function onAddPackingList(e) {
    e.preventDefault();
    let newObj = packingList;
    newObj.createdAt = new Date().getTime();
    setPackingList(newObj);
    dispatch(addPacking(packingList));
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
    if (dataUpdated === 'Packing list added') {
      toast.success('Packing list submitted', toastOptions);
      setTimeout(() => {
        dispatch(resetUpdate());
      }, 8000);
    }
  }, [dataUpdated, dispatch]);
  useEffect(() => {
    setValidated(
      Object.values(packingList).every((value) => {
        if (!value.toString().trim().length || value === 0) {
          return false;
        }
        return true;
      })
    );
  }, [packingList]);
  useEffect(() => {
    if (!isDocmanagerAuthenticated) {
      navigate('/');
    }
  }, [isDocmanagerAuthenticated, navigate]);
  return (
    <>
      <Grid container className='dashboard-container justify-around'>
        <form onSubmit={onAddPackingList} className='w-full'>
          <Grid className='accounts-list-container w-full -mt-3'>
            <div className='w-full flex flex-row justify-between mb-2'>
              <p className='h4 text-left'>Packing Lists</p>
              <div className='flex flex-row'>
                <IconButton
                  variant='contained'
                  onClick={() => {
                    setPackingList({
                      buyer: '',
                      type: '',
                      icoNumber: '',
                      certNumbers: '',
                      mnNetWeight: '',
                      crop: '',
                      destination: '',
                      description: '',
                      noOfBags: '',
                      bagWeight: '',
                      contractNumber: '',
                      contractDate: newDate,
                      container: '',
                      quantity: '',
                      grossWeight: '',
                      netWeight: '',
                      transportation: '',
                      reciever: '',
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
                    onClick={() => navigate('/packing-lists')}
                  >
                    View Packing Lists
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
                Packing List
              </p>
            </Grid>
            <Grid className='w-full'>
              <Grid
                container
                spacing={2}
                className='invoice-form-container w-full h-fit'
              >
                <Grid item lg={12} className='flex justify-center'>
                  <TextField
                    className='w-1/2'
                    type='text'
                    value={packingList.buyer}
                    autoComplete='false'
                    onChange={(e) =>
                      setPackingList({
                        ...packingList,
                        buyer: e.target.value,
                      })
                    }
                    label='Buyer'
                  />
                </Grid>
                <Grid item lg={6}>
                  <div className='full'>
                    <Grid container spacing={2} className='w-full'>
                      <Grid item lg={12} className='flex justify-center'>
                        <p className='h5 font-bold text-center'>
                          Marks and Numbers
                        </p>
                      </Grid>
                      <Grid item lg={12} className='flex justify-center'>
                        <TextField
                          className='w-full'
                          type='text'
                          multiline
                          minRows={3}
                          value={packingList.type}
                          autoComplete='false'
                          onChange={(e) =>
                            setPackingList({
                              ...packingList,
                              type: e.target.value,
                            })
                          }
                          label='Coffee Type'
                        />
                      </Grid>
                      <Grid item lg={12} className='flex justify-center'>
                        <TextField
                          className='w-full'
                          type='text'
                          value={packingList.icoNumber}
                          autoComplete='false'
                          onChange={(e) =>
                            setPackingList({
                              ...packingList,
                              icoNumber: e.target.value,
                            })
                          }
                          label='ICO#'
                        />
                      </Grid>
                      <Grid item lg={12} className='flex justify-center'>
                        <TextField
                          className='w-full'
                          type='text'
                          value={packingList.certNumbers}
                          autoComplete='false'
                          onChange={(e) =>
                            setPackingList({
                              ...packingList,
                              certNumbers: e.target.value,
                            })
                          }
                          label='CERT Numbers (comma separated)'
                        />
                      </Grid>
                      <Grid item lg={6} className='flex justify-center'>
                        <TextField
                          className='w-full'
                          type='text'
                          value={packingList.crop}
                          autoComplete='false'
                          onChange={(e) =>
                            setPackingList({
                              ...packingList,
                              crop: e.target.value,
                            })
                          }
                          label='Crop'
                        />
                      </Grid>
                      <Grid item lg={6} className='flex justify-center'>
                        <TextField
                          className='w-full'
                          type='number'
                          value={packingList.mnNetWeight}
                          autoComplete='false'
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='start'>
                                kg
                              </InputAdornment>
                            ),
                          }}
                          onChange={(e) =>
                            setPackingList({
                              ...packingList,
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
                          value={packingList.destination}
                          autoComplete='false'
                          onChange={(e) =>
                            setPackingList({
                              ...packingList,
                              destination: e.target.value,
                            })
                          }
                          label='Destination'
                        />
                      </Grid>
                      <Grid item lg={12} className='flex justify-center'>
                        <TextField
                          className='w-full'
                          type='text'
                          value={packingList.contractNumber}
                          autoComplete='false'
                          onChange={(e) =>
                            setPackingList({
                              ...packingList,
                              contractNumber: e.target.value,
                            })
                          }
                          label='Contract Number'
                        />
                      </Grid>
                      <Grid item lg={12} className='flex justify-center'>
                        <TextField
                          className='w-full'
                          type='text'
                          value={packingList.reciever}
                          autoComplete='false'
                          onChange={(e) =>
                            setPackingList({
                              ...packingList,
                              reciever: e.target.value,
                            })
                          }
                          label='For'
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
                          Description of Packages and Goods
                        </p>
                      </Grid>
                      <Grid item lg={12} className='flex justify-center'>
                        <TextField
                          className='w-full'
                          type='text'
                          multiline
                          minRows={3}
                          value={packingList.description}
                          autoComplete='false'
                          onChange={(e) =>
                            setPackingList({
                              ...packingList,
                              description: e.target.value,
                            })
                          }
                          label='Description'
                        />
                      </Grid>
                      <Grid item lg={6} className='flex justify-center'>
                        <TextField
                          className='w-full'
                          type='number'
                          value={packingList.noOfBags}
                          autoComplete='false'
                          onChange={(e) =>
                            setPackingList({
                              ...packingList,
                              noOfBags: e.target.value,
                            })
                          }
                          label='Number of Bags'
                        />
                      </Grid>
                      <Grid item lg={6} className='flex justify-center'>
                        <TextField
                          className='w-full'
                          type='number'
                          value={packingList.bagWeight}
                          autoComplete='false'
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='start'>
                                kg
                              </InputAdornment>
                            ),
                          }}
                          onChange={(e) =>
                            setPackingList({
                              ...packingList,
                              bagWeight: e.target.value,
                            })
                          }
                          label='One Bag Weight'
                        />
                      </Grid>
                      <Grid item lg={6} className='flex justify-center'>
                        <TextField
                          className='w-full'
                          type='number'
                          value={packingList.grossWeight}
                          autoComplete='false'
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='start'>
                                kg
                              </InputAdornment>
                            ),
                          }}
                          onChange={(e) =>
                            setPackingList({
                              ...packingList,
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
                          value={packingList.netWeight}
                          autoComplete='false'
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='start'>
                                kg
                              </InputAdornment>
                            ),
                          }}
                          onChange={(e) =>
                            setPackingList({
                              ...packingList,
                              netWeight: e.target.value,
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
                          minRows={4}
                          value={packingList.quantity}
                          autoComplete='false'
                          onChange={(e) =>
                            setPackingList({
                              ...packingList,
                              quantity: e.target.value,
                            })
                          }
                          label='Quantity'
                        />
                      </Grid>
                      <Grid item lg={12} className='flex justify-center'>
                        <TextField
                          className='w-full'
                          type='text'
                          value={packingList.container}
                          autoComplete='false'
                          onChange={(e) =>
                            setPackingList({
                              ...packingList,
                              container: e.target.value,
                            })
                          }
                          label='Container'
                        />
                      </Grid>
                      <Grid item lg={12} className='flex justify-center'>
                        <TextField
                          className='w-full'
                          type='text'
                          value={packingList.transportation}
                          autoComplete='false'
                          onChange={(e) =>
                            setPackingList({
                              ...packingList,
                              transportation: e.target.value,
                            })
                          }
                          label='Means of Transportation'
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

export default UpdatePackingList;
