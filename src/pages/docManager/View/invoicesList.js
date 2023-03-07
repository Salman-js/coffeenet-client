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
import { emptyErrors, getInvoices } from '../../../actions/generalActions';
import { CustomNoRowsOverlay } from '../../../components/noRowsOverlay';
import ReactToPrint from 'react-to-print';
import { toast, ToastContainer } from 'react-toastify';
import { fabStyle } from '../../admin/cuppingAdmin';
import { ToWords } from 'to-words';

function InvoicesList() {
  const { isDocmanagerAuthenticated } = useSelector((state) => state.auth);
  const { invoices, loading } = useSelector((state) => state.adminData);
  const errors = useSelector((state) => state.errors);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const toBePrinted = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toWords = new ToWords({
    localeCode: 'en-IN',
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
      currencyOptions: {
        name: 'Dollar',
        plural: 'Dollars',
        symbol: '$',
        fractionalUnit: {
          name: 'Cent',
          plural: 'Cents',
          symbol: '',
        },
      },
    },
  });
  function onPrint(selectedRow) {
    console.log(selectedRow);
    setSelectedInvoice(selectedRow);
    setInvoiceModalOpen(true);
    // const Day = new Date();
    // const newDate = `${Day.getDate()}/${Day.getMonth()}/${Day.getFullYear()}`;
  }
  function onEdit(selectedRow) {
    navigate(`/update-inv/${selectedRow.id}`);
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'reciever', headerName: 'To', width: 200 },
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
    dispatch(getInvoices());
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
            <p className='h4 text-left'>Invoices</p>
            <div>
              <Button
                startIcon={<NoteAdd />}
                variant='contained'
                onClick={() => navigate('/new-invoice')}
              >
                Add Invoice
              </Button>
            </div>
          </div>
          <DataGrid
            className='bg-white p-4'
            rows={invoices}
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
            style={{ marginLeft: '5%' }}
          >
            {selectedInvoice ? (
              <Grid
                className='invoice-layout-container w-4/5 mx-auto bg-white overflow-hidden'
                ref={toBePrinted}
              >
                <Grid className='title-container w-full text-center mb-2'>
                  <p className='h3 font-bold underline text-center text-black'>
                    Commercial Invoice
                  </p>
                </Grid>
                <TableContainer
                  component={Paper}
                  sx={{
                    height: '80%',
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
                          <strong>To: </strong>
                          {selectedInvoice.reciever}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '100%' }}>
                          <strong>Port: </strong>
                          {selectedInvoice.port}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '100%' }}>
                          <strong>Terms: </strong>
                          {selectedInvoice.terms}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '100%' }}>
                          <strong>Destination: </strong>
                          {selectedInvoice.dest}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '100%' }}>
                          <strong>Number of Bags: </strong>
                          {selectedInvoice.noOfBags}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '100%' }}>
                          <strong>INCOTERMS: </strong>
                          {selectedInvoice.incoTerms}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '100%', textAlign: 'right' }}>
                          <strong>Exporter Bank Details</strong>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '100%', textAlign: 'right' }}>
                          <strong>Beneficiary Bank: </strong>
                          {selectedInvoice.benBank}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '100%', textAlign: 'right' }}>
                          <strong>Swift Code: </strong>
                          {selectedInvoice.swiftCode}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '100%', textAlign: 'right' }}>
                          <strong>Correspondant Bank: </strong>
                          {selectedInvoice.corBank}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '100%', textAlign: 'right' }}>
                          <strong>Beneficiary Name: </strong>
                          {selectedInvoice.benName}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '100%', textAlign: 'right' }}>
                          <strong>Account Number: </strong>
                          {selectedInvoice.accNo}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '100%', textAlign: 'right' }}>
                          {selectedInvoice.address}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '100%' }}>
                          <p className='w-50 break-words'>
                            <strong>Packing: </strong>
                            {selectedInvoice.packing}
                          </p>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '100%' }}>
                          <strong>Country of Origin: </strong>
                          {selectedInvoice.coo}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '100%' }}>
                          <strong>CONSIGNEE: </strong>
                          {selectedInvoice.consigne}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '100%' }}>
                          <strong>Exporter: </strong>
                          {selectedInvoice.exporter}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '100%' }}>
                          <strong>Contract Number: </strong>
                          {selectedInvoice.contractNo}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '100%' }}>
                          <strong>Contract Date: </strong>
                          {selectedInvoice.contractDate}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Table size='small'>
                    <TableRow>
                      <TableCell sx={{ width: 300 }}>
                        <strong>Packing Mark</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Description of Goods</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Gross Weight(Kg)</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Net Weight(Kg)</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Unit Price (USD/lb)</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Total Price (USD)</strong>
                      </TableCell>
                    </TableRow>
                    <TableBody>
                      <TableRow>
                        <TableCell>{selectedInvoice.pmName}</TableCell>
                        <TableCell>{selectedInvoice.description}</TableCell>
                        <TableCell>{selectedInvoice.grossWeight}</TableCell>
                        <TableCell>{selectedInvoice.netWeight}</TableCell>
                        <TableCell>{selectedInvoice.unitPrice}</TableCell>
                        <TableCell>{selectedInvoice.totalPrice}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <p>
                            <strong>ICO#: </strong>
                            {selectedInvoice.pmICO}
                          </p>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <p>
                            <strong>CERT#: </strong>
                            {selectedInvoice.pmCert}
                          </p>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <p>
                            <strong>Net Weight: </strong>
                            {selectedInvoice.pmNetWeight}
                          </p>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <p>
                            <strong>CROP: </strong>
                            {selectedInvoice.pmCrop}
                          </p>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <p>
                            <strong>DEST: </strong>
                            {selectedInvoice.pmDest}
                          </p>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Table size='small'>
                    <TableRow>
                      <TableCell>
                        <p className='break-words'>
                          {toWords
                            .convert(selectedInvoice.totalPrice)
                            .toUpperCase()}
                          . WE CERTIFY THAT THE CONSIGNMENT IS OF ETHIOPIAN
                          ORIGIN AND THIS INVOICE IS TRUE AND CORRECT.
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

export default InvoicesList;
