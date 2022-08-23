import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Button,
  Modal,
  Backdrop,
  Slide,
  TextField,
  InputAdornment,
  LinearProgress,
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { LoadingButton } from '@mui/lab';
import { Add, MonetizationOn } from '@mui/icons-material';
import { getMyPcrs } from '../../actions/generalActions';
import { sendPcr } from '../../actions/userActions';
import { CustomNoRowsOverlay } from '../../components/noRowsOverlay';

function PcrUser() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { pcrs, loading, addDataLoading } = useSelector(
    (state) => state.adminData
  );
  const errors = useSelector((state) => state.errors);
  const [sendPcrModalOpen, setSendPcrModalOpen] = useState(false);
  const [pcrReason, setPcrReason] = useState('');
  const [pcrAmount, setPcrAmount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function onSendPcr(e) {
    e.preventDefault();
    const newDate = new Date();
    const date = `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}`;
    const newPcr = {
      userId: user.id,
      fname: user.fname,
      lname: user.lname,
      reason: pcrReason,
      amount: pcrAmount,
      date: date,
    };
    dispatch(sendPcr(newPcr));
    if (!addDataLoading && !Object.keys(errors).length) {
      setPcrReason('');
      setPcrAmount('');
      setSendPcrModalOpen(false);
    }
  }
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
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);
  useEffect(() => {
    const Id = {
      id: user.id,
    };
    dispatch(getMyPcrs(Id));
  }, []);
  return (
    <Grid container className='dashboard-container justify-around'>
      <Grid className='accounts-list-container w-full -mt-3'>
        <div className='w-full flex flex-row justify-between mb-2'>
          <p className='h4 text-left'>Petty Cash Requests</p>
          <div>
            <Button
              startIcon={<MonetizationOn />}
              variant='contained'
              onClick={() => setSendPcrModalOpen(true)}
            >
              Send Request
            </Button>
          </div>
        </div>
        <DataGrid
          className='bg-white p-4'
          rows={pcrs}
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
      <Modal
        open={sendPcrModalOpen}
        onClose={() => setSendPcrModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide direction='down' in={sendPcrModalOpen}>
          <Grid className='modal-content-container'>
            <Grid className='modal-header w-full mb-4'>
              <p className='h5 text-left text-gray-600'>
                New Petty Cash Request
              </p>
            </Grid>
            <Grid className='modal-body w-full flex flex-col'>
              <form onSubmit={onSendPcr}>
                <Grid container className='w-full' spacing={2}>
                  <Grid item lg={12}>
                    <TextField
                      className='w-full'
                      type='text'
                      value={pcrReason}
                      autoComplete='false'
                      onChange={(e) => setPcrReason(e.target.value)}
                      label='Reason'
                    />
                  </Grid>
                  <Grid item lg={12}>
                    <TextField
                      className='w-full'
                      type='number'
                      value={pcrAmount}
                      autoComplete='false'
                      onChange={(e) => setPcrAmount(e.target.value)}
                      label='Price'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>Br.</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item lg={12}>
                    <LoadingButton
                      type='submit'
                      className='w-full'
                      loading={addDataLoading}
                      loadingPosition='start'
                      startIcon={<Add />}
                      sx={{
                        backgroundColor: '#7794d6',
                        color: 'white',
                      }}
                      variant='contained'
                      disabled={!pcrReason.trim().length || !pcrAmount}
                    >
                      Send Request
                    </LoadingButton>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Slide>
      </Modal>
    </Grid>
  );
}

export default PcrUser;
