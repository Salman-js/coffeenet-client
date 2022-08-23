import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getPcrs } from '../../actions/adminActions';
import { CustomNoRowsOverlay } from '../../components/noRowsOverlay';

function ApprovedPcr() {
  const { isAdminAuthenticated } = useSelector((state) => state.auth);
  const { pcrs, loading } = useSelector((state) => state.adminData);
  let approvedPcrs = pcrs.filter((pcr) => pcr.status === 'Approved');
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
    { field: 'amount', headerName: 'Amount', width: 70 },
    {
      field: 'reason',
      headerName: 'Reason',
      width: 150,
    },
    { field: 'date', headerName: 'Date', width: 200 },
    { field: 'status', headerName: 'Status', width: 130 },
  ];
  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/');
    }
  }, [isAdminAuthenticated]);
  useEffect(() => {
    dispatch(getPcrs());
  }, []);
  useEffect(() => {
    if (Object.keys(errors).length) {
    }
  }, [errors]);
  return (
    <Grid container className='dashboard-container justify-around'>
      <Grid className='accounts-list-container w-full -mt-3'>
        <p className='h4 text-left'>Approved Cash Requests</p>
        <DataGrid
          className='bg-white p-4'
          rows={approvedPcrs}
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

export default ApprovedPcr;
