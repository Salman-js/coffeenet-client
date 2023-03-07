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
import { emptyErrors, getPackings } from '../../../actions/generalActions';
import { CustomNoRowsOverlay } from '../../../components/noRowsOverlay';
import ReactToPrint from 'react-to-print';
import { toast, ToastContainer } from 'react-toastify';
import { fabStyle } from '../../admin/cuppingAdmin';

function PackingLists() {
  const { isDocmanagerAuthenticated } = useSelector((state) => state.auth);
  const { packingLists, loading } = useSelector((state) => state.adminData);
  const errors = useSelector((state) => state.errors);
  const [selectedPackingList, setSelectedPackingList] = useState(null);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const toBePrinted = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function onPrint(selectedRow) {
    selectedRow.certNumbers = selectedRow.certNumbers.split(',');
    setSelectedPackingList(selectedRow);
    setInvoiceModalOpen(true);
  }
  function onEdit(selectedRow) {
    navigate(`/update-pl/${selectedRow.id}`);
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'type', headerName: 'Coffee Type', width: 200 },
    { field: 'reciever', headerName: 'For', width: 200 },
    { field: 'contractDate', headerName: 'Date', width: 130 },
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
    dispatch(getPackings());
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
            <p className='h4 text-left'>Packing Lists</p>
            <div>
              <Button
                startIcon={<NoteAdd />}
                variant='contained'
                onClick={() => navigate('/new-packing-list')}
              >
                Add Packing List
              </Button>
            </div>
          </div>
          <DataGrid
            className='bg-white p-4'
            rows={packingLists}
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
            style={{ marginLeft: '15%' }}
          >
            {selectedPackingList ? (
              <Grid
                className='invoice-layout-container w-4/5 mx-auto bg-white overflow-hidden'
                ref={toBePrinted}
              >
                <Grid className='title-container w-full text-center mb-6 mt-10'>
                  <p className='h3 font-bold underline text-center text-black'>
                    Packing List
                  </p>
                </Grid>
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
                        <TableCell sx={{ width: '100%' }}>
                          <strong>Buyer: </strong>
                          {selectedPackingList.buyer}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Table
                    size='small'
                    sx={{
                      [`& .${tableCellClasses.root}`]: {
                        borderBottom: 'none',
                        borderRight: '1px solid gray',
                        borderLeft: '1px solid gray',
                      },
                    }}
                  >
                    <TableRow className='border border-black'>
                      <TableCell className='max-w-xs w-48'>
                        <strong>Marks and Numbers</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Description of Goods</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Quantity</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Net Weight(Kg)</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Gross Weight(Kg)</strong>
                      </TableCell>
                    </TableRow>
                    <TableBody>
                      <TableRow>
                        <TableCell>{selectedPackingList.type}</TableCell>
                        <TableCell>{selectedPackingList.description}</TableCell>
                        <TableCell rowSpan={5}>
                          {selectedPackingList.quantity}
                        </TableCell>
                        <TableCell>
                          {selectedPackingList.netWeight} KGs
                        </TableCell>
                        <TableCell>
                          {selectedPackingList.grossWeight} KGs
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>ICO #: </strong>
                          {selectedPackingList.icoNumber}
                        </TableCell>
                        <TableCell>
                          {selectedPackingList.noOfBags} Bags of{' '}
                          {selectedPackingList.bagWeight}Kgs Net each bag
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          rowSpan={selectedPackingList.certNumbers.length - 1}
                        >
                          {selectedPackingList.certNumbers.map((cert) => {
                            return (
                              <p>
                                <strong>CERT #: </strong>
                                {cert}
                              </p>
                            );
                          })}
                        </TableCell>
                        <TableCell>{selectedPackingList.container}</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className='min-w-fit'>
                          <p>
                            <strong>NET WEIGHT: </strong>
                            {selectedPackingList.mnNetWeight} KGs
                          </p>
                        </TableCell>
                        <TableCell>
                          As per confirmation of contract number:{' '}
                          {selectedPackingList.contractNumber}
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <p>
                            <strong>Crop: </strong>
                            {selectedPackingList.crop}
                          </p>
                        </TableCell>
                        <TableCell>
                          <p>{selectedPackingList.contractDate}</p>
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow className='border-b border-black'>
                        <TableCell>
                          <p>
                            <strong>Dest: </strong>
                            {selectedPackingList.destination} KGs
                          </p>
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
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
                          <strong>Total Gross Weight: </strong>
                          {selectedPackingList.grossWeight}KGs
                        </TableCell>
                        <TableCell>
                          <strong>Total Net Weight: </strong>
                          {selectedPackingList.netWeight}KGs
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Packing in pack of: </strong>
                          {selectedPackingList.bagWeight}Kgs
                        </TableCell>
                        <TableCell>
                          <strong>Total Number of bags: </strong>
                          {selectedPackingList.noOfBags}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Mean of Transport: </strong>
                          {selectedPackingList.transportation}
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Port of Destination: </strong>
                          {selectedPackingList.destination}
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell sx={{ textAlign: 'right' }}>
                          <strong>For: </strong>
                          {selectedPackingList.reciever}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
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

export default PackingLists;
