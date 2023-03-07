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
import { emptyErrors, getWaybills } from '../../../actions/generalActions';
import { CustomNoRowsOverlay } from '../../../components/noRowsOverlay';
import ReactToPrint from 'react-to-print';
import { toast, ToastContainer } from 'react-toastify';
import { fabStyle } from '../../admin/cuppingAdmin';

function WayBills() {
  const { isDocmanagerAuthenticated } = useSelector((state) => state.auth);
  const { wayBills, loading } = useSelector((state) => state.adminData);
  const errors = useSelector((state) => state.errors);
  const [selectedWayBill, setSelectedWayBill] = useState(null);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const toBePrinted = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function onPrint(selectedRow) {
    selectedRow.containerNumbers = selectedRow.containerNumbers.split(',');
    selectedRow.wagonNumbers = selectedRow.wagonNumbers.split(',');
    selectedRow.sealNumbers = selectedRow.sealNumbers.split(',');
    setSelectedWayBill(selectedRow);
    setInvoiceModalOpen(true);
  }
  function onEdit(selectedRow) {
    navigate(`/update-wb/${selectedRow.id}`);
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'product', headerName: 'Product', width: 200 },
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
    dispatch(getWaybills());
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
            <p className='h4 text-left'>Way bills</p>
            <div>
              <Button
                startIcon={<NoteAdd />}
                variant='contained'
                onClick={() => navigate('/new-way-bill')}
              >
                Add Way bill
              </Button>
            </div>
          </div>
          <DataGrid
            className='bg-white p-4'
            rows={wayBills}
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
            style={{ marginLeft: '40%' }}
          >
            {selectedWayBill ? (
              <Grid
                className='invoice-layout-container w-full px-6 mx-auto bg-white overflow-hidden'
                ref={toBePrinted}
              >
                <Grid className='title-container w-full text-center mb-6 mt-10'>
                  <p className='h3 font-bold underline text-center text-black'>
                    Way Bill
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
                        <TableCell
                          sx={{ width: '100%' }}
                          className='border-none'
                        >
                          Name of CONSIGNEE:
                          <strong className='underline'>
                            {selectedWayBill.consigne}
                          </strong>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '100%' }}>
                          {selectedWayBill.transportType}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <p className='h5 text-center underline font-bold'>
                    Details of Goods
                  </p>
                  <p className='h5 text-left'>
                    Product:{' '}
                    <strong className='font-bold underline'>
                      {selectedWayBill.product}
                    </strong>
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
                      <TableCell>Container No</TableCell>
                      <TableCell>Seal No</TableCell>
                      <TableCell>Wagons No</TableCell>
                    </TableRow>
                    <TableBody>
                      {selectedWayBill.containerNumbers.map(
                        (container, index) => {
                          return (
                            <TableRow>
                              <TableCell>
                                <strong>{container}</strong>
                              </TableCell>
                              <TableCell>
                                <strong>
                                  {selectedWayBill.sealNumbers[index]}
                                </strong>
                              </TableCell>
                              <TableCell>
                                <strong>
                                  {selectedWayBill.wagonNumbers[index]}
                                </strong>
                              </TableCell>
                            </TableRow>
                          );
                        }
                      )}
                    </TableBody>
                  </Table>
                  <p className='h5 text-center font-bold mt-20'>
                    _______________________
                  </p>
                  <p className='h5 text-center font-bold'>
                    COFFEENET TRADING PLC
                  </p>
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

export default WayBills;
