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
import { emptyErrors, getShipDecs } from '../../../actions/generalActions';
import { CustomNoRowsOverlay } from '../../../components/noRowsOverlay';
import ReactToPrint from 'react-to-print';
import { toast, ToastContainer } from 'react-toastify';
import { fabStyle } from '../../admin/cuppingAdmin';

function ShippingDeclerations() {
  const { isDocmanagerAuthenticated } = useSelector((state) => state.auth);
  const { shipDecs, loading } = useSelector((state) => state.adminData);
  const errors = useSelector((state) => state.errors);
  const [selectedShipDec, setSelectedShipDec] = useState(null);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const toBePrinted = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function onPrint(selectedRow) {
    console.log(selectedRow);
    setSelectedShipDec(selectedRow);
    setInvoiceModalOpen(true);
  }
  function onEdit(selectedRow) {
    navigate(`/update-sd/${selectedRow.id}`);
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'shipper', headerName: 'Shipper', width: 200 },
    { field: 'reciever', headerName: 'reciever', width: 130 },
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
    dispatch(getShipDecs());
  }, []);
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
            <p className='h4 text-left'>Shipping Declerations</p>
            <div>
              <Button
                startIcon={<NoteAdd />}
                variant='contained'
                onClick={() => navigate('/new-shippers-dec')}
              >
                Add Shipping Dec.
              </Button>
            </div>
          </div>
          <DataGrid
            className='bg-white p-4'
            rows={shipDecs}
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
            className='h-screen w-1/2 overflow-auto'
            style={{ marginLeft: '25%' }}
          >
            {selectedShipDec ? (
              <Grid
                className='invoice-layout-container w-full px-16 mx-auto bg-white overflow-hidden'
                ref={toBePrinted}
              >
                <Grid className='title-container w-full text-center mb-6 mt-10'>
                  <p className='h3 text-left text-black'>Original</p>
                  <p className='h3 font-bold underline text-center text-black'>
                    Shipping Decleration
                  </p>
                </Grid>
                <p className='text-left text-black'>
                  WE HEREBY CERTIFY THAT ETHIOPIA{' '}
                  {selectedShipDec.product.toUpperCase()} PACKED IN NEW{' '}
                  {selectedShipDec.noOfBags
                    .split(',')
                    .reduce((a, b) => parseInt(a) + parseInt(b), 0)}{' '}
                  JUTE BAGS WITH INNER GRIAN - PRO AND STUFFED IN SOUND AND
                  CLEAN CONTAINER.
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
                        <TableCell
                          sx={{ width: '30%' }}
                          className='border-none'
                        >
                          VESSEL & VOY.NO. :{' '}
                          {selectedShipDec.vesselAndVoyNumber}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{ width: '30%' }}
                          className='border-none'
                        >
                          B/L No. : {selectedShipDec.blNumber}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{ width: '30%' }}
                          className='border-none'
                        >
                          DATED : {selectedShipDec.date}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{ width: '30%' }}
                          className='border-none'
                        >
                          NUMBER OF BAGS :{' '}
                          {selectedShipDec.noOfBags
                            .split(',')
                            .reduce(
                              (a, b) => parseInt(a) + parseInt(b),
                              0
                            )}{' '}
                          JUTE BAGS WITH INNER GRIAN - PRO
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
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
                      {selectedShipDec.containerNumbers
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
                                    selectedShipDec.sealNumbers.split(',')[
                                      index
                                    ]
                                  }
                                </strong>
                              </TableCell>
                              <TableCell>
                                <strong>
                                  {selectedShipDec.noOfBags.split(',')[index]}
                                </strong>
                              </TableCell>
                              <TableCell>
                                <strong>
                                  {
                                    selectedShipDec.grossWeights.split(',')[
                                      index
                                    ]
                                  }
                                </strong>
                              </TableCell>
                              <TableCell>
                                <strong>
                                  {selectedShipDec.netWeights.split(',')[index]}
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
                            {selectedShipDec.noOfBags
                              .split(',')
                              .reduce((a, b) => parseInt(a) + parseInt(b), 0)}
                          </strong>
                        </TableCell>
                        <TableCell>
                          <strong>
                            {selectedShipDec.netWeights
                              .split(',')
                              .reduce((a, b) => parseInt(a) + parseInt(b), 0)}
                          </strong>
                        </TableCell>
                        <TableCell>
                          <strong>
                            {selectedShipDec.grossWeights
                              .split(',')
                              .reduce((a, b) => parseInt(a) + parseInt(b), 0)}
                          </strong>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <p className='h5 font-bold text-right mt-28'>
                  ____________________
                </p>
                <p className='h5 font-bold text-right mb-20'>Signature</p>
                <Grid className='mt-96 pt-20'>
                  <Grid className='title-container w-full text-center'>
                    <p className='h3 text-left text-black'>Original</p>
                    <p className='h3 font-bold underline text-center text-black'>
                      Shipping Decleration
                    </p>
                  </Grid>
                  <p className='text-left text-black'>
                    WE HERE BY ATTESTING THAT ETHIOPIA{' '}
                    {selectedShipDec.product.toUpperCase()} HAD BEEN MARKED WITH
                    USUAL IDENTIFICATION US FOLLOWS
                  </p>
                  <div className='border-2 border-black w-2/3 p-8 mx-auto mt-10 flex flex-col justify-center items-center'>
                    <p className='h6 font-bold text-center underline'>
                      One Side
                    </p>
                    <p className='text-xs font-bold text-center my-2'>
                      {selectedShipDec.shipper.toUpperCase()}
                    </p>
                    <p className='text-xs font-bold text-center my-2'>
                      PRODUCE OF ETHIOPIA
                    </p>
                    <p className='text-xs font-bold text-center my-2'>
                      ICO {selectedShipDec.icoNo}
                    </p>
                    <p className='text-xs font-bold text-center my-2'>
                      {selectedShipDec.product.toUpperCase()}
                    </p>
                    <p className='text-xs font-bold text-center my-2'>
                      CERT NO. {selectedShipDec.certNo}
                    </p>
                    <p className='h6 text-xs font-bold text-center underline my-1'>
                      The Other Side
                    </p>
                    <p className='text-xs font-bold text-center my-2'>
                      {selectedShipDec.reciever.toUpperCase()} - PRODUCE OF
                      ETHIOPIA - {selectedShipDec.product.toUpperCase()}
                    </p>
                    <p className='text-xs font-bold text-center mt-2'>
                      DESTINATION - {selectedShipDec.destination.toUpperCase()}
                    </p>
                  </div>
                  <Table
                    size='small'
                    sx={{
                      [`& .${tableCellClasses.root}`]: {
                        borderBottom: 'none',
                      },
                      marginTop: 8,
                    }}
                    className='shadow-none'
                  >
                    <TableBody sx={{ width: '100%' }}>
                      <TableRow>
                        <TableCell
                          sx={{ width: '30%' }}
                          className='border-none'
                        >
                          VESSEL & VOY.NO. :{' '}
                          {selectedShipDec.osVesselAndVoyNumber}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{ width: '30%' }}
                          className='border-none'
                        >
                          B/L No. : {selectedShipDec.osBlNumber}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{ width: '30%' }}
                          className='border-none'
                        >
                          DATED : {selectedShipDec.osDate}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{ width: '30%' }}
                          className='border-none'
                        >
                          NUMBER OF BAGS :{' '}
                          {selectedShipDec.noOfBags
                            .split(',')
                            .reduce(
                              (a, b) => parseInt(a) + parseInt(b),
                              0
                            )}{' '}
                          JUTE BAGS WITH INNER GRIAN - PRO
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <p className='h5 font-bold text-right mt-24'>
                    ____________________
                  </p>
                  <p className='h5 font-bold text-right mb-20'>Signature</p>
                </Grid>
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

export default ShippingDeclerations;
