import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Button, TextField, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Check } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../../actions/types';
import axios from 'axios';

function UpdateInvoice() {
  const { isDocmanagerAuthenticated } = useSelector((state) => state.auth);
  const [updateData, setUpdateData] = useState({
    loading: false,
    addDataLoading: false,
    updateSuccess: false,
  });
  const [errors, setErrors] = useState(null);
  const { id } = useParams();
  const Day = new Date();
  const newDate = `${Day.getDate()}/${Day.getMonth()}/${Day.getFullYear()}`;
  const [invoice, setInvoice] = useState({
    reciever: '',
    terms: '',
    port: '',
    dest: '',
    noOfBags: '',
    incoTerms: '',
    benBank: '',
    swiftCode: '',
    corBank: '',
    benName: '',
    accNo: '',
    address: '',
    packing: '',
    coo: '',
    consigne: '',
    exporter: '',
    contractNo: '',
    contractDate: newDate,
    pmName: '',
    pmICO: '',
    pmCert: '',
    pmNetWeight: '',
    pmCrop: '',
    pmDest: '',
    description: '',
    grossWeight: '',
    netWeight: '',
    unitPrice: '',
    totalPrice: '',
    createdAt: '',
  });
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  function onUpdateInvoice(e) {
    e.preventDefault();
    updateDoc('commercialinvoices', invoice);
  }

  const updateDoc = async (table, invoice) => {
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

    const body = JSON.stringify(invoice);
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
      setInvoice(res.data[0]);
      console.log(invoice);
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
      Object.values(invoice).every((value) => {
        if (!value.toString().trim().length || value === 0) {
          return false;
        }
        return true;
      })
    );
  }, [invoice]);
  useEffect(() => {
    if (!isDocmanagerAuthenticated) {
      navigate('/');
    }
  }, [isDocmanagerAuthenticated, navigate]);
  useEffect(() => {
    getDataById('commercialinvoices', id);
  }, [id]);
  return (
    <>
      <Grid container className='dashboard-container justify-around'>
        <form onSubmit={onUpdateInvoice} className='w-full'>
          <Grid className='accounts-list-container w-full -mt-3'>
            <div className='w-full flex flex-row justify-between mb-2'>
              <p className='h4 text-left'>Update Invoice</p>
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
                    onClick={() => navigate('/invoices')}
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
              <p className='h3 font-bold underline text-center text-black'>
                Commercial Invoice
              </p>
            </Grid>
            <Grid className='w-full'>
              <Grid
                container
                spacing={2}
                className='invoice-form-container w-full h-fit'
              >
                <Grid item lg={6}>
                  <Grid container spacing={2} className='w-full'>
                    <Grid item lg={12} className='flex justify-center'>
                      <p className='h5 font-bold'>Invoice Detail</p>
                    </Grid>
                    <Grid item lg={12} className='flex justify-center'>
                      <TextField
                        className='w-full'
                        type='text'
                        value={invoice.reciever}
                        autoComplete='false'
                        onChange={(e) =>
                          setInvoice({
                            ...invoice,
                            reciever: e.target.value,
                          })
                        }
                        label='To'
                      />
                    </Grid>
                    <Grid item lg={12} className='flex justify-center'>
                      <TextField
                        className='w-full'
                        type='text'
                        value={invoice.terms}
                        autoComplete='false'
                        onChange={(e) =>
                          setInvoice({
                            ...invoice,
                            terms: e.target.value,
                          })
                        }
                        label='Terms'
                      />
                    </Grid>
                    <Grid item lg={12} className='flex justify-center'>
                      <TextField
                        className='w-full'
                        type='text'
                        value={invoice.port}
                        autoComplete='false'
                        onChange={(e) =>
                          setInvoice({
                            ...invoice,
                            port: e.target.value,
                          })
                        }
                        label='Port of Landing'
                      />
                    </Grid>
                    <Grid item lg={12} className='flex justify-center'>
                      <TextField
                        className='w-full'
                        type='text'
                        value={invoice.dest}
                        autoComplete='false'
                        onChange={(e) =>
                          setInvoice({
                            ...invoice,
                            dest: e.target.value,
                          })
                        }
                        label='Destination'
                      />
                    </Grid>
                    <Grid item lg={12} className='flex justify-center'>
                      <TextField
                        className='w-full'
                        type='number'
                        value={invoice.noOfBags}
                        autoComplete='false'
                        onChange={(e) =>
                          setInvoice({
                            ...invoice,
                            noOfBags: e.target.value,
                          })
                        }
                        label='Number of Bags'
                      />
                    </Grid>
                    <Grid item lg={12} className='flex justify-center'>
                      <TextField
                        className='w-full'
                        type='text'
                        value={invoice.incoTerms}
                        autoComplete='false'
                        onChange={(e) =>
                          setInvoice({
                            ...invoice,
                            incoTerms: e.target.value,
                          })
                        }
                        label='INCOTERMS'
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item spacing={2} lg={6}>
                  <Grid container spacing={2} className='w-full'>
                    <Grid item lg={12} className='flex justify-center'>
                      <p className='h5 font-bold'>Exporter Bank Detail</p>
                    </Grid>
                    <Grid item lg={12} className='flex justify-center'>
                      <TextField
                        className='w-full'
                        type='text'
                        value={invoice.benBank}
                        autoComplete='false'
                        onChange={(e) =>
                          setInvoice({
                            ...invoice,
                            benBank: e.target.value,
                          })
                        }
                        label='Beneficiary Bank'
                      />
                    </Grid>
                    <Grid item lg={12} className='flex justify-center'>
                      <TextField
                        className='w-full'
                        type='text'
                        value={invoice.swiftCode}
                        autoComplete='false'
                        onChange={(e) =>
                          setInvoice({
                            ...invoice,
                            swiftCode: e.target.value,
                          })
                        }
                        label='Swift Code'
                      />
                    </Grid>
                    <Grid item lg={12} className='flex justify-center'>
                      <TextField
                        className='w-full'
                        type='text'
                        value={invoice.corBank}
                        autoComplete='false'
                        onChange={(e) =>
                          setInvoice({
                            ...invoice,
                            corBank: e.target.value,
                          })
                        }
                        label='Correspondent Bank'
                      />
                    </Grid>
                    <Grid item lg={12} className='flex justify-center'>
                      <TextField
                        className='w-full'
                        type='text'
                        value={invoice.benName}
                        onChange={(e) =>
                          setInvoice({
                            ...invoice,
                            benName: e.target.value,
                          })
                        }
                        label='Beneficiary Name'
                      />
                    </Grid>
                    <Grid item lg={12} className='flex justify-center'>
                      <TextField
                        className='w-full'
                        type='number'
                        value={invoice.accNo}
                        autoComplete='false'
                        onChange={(e) =>
                          setInvoice({
                            ...invoice,
                            accNo: e.target.value,
                          })
                        }
                        label='Account Number'
                      />
                    </Grid>
                    <Grid item lg={12} className='flex justify-center'>
                      <TextField
                        className='w-full'
                        type='text'
                        value={invoice.address}
                        autoComplete='false'
                        onChange={(e) =>
                          setInvoice({
                            ...invoice,
                            address: e.target.value,
                          })
                        }
                        label='Address'
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={12} className='flex justify-center'>
                  <Grid container spacing={2} className='w-full'>
                    <Grid item lg={12} className='flex justify-center'>
                      <p className='h5 font-bold'>Packing Details</p>
                    </Grid>
                    <Grid item lg={6} className='flex justify-center'>
                      <Grid container spacing={2} className='w-full'>
                        <Grid item lg={12} className='flex justify-center'>
                          <TextField
                            className='w-full'
                            type='text'
                            multiline
                            minRows={4}
                            value={invoice.packing}
                            autoComplete='false'
                            onChange={(e) =>
                              setInvoice({
                                ...invoice,
                                packing: e.target.value,
                              })
                            }
                            label='Packing Details'
                          />
                        </Grid>
                        <Grid item lg={12} className='flex justify-center'>
                          <TextField
                            className='w-full'
                            type='text'
                            value={invoice.coo}
                            autoComplete='false'
                            onChange={(e) =>
                              setInvoice({
                                ...invoice,
                                coo: e.target.value,
                              })
                            }
                            label='Conutry of Origin'
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item lg={6} className='flex justify-center'>
                      <Grid container spacing={2} className='w-full'>
                        <Grid item lg={12} className='flex justify-center'>
                          <TextField
                            className='w-full'
                            type='text'
                            value={invoice.consigne}
                            autoComplete='false'
                            onChange={(e) =>
                              setInvoice({
                                ...invoice,
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
                            value={invoice.exporter}
                            autoComplete='false'
                            onChange={(e) =>
                              setInvoice({
                                ...invoice,
                                exporter: e.target.value,
                              })
                            }
                            label='Exporter'
                          />
                        </Grid>
                        <Grid item lg={12} className='flex justify-center'>
                          <TextField
                            className='w-full'
                            type='text'
                            value={invoice.contractNo}
                            autoComplete='false'
                            onChange={(e) =>
                              setInvoice({
                                ...invoice,
                                contractNo: e.target.value,
                              })
                            }
                            label='Contract Number'
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={12} className='flex justify-center'>
                  <Grid container spacing={2} className='w-full'>
                    <Grid item lg={12} className='flex justify-center'>
                      <p className='h5 font-bold'>Other Details</p>
                    </Grid>
                    <Grid item lg={2} className='flex justify-center'>
                      <Grid container spacing={2} className='w-full'>
                        <Grid item lg={12} className='flex justify-center'>
                          <p className='text-base font-bold'>Packing Mark</p>
                        </Grid>
                        <Grid item lg={12} className='flex justify-center'>
                          <TextField
                            className='w-full'
                            type='text'
                            multiline
                            minRows={2}
                            value={invoice.pmName}
                            autoComplete='false'
                            onChange={(e) =>
                              setInvoice({
                                ...invoice,
                                pmName: e.target.value,
                              })
                            }
                            label='Packing Mark Name'
                          />
                        </Grid>
                        <Grid item lg={12} className='flex justify-center'>
                          <TextField
                            className='w-full'
                            type='text'
                            value={invoice.pmICO}
                            autoComplete='false'
                            onChange={(e) =>
                              setInvoice({
                                ...invoice,
                                pmICO: e.target.value,
                              })
                            }
                            label='ICO#'
                          />
                        </Grid>
                        <Grid item lg={12} className='flex justify-center'>
                          <TextField
                            className='w-full'
                            type='text'
                            value={invoice.pmCert}
                            autoComplete='false'
                            onChange={(e) =>
                              setInvoice({
                                ...invoice,
                                pmCert: e.target.value,
                              })
                            }
                            label='CERT#'
                          />
                        </Grid>
                        <Grid item lg={12} className='flex justify-center'>
                          <TextField
                            className='w-full'
                            type='number'
                            value={invoice.pmNetWeight}
                            autoComplete='false'
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position='start'>
                                  kg
                                </InputAdornment>
                              ),
                            }}
                            onChange={(e) =>
                              setInvoice({
                                ...invoice,
                                pmNetWeight: e.target.value,
                              })
                            }
                            label='Net Weight'
                          />
                        </Grid>
                        <Grid item lg={12} className='flex justify-center'>
                          <TextField
                            className='w-full'
                            type='text'
                            value={invoice.pmCrop}
                            autoComplete='false'
                            onChange={(e) =>
                              setInvoice({
                                ...invoice,
                                pmCrop: e.target.value,
                              })
                            }
                            label='CROP'
                          />
                        </Grid>
                        <Grid item lg={12} className='flex justify-center'>
                          <TextField
                            className='w-full'
                            type='text'
                            value={invoice.pmDest}
                            autoComplete='false'
                            onChange={(e) =>
                              setInvoice({
                                ...invoice,
                                pmDest: e.target.value,
                              })
                            }
                            label='DEST'
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item lg={2} className='flex justify-start'>
                      <Grid container spacing={2} className='w-full h-fit'>
                        <Grid item lg={12} className='flex justify-center'>
                          <p className='text-base font-bold'>Desc. of Goods</p>
                        </Grid>
                        <Grid item lg={12} className='flex justify-start'>
                          <TextField
                            className='w-full'
                            type='text'
                            multiline
                            minRows={2}
                            value={invoice.description}
                            autoComplete='false'
                            onChange={(e) =>
                              setInvoice({
                                ...invoice,
                                description: e.target.value,
                              })
                            }
                            label='Description'
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item lg={2} className='flex justify-start'>
                      <Grid container spacing={2} className='w-full h-fit'>
                        <Grid item lg={12} className='flex justify-center'>
                          <p className='text-base font-bold'>Gross Weight</p>
                        </Grid>
                        <Grid item lg={12} className='flex justify-start'>
                          <TextField
                            className='w-full'
                            type='number'
                            value={invoice.grossWeight}
                            autoComplete='false'
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position='start'>
                                  kg
                                </InputAdornment>
                              ),
                            }}
                            onChange={(e) =>
                              setInvoice({
                                ...invoice,
                                grossWeight: e.target.value,
                              })
                            }
                            label='Gross Weight'
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item lg={2} className='flex justify-start'>
                      <Grid container spacing={2} className='w-full h-fit'>
                        <Grid item lg={12} className='flex justify-center'>
                          <p className='text-base font-bold'>Net Weight</p>
                        </Grid>
                        <Grid item lg={12} className='flex justify-start'>
                          <TextField
                            className='w-full'
                            type='number'
                            value={invoice.netWeight}
                            autoComplete='false'
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position='start'>
                                  kg
                                </InputAdornment>
                              ),
                            }}
                            onChange={(e) =>
                              setInvoice({
                                ...invoice,
                                netWeight: e.target.value,
                              })
                            }
                            label='Net Weight'
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item lg={2} className='flex justify-start'>
                      <Grid container spacing={2} className='w-full h-fit'>
                        <Grid item lg={12} className='flex justify-center'>
                          <p className='text-base font-bold'>Unit Price</p>
                        </Grid>
                        <Grid item lg={12} className='flex justify-start'>
                          <TextField
                            className='w-full'
                            type='number'
                            value={invoice.unitPrice}
                            autoComplete='false'
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position='start'>
                                  USD/lb
                                </InputAdornment>
                              ),
                            }}
                            onChange={(e) => {
                              setInvoice({
                                ...invoice,
                                unitPrice: e.target.value,
                              });
                              console.log(invoice);
                            }}
                            label='Unit Price'
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item lg={2} className='flex justify-start'>
                      <Grid container spacing={2} className='w-full h-fit'>
                        <Grid item lg={12} className='flex justify-center'>
                          <p className='text-base font-bold'>Total Price</p>
                        </Grid>
                        <Grid item lg={12} className='flex justify-start'>
                          <TextField
                            className='w-full'
                            type='number'
                            aria-readonly='true'
                            value={invoice.totalPrice}
                            autoComplete='false'
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position='start'>
                                  USD
                                </InputAdornment>
                              ),
                            }}
                            label='Total Price'
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
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

export default UpdateInvoice;
