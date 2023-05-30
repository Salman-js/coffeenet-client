import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { NoteAdd } from '@mui/icons-material';
import {
  emptyErrors,
  getInventoryEntries,
} from '../../../actions/generalActions';
import { CustomNoRowsOverlay } from '../../../components/noRowsOverlay';
import { toast, ToastContainer } from 'react-toastify';

function InventoryList() {
  const { isFinancerAuthenticated } = useSelector((state) => state.auth);
  const { inventoryEntries, loading } = useSelector((state) => state.adminData);
  const errors = useSelector((state) => state.errors);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'date', headerName: 'Date', width: 130 },
    { field: 'sellerName', headerName: 'Seller', width: 100 },
    { field: 'coffeeType', headerName: 'Coffee Type', width: 130 },
    { field: 'totalPrice', headerName: 'Total Price', width: 130 },
  ];
  useEffect(() => {
    if (!isFinancerAuthenticated) {
      navigate('/');
    }
  }, [isFinancerAuthenticated, navigate]);
  useEffect(() => {
    dispatch(getInventoryEntries());
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
            <p className='h4 text-left'>Inventory Entries</p>
            <div>
              <Button
                startIcon={<NoteAdd />}
                variant='contained'
                onClick={() => navigate('/new-inventory')}
              >
                Add new entry
              </Button>
            </div>
          </div>
          <DataGrid
            className='bg-white p-4'
            rows={inventoryEntries}
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
      <ToastContainer />
    </>
  );
}

export default InventoryList;
