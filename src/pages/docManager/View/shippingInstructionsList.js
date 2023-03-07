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
import { emptyErrors, getShippings } from '../../../actions/generalActions';
import { CustomNoRowsOverlay } from '../../../components/noRowsOverlay';
import ReactToPrint from 'react-to-print';
import { toast, ToastContainer } from 'react-toastify';
import { fabStyle } from '../../admin/cuppingAdmin';

function ShippingInstructionsList() {
  const { isDocmanagerAuthenticated } = useSelector((state) => state.auth);
  const { shippingInstructions, loading } = useSelector(
    (state) => state.adminData
  );
  const errors = useSelector((state) => state.errors);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const toBePrinted = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function onPrint(selectedRow) {
    selectedRow.certNumbers = selectedRow.certNumbers.split(',');
    setSelectedShipment(selectedRow);
    setInvoiceModalOpen(true);
  }
  function onEdit(selectedRow) {
    navigate(`/update-si/${selectedRow.id}`);
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Coffee Type', width: 200 },
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
    dispatch(getShippings());
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
            <p className='h4 text-left'>Shipping Instructions</p>
            <div>
              <Button
                startIcon={<NoteAdd />}
                variant='contained'
                onClick={() => navigate('/new-shipping')}
              >
                Add Shipping Instruction
              </Button>
            </div>
          </div>
          <DataGrid
            className='bg-white p-4'
            rows={shippingInstructions}
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
            style={{ marginLeft: '20%' }}
          >
            {selectedShipment ? (
              <Grid
                className='invoice-layout-container w-4/5 mx-auto bg-white overflow-hidden'
                ref={toBePrinted}
              >
                <Grid className='title-container w-full text-center mb-6 mt-10'>
                  <p className='h3 font-bold underline text-center text-black'>
                    Shipment Instruction
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
                          <strong>Name: </strong>
                          COFFEENET TRADING PLC
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '100%' }}>
                          <strong>TEL: </strong>
                          +251913128964
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '100%' }}>
                          <strong>EMAIL: </strong>
                          coffeenet@gmail.com
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '100%' }}>
                          <strong>PO BOX: </strong>
                          N/A
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '100%' }}>
                          <strong>CITY, COUNTRY: </strong>
                          Addis Ababa, Ethiopia
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '100%' }}>
                          <strong>CONSIGNEE: </strong>
                          {selectedShipment.consigne}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '100%' }}>
                          <strong>NOFIFY PARTY: </strong>
                          {selectedShipment.notifParty}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '100%' }}>
                          <strong>ADDRESS: </strong>
                          {selectedShipment.address}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '100%' }}>
                          <strong>SHIPMENT: </strong>
                          {selectedShipment.shipment}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '100%' }}>
                          <strong>PORT OF LOADING: </strong>
                          {selectedShipment.portOfLoad}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '100%' }}>
                          <strong>PORT OF DISCHARGE: </strong>
                          {selectedShipment.portOfDischarge}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '100%' }}>
                          {selectedShipment.shippingLine}
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
                      },
                    }}
                  >
                    <TableRow className='border border-black'>
                      <TableCell className='max-w-xs w-48'>
                        <strong>Marks and Numbers</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Package</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Description of Packages and Goods</strong>
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
                        <TableCell>{selectedShipment.name}</TableCell>
                        <TableCell>{selectedShipment.noOfBags} Bags</TableCell>
                        <TableCell>{selectedShipment.description}</TableCell>
                        <TableCell>{selectedShipment.netWeight} KGs</TableCell>
                        <TableCell>
                          {selectedShipment.grossWeight} KGs
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        {selectedShipment.certNumbers.map((cert) => {
                          return (
                            <>
                              <TableCell>
                                <p>
                                  <strong>CERT #: </strong>
                                  {cert}
                                </p>
                              </TableCell>
                              <TableCell></TableCell>
                              <TableCell>
                                <p>
                                  <strong>CERT #: </strong>
                                  {cert}
                                </p>
                              </TableCell>
                            </>
                          );
                        })}
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className='min-w-fit'>
                          <p>
                            <strong>NET WEIGHT: </strong>
                            {selectedShipment.mnNetWeight} KGs
                          </p>
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell>
                          <p>
                            <strong>ICO #: </strong>
                            {selectedShipment.icoNumber}Kg
                          </p>
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <p>
                            <strong>Destination: </strong>
                            {selectedShipment.destination}
                          </p>
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell>
                          <p>
                            <strong>HS CODE: </strong>
                            {selectedShipment.hsCode}
                          </p>
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell>
                          <p>
                            <strong>Net Weight: </strong>
                            {selectedShipment.descNetWeight} KGs
                          </p>
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell>
                          <p>
                            <strong>Packing: </strong>
                            {selectedShipment.packing}
                          </p>
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableBody>
                    <TableRow className='border border-black'>
                      <TableCell colSpan={2}></TableCell>
                      <TableCell>
                        <strong>{selectedShipment.transportation}</strong>
                      </TableCell>
                      <TableCell colSpan={2}>
                        <p>
                          <strong>Total Net Weight: </strong>
                          {selectedShipment.descNetWeight} KGs
                        </p>
                      </TableCell>
                    </TableRow>
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

export default ShippingInstructionsList;
