import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Button,
  LinearProgress,
  IconButton,
  Modal,
  Fab,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  tableCellClasses,
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Close, CreateOutlined, NoteAdd, Print } from '@mui/icons-material';
import { BootstrapTooltip } from '../../../components/admin/accountsList';
import { emptyErrors, getWeightNotes } from '../../../actions/generalActions';
import { CustomNoRowsOverlay } from '../../../components/noRowsOverlay';
import ReactToPrint from 'react-to-print';
import { toast, ToastContainer } from 'react-toastify';
import { fabStyle } from '../../admin/cuppingAdmin';

function WeightNotes() {
  const { isDocmanagerAuthenticated } = useSelector((state) => state.auth);
  const { weightNotes, loading } = useSelector((state) => state.adminData);
  const errors = useSelector((state) => state.errors);
  const [selectedWeightNote, setSelectedWeightNote] = useState(null);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const toBePrinted = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function onPrint(selectedRow) {
    console.log(selectedRow);
    setSelectedWeightNote(selectedRow);
    setInvoiceModalOpen(true);
    console.log(selectedWeightNote);
  }
  function onEdit(selectedRow) {
    console.log(selectedRow);
    navigate(`/update-wn/${selectedRow.id}`);
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'product', headerName: 'Desc. of Goods', width: 200 },
    { field: 'shipper', headerName: 'Shipper', width: 200 },
    { field: 'reciever', headerName: 'Reciever', width: 200 },
    { field: 'date', headerName: 'Date', width: 130 },
    {
      field: 'action',
      headerName: 'Print',
      sortable: false,
      renderCell: (params) => {
        return (
          <div className='w-full flex justify-center'>
            <BootstrapTooltip title='Print'>
              <IconButton size='small' onClick={() => onPrint(params.row)}>
                <Print />
              </IconButton>
            </BootstrapTooltip>
          </div>
        );
      },
    },
    {
      field: 'edit',
      headerName: 'Edit',
      sortable: false,
      renderCell: (params) => {
        return (
          <div className='w-full flex justify-center'>
            <BootstrapTooltip title='Edit'>
              <IconButton size='small' onClick={() => onEdit(params.row)}>
                <CreateOutlined />
              </IconButton>
            </BootstrapTooltip>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    if (!isDocmanagerAuthenticated) {
      navigate('/');
    }
  }, [isDocmanagerAuthenticated, navigate]);
  useEffect(() => {
    dispatch(getWeightNotes());
  }, [dispatch]);
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
  return (
    <>
      <Grid container className='dashboard-container justify-around'>
        <Grid className='accounts-list-container w-full -mt-3'>
          <div className='w-full flex flex-row justify-between mb-2'>
            <p className='h4 text-left'>Weight Notes</p>
            <div>
              <Button
                startIcon={<NoteAdd />}
                variant='contained'
                onClick={() => navigate('/new-weight-note')}
              >
                Add Weight Note
              </Button>
            </div>
          </div>
          <DataGrid
            className='bg-white p-4'
            rows={weightNotes}
            columns={columns}
            components={{
              Toolbar: GridToolbar,
              NoRowsOverlay: CustomNoRowsOverlay,
              LoadingOverlay: LinearProgress,
            }}
            componentsProps={{
              toolbar: { showQuickFilter: true },
            }}
            loading={loading}
          />
        </Grid>
      </Grid>
      <Modal open={invoiceModalOpen} onClose={() => setInvoiceModalOpen(false)}>
        <>
          <div
            className='h-screen w-fit overflow-auto'
            style={{ marginLeft: '10%' }}
          >
            {selectedWeightNote ? (
              <Grid
                className='invoice-layout-container w-4/5 mx-auto bg-white overflow-hidden'
                ref={toBePrinted}
              >
                <Grid className='title-container w-full text-center mb-6 mt-10'>
                  <p className='h3 text-left text-black'>Original</p>
                  <p className='h3 font-bold underline text-center text-black'>
                    Weight Notes
                  </p>
                </Grid>
                <p className='text-left text-black'>
                  WE HERE BY CERTIFY THAT THE WEIGHT OF{' '}
                  {selectedWeightNote.noOfBags
                    .split(',')
                    .reduce((a, b) => parseInt(a) + parseInt(b), 0)}{' '}
                  BAGS ETHIOPIAN
                  {selectedWeightNote.product.toUpperCase()} COFFEE WEIGHT OF
                  THE STATED AS FOLLOWS:
                </p>
                <TableContainer
                  component={Paper}
                  sx={{
                    height: '95%',
                  }}
                  className='shadow-none'
                >
                  <Table
                    size='small'
                    sx={{
                      [`& .${tableCellClasses.root}`]: {
                        borderBottom: 'none',
                      },
                    }}
                    className='shadow-none'
                  >
                    <TableBody sx={{ width: '100%' }}>
                      <TableRow>
                        <TableCell>
                          <strong>Shipper: </strong>
                        </TableCell>
                        <TableCell sx={{ textAlign: 'start' }}>
                          {selectedWeightNote.shipper}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>TELL: </strong>
                        </TableCell>
                        <TableCell sx={{ textAlign: 'start' }}>
                          +251 913128964, ADDIS ABABA, ETHIOPIA
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '25%' }}>
                          <strong>Notify: </strong>
                        </TableCell>
                        <TableCell sx={{ width: '75%' }}>
                          {selectedWeightNote.reciever}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Description of Goods: </strong>
                        </TableCell>
                        <TableCell sx={{ width: '100%' }}>
                          2X20 FEET CONTAINER WITH{' '}
                          {selectedWeightNote.noOfBags
                            .split(',')
                            .reduce(
                              (a, b) => parseInt(a) + parseInt(b),
                              0
                            )}{' '}
                          BAGS OF {selectedWeightNote.product.toUpperCase()}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Packing: </strong>
                        </TableCell>
                        <TableCell sx={{ width: '100%' }}>
                          {' '}
                          {selectedWeightNote.noOfBags
                            .split(',')
                            .reduce(
                              (a, b) => parseInt(a) + parseInt(b),
                              0
                            )}{' '}
                          BAGS OF{' '}
                          {(
                            selectedWeightNote.netWeights
                              .split(',')
                              .reduce((a, b) => parseInt(a) + parseInt(b), 0) /
                            selectedWeightNote.noOfBags
                              .split(',')
                              .reduce((a, b) => parseInt(a) + parseInt(b), 0)
                          ).toFixed(0)}{' '}
                          KGS NET NEW JUTE BAGS INNER IN GRAIN PRO
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Port of Loading: </strong>
                        </TableCell>
                        <TableCell sx={{ width: '100%' }}>
                          {selectedWeightNote.portOfLoading}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Port of Discharge: </strong>
                        </TableCell>
                        <TableCell sx={{ width: '100%' }}>
                          {selectedWeightNote.portOfDischarge}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Quantity: </strong>
                        </TableCell>
                        <TableCell sx={{ width: '100%' }}>
                          {selectedWeightNote.netWeights
                            .split(',')
                            .reduce((a, b) => parseInt(a) + parseInt(b), 0) /
                            1000}{' '}
                          METRIC TONS
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '30%' }}>
                          <strong>Average gross weight each: </strong>
                        </TableCell>
                        <TableCell sx={{ width: '100%' }}>
                          {(
                            selectedWeightNote.grossWeights
                              .split(',')
                              .reduce((a, b) => parseInt(a) + parseInt(b), 0) /
                            selectedWeightNote.noOfBags
                              .split(',')
                              .reduce((a, b) => parseInt(a) + parseInt(b), 0)
                          ).toFixed(0)}{' '}
                          KGS
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Average net weight each: </strong>
                        </TableCell>
                        <TableCell sx={{ width: '100%' }}>
                          {(
                            selectedWeightNote.netWeights
                              .split(',')
                              .reduce((a, b) => parseInt(a) + parseInt(b), 0) /
                            selectedWeightNote.noOfBags
                              .split(',')
                              .reduce((a, b) => parseInt(a) + parseInt(b), 0)
                          ).toFixed(0)}{' '}
                          KGS
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Total gross weight: </strong>
                        </TableCell>
                        <TableCell sx={{ width: '100%' }}>
                          {selectedWeightNote.grossWeights
                            .split(',')
                            .reduce(
                              (a, b) => parseInt(a) + parseInt(b),
                              0
                            )}{' '}
                          KGS
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Total net weight: </strong>
                        </TableCell>
                        <TableCell sx={{ width: '100%' }}>
                          {selectedWeightNote.netWeights
                            .split(',')
                            .reduce(
                              (a, b) => parseInt(a) + parseInt(b),
                              0
                            )}{' '}
                          KGS
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Number of bags: </strong>
                        </TableCell>
                        <TableCell sx={{ width: '100%' }}>
                          {selectedWeightNote.noOfBags
                            .split(',')
                            .reduce(
                              (a, b) => parseInt(a) + parseInt(b),
                              0
                            )}{' '}
                          JUTE BAGS INNER IN GRAIN PRO KGS
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>VESSEL: </strong>
                        </TableCell>
                        <TableCell sx={{ width: '100%' }}>
                          {selectedWeightNote.vesselAndVoyNumber}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>B/L Number: </strong>
                        </TableCell>
                        <TableCell sx={{ width: '100%' }}>
                          {selectedWeightNote.blNumber}
                          KGS
                        </TableCell>
                      </TableRow>
                      <TableRow className='mb-20'>
                        <TableCell>
                          <strong>Dated: </strong>
                        </TableCell>
                        <TableCell sx={{ width: '100%' }}>
                          {selectedWeightNote.blDate}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <p className='text-left text-black mt-96 pt-20'>Markings:</p>
                <div className='border-2 border-black w-2/3 p-8 mx-auto mt-10 flex flex-col justify-center items-center'>
                  <p className='h6 font-bold text-center underline'>One Side</p>
                  <p className='text-xs font-bold text-center my-2'>
                    {selectedWeightNote.shipper.toUpperCase()}
                  </p>
                  <p className='text-xs font-bold text-center my-2'>
                    PRODUCE OF ETHIOPIA
                  </p>
                  <p className='text-xs font-bold text-center my-2'>
                    ICO {selectedWeightNote.icoNo}
                  </p>
                  <p className='text-xs font-bold text-center my-2'>
                    {selectedWeightNote.product.toUpperCase()}
                  </p>
                  <p className='text-xs font-bold text-center my-2'>
                    CERT NO. {selectedWeightNote.certNo}
                  </p>
                  <p className='h6 text-xs font-bold text-center underline my-1'>
                    The Other Side
                  </p>
                  <p className='text-xs font-bold text-center my-2'>
                    {selectedWeightNote.reciever.toUpperCase()} - PRODUCE OF
                    ETHIOPIA - {selectedWeightNote.product.toUpperCase()}
                  </p>
                  <p className='text-xs font-bold text-center mt-2'>
                    DESTINATION - {selectedWeightNote.destination.toUpperCase()}
                  </p>
                </div>
                <p className='mt-6 h5 text-left'>
                  As per bill of loading details of containers as follows: -
                </p>
                <Table
                  sx={{
                    [`& .${tableCellClasses.root}`]: {
                      borderRight: '1px solid gray',
                      borderLeft: '1px solid gray',
                      width: 'fit-content',
                    },
                  }}
                >
                  <TableRow className='border border-black'>
                    <TableCell>No</TableCell>
                    <TableCell>Container No</TableCell>
                    <TableCell>Seal No</TableCell>
                    <TableCell>No of bags</TableCell>
                    <TableCell>Gross weights</TableCell>
                    <TableCell>Net weights</TableCell>
                  </TableRow>
                  <TableBody>
                    {selectedWeightNote.containerNumbers
                      .split(',')
                      .map((container, index) => {
                        return (
                          <TableRow>
                            <TableCell>
                              <strong>{index + 1}</strong>
                            </TableCell>
                            <TableCell>
                              <strong>{container}</strong>
                            </TableCell>
                            <TableCell>
                              <strong>
                                {
                                  selectedWeightNote.sealNumbers.split(',')[
                                    index
                                  ]
                                }
                              </strong>
                            </TableCell>
                            <TableCell>
                              <strong>
                                {selectedWeightNote.noOfBags.split(',')[index]}
                              </strong>
                            </TableCell>
                            <TableCell>
                              <strong>
                                {
                                  selectedWeightNote.grossWeights.split(',')[
                                    index
                                  ]
                                }
                              </strong>
                            </TableCell>
                            <TableCell>
                              <strong>
                                {
                                  selectedWeightNote.netWeights.split(',')[
                                    index
                                  ]
                                }
                              </strong>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    <TableRow>
                      <TableCell colspan='3' sx={{ textAlign: 'right' }}>
                        <strong>Total</strong>
                      </TableCell>
                      <TableCell>
                        <strong>
                          {selectedWeightNote.noOfBags
                            .split(',')
                            .reduce((a, b) => parseInt(a) + parseInt(b), 0)}
                        </strong>
                      </TableCell>
                      <TableCell>
                        <strong>
                          {selectedWeightNote.netWeights
                            .split(',')
                            .reduce((a, b) => parseInt(a) + parseInt(b), 0)}
                        </strong>
                      </TableCell>
                      <TableCell>
                        <strong>
                          {selectedWeightNote.grossWeights
                            .split(',')
                            .reduce((a, b) => parseInt(a) + parseInt(b), 0)}
                        </strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <p className='h5 font-bold text-right mt-24'>
                  ____________________
                </p>
                <p className='h5 font-bold text-right mb-32'>Signature</p>
              </Grid>
            ) : null}
            <IconButton
              sx={{ position: 'fixed', right: 20, top: 20, color: 'white' }}
              onClick={() => setInvoiceModalOpen(false)}
            >
              <Close fontSize='large' color='inherit' />
            </IconButton>
            <ReactToPrint
              trigger={() => {
                return (
                  <BootstrapTooltip title='Print' placement='top'>
                    <Fab color='primary' sx={fabStyle}>
                      <Print />
                    </Fab>
                  </BootstrapTooltip>
                );
              }}
              content={() => toBePrinted.current}
            />
          </div>
        </>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default WeightNotes;
