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
import { Close, NoteAdd, Print } from '@mui/icons-material';
import { BootstrapTooltip } from '../../../components/admin/accountsList';
import { emptyErrors, getCerts } from '../../../actions/generalActions';
import { CustomNoRowsOverlay } from '../../../components/noRowsOverlay';
import ReactToPrint from 'react-to-print';
import { toast, ToastContainer } from 'react-toastify';
import { fabStyle } from '../../admin/cuppingAdmin';

function InlandTransportCertificates() {
  const { isDocmanagerAuthenticated } = useSelector((state) => state.auth);
  const { certificates, loading } = useSelector((state) => state.adminData);
  const errors = useSelector((state) => state.errors);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const toBePrinted = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function onPrint(selectedRow) {
    setSelectedCertificate(selectedRow);
    setInvoiceModalOpen(true);
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'shipper', headerName: 'Shipper', width: 200 },
    { field: 'blDate', headerName: 'BL Date', width: 200 },
    { field: 'notifParty', headerName: 'Notify Party', width: 130 },
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
  ];
  useEffect(() => {
    if (!isDocmanagerAuthenticated) {
      navigate('/');
    }
  }, [isDocmanagerAuthenticated, navigate]);
  useEffect(() => {
    dispatch(getCerts());
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
            <p className='h4 text-left'>Inland Transport Certificates</p>
            <div>
              <Button
                startIcon={<NoteAdd />}
                variant='contained'
                onClick={() => navigate('/new-cert')}
              >
                New Certificate
              </Button>
            </div>
          </div>
          <DataGrid
            className='bg-white p-4'
            rows={certificates}
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
            {selectedCertificate ? (
              <Grid
                className='invoice-layout-container w-4/5 mx-auto bg-white overflow-hidden'
                ref={toBePrinted}
              >
                <Grid className='title-container w-full text-center mb-6 mt-10'>
                  <p className='h3 font-bold underline text-center text-black'>
                    Inland Transport Certificate
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
                        <TableCell>
                          <strong>Shipper: </strong>
                        </TableCell>
                        <TableCell sx={{ textAlign: 'start' }}>
                          {selectedCertificate.shipper}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>TELL: </strong>
                        </TableCell>
                        <TableCell sx={{ textAlign: 'start' }}>
                          +251 913128964, ADDIS ABABA ETHIOPIA
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '25%' }}>
                          <strong>Notify Party: </strong>
                        </TableCell>
                        <TableCell sx={{ width: '75%' }}>
                          {selectedCertificate.notifParty}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Address: </strong>
                        </TableCell>
                        <TableCell sx={{ width: '100%' }}>
                          {selectedCertificate.npAddress}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Description of Goods: </strong>
                        </TableCell>
                        <TableCell sx={{ width: '100%' }}>
                          {selectedCertificate.description}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>BL No.: </strong>
                        </TableCell>
                        <TableCell sx={{ width: '100%' }}>
                          {selectedCertificate.blNumber}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>BL DATE: </strong>
                        </TableCell>
                        <TableCell sx={{ width: '100%' }}>
                          {selectedCertificate.blDate}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Vessel and Voy Number: </strong>
                        </TableCell>
                        <TableCell sx={{ width: '100%' }}>
                          {selectedCertificate.vesselAndVoyNumber}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Description of Goods: </strong>
                        </TableCell>
                        <TableCell sx={{ width: '100%' }}>
                          {selectedCertificate.description}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Port of Loading: </strong>
                        </TableCell>
                        <TableCell sx={{ width: '100%' }}>
                          {selectedCertificate.portOfLoading}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Port of Discharge: </strong>
                        </TableCell>
                        <TableCell sx={{ width: '100%' }}>
                          {selectedCertificate.portOfDischarge}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Quantity: </strong>
                        </TableCell>
                        <TableCell sx={{ width: '100%' }}>
                          {selectedCertificate.quantity}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Total Net Weight: </strong>
                        </TableCell>
                        <TableCell sx={{ width: '100%' }}>
                          {selectedCertificate.netWeight}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Total Gross Weight: </strong>
                        </TableCell>
                        <TableCell sx={{ width: '100%' }}>
                          {selectedCertificate.grossWeight}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Number of Bags: </strong>
                        </TableCell>
                        <TableCell sx={{ width: '100%' }}>
                          {selectedCertificate.noOfBags}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Packing: </strong>
                        </TableCell>
                        <TableCell sx={{ width: '100%' }}>
                          {selectedCertificate.packing}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <p className='h5 mt-4'>
                    WE CONFIRMED THAT THE GOODS HAVE BEEN TRANSPORTED FROM
                    ETHIOPIA TO{' '}
                    {selectedCertificate.portOfLoading.toUpperCase()} PORT
                    FAITHFULLY YOURS
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

export default InlandTransportCertificates;
