import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { NoteAdd } from '@mui/icons-material';
import { emptyErrors } from '../../actions/generalActions';
import { CustomNoRowsOverlay } from '../../components/noRowsOverlay';
import { toast, ToastContainer } from 'react-toastify';
import { getWarehouseList } from '../../actions/generalActions';

function WarehouseList() {
  const { isWarehouserAuthenticated } = useSelector((state) => state.auth);
  const { warehouseList, loading } = useSelector((state) => state.adminData);
  const errors = useSelector((state) => state.errors);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'date', headerName: 'Date', width: 130 },
    { field: 'export', headerName: 'Export (Kg)', width: 100 },
    { field: 'cGrade', headerName: 'C-Grade (Kg)', width: 130 },
    { field: 'color', headerName: 'Color sorting (Kg)', width: 130 },
    { field: 'gravity', headerName: 'Gravity (Kg)', width: 120 },
  ];
  useEffect(() => {
    if (!isWarehouserAuthenticated) {
      navigate('/');
    }
  }, [isWarehouserAuthenticated, navigate]);
  useEffect(() => {
    dispatch(getWarehouseList());
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
            <p className='h4 text-left'>List</p>
            <div>
              <Button
                startIcon={<NoteAdd />}
                variant='contained'
                onClick={() => navigate('/warehouse-new')}
              >
                Add new list
              </Button>
            </div>
          </div>
          <DataGrid
            className='bg-white p-4'
            rows={warehouseList}
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

export default WarehouseList;
