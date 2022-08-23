import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getSamples } from '../../actions/generalActions';
import { CustomNoRowsOverlay } from '../../components/noRowsOverlay';

function SamplesAdmin() {
  const { isAdminAuthenticated } = useSelector((state) => state.auth);
  const { samples, loading } = useSelector((state) => state.adminData);
  const errors = useSelector((state) => state.errors);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const columns = [
    {
      field: 'number',
      headerName: '#',
      width: 70,
      valueGetter: (params) => params.api.getRowIndex() * -1,
    },
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'username', headerName: 'User Name', width: 200 },
    {
      field: 'type',
      headerName: 'Type',
      width: 100,
    },
    {
      field: 'date',
      headerName: 'date',
      sortable: false,
      width: 100,
    },
  ];
  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/');
    }
  }, [isAdminAuthenticated]);
  useEffect(() => {
    dispatch(getSamples());
  }, []);
  useEffect(() => {
    if (Object.keys(errors).length) {
    }
  }, [errors]);
  return (
    <Grid container className='dashboard-container justify-around'>
      <Grid className='accounts-list-container w-full -mt-3'>
        <p className='h4 text-left'>Samples</p>
        <DataGrid
          className='bg-white p-4'
          rows={samples}
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
  );
}

export default SamplesAdmin;
