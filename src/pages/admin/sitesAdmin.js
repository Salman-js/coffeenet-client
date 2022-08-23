import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getSites } from '../../actions/generalActions';

import parse from 'html-react-parser';
import { CustomNoRowsOverlay } from '../../components/noRowsOverlay';

function SitesAdmin() {
  const { isAdminAuthenticated } = useSelector((state) => state.auth);
  const { sites, loading } = useSelector((state) => state.adminData);
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
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
    },
    { field: 'location', headerName: 'Location', width: 200 },
    { field: 'price', headerName: 'Price', width: 130 },
    {
      field: 'map',
      headerName: 'Map',
      width: 300,
      renderCell: (params) => {
        return (
          <div className='w-full h-full m-auto'>{parse(params.row.map)}</div>
        );
      },
    },
  ];
  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/');
    }
  }, [isAdminAuthenticated]);
  useEffect(() => {
    dispatch(getSites());
  }, []);
  useEffect(() => {
    if (Object.keys(errors).length) {
    }
  }, [errors]);
  return (
    <Grid container className='dashboard-container justify-around'>
      <Grid className='accounts-list-container w-full -mt-3'>
        <p className='h4 text-left'>Sites</p>
        <DataGrid
          rowHeight={200}
          className='bg-white p-4'
          rows={sites}
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

export default SitesAdmin;
