import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getOfficeMats } from '../../actions/generalActions';
import { CustomNoRowsOverlay } from '../../components/noRowsOverlay';

function OfficeMatsAdmin() {
  const { isAdminAuthenticated } = useSelector((state) => state.auth);
  const { officematerials, loading } = useSelector((state) => state.adminData);
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
      field: 'type',
      headerName: 'Type',
      width: 100,
    },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'dateofpurchase', headerName: 'Date of Purchase', width: 200 },
    {
      field: 'buyer',
      headerName: 'Buyer',
      sortable: false,
      width: 200,
    },
  ];
  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/');
    }
  }, [isAdminAuthenticated]);
  useEffect(() => {
    dispatch(getOfficeMats());
  }, []);
  useEffect(() => {
    if (Object.keys(errors).length) {
    }
  }, [errors]);
  return (
    <Grid container className='dashboard-container justify-around'>
      <Grid className='accounts-list-container w-full -mt-3'>
        <p className='h4 text-left'>Office Materials</p>
        <DataGrid
          className='bg-white p-4'
          rows={officematerials}
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

export default OfficeMatsAdmin;
