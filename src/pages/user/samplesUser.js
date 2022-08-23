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
  LinearProgress,
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { LoadingButton } from '@mui/lab';
import { Add, NoteAdd } from '@mui/icons-material';
import { Loader } from '../../components/admin/accountsList';
import { getSamples } from '../../actions/generalActions';
import { addSample } from '../../actions/userActions';
import { CustomNoRowsOverlay } from '../../components/noRowsOverlay';

function SamplesUser() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { samples, loading, addDataLoading } = useSelector(
    (state) => state.adminData
  );
  const errors = useSelector((state) => state.errors);
  const [addSampleModalOpen, setAddSampleModalOpen] = useState(false);
  const [newSampleName, setNewSampleName] = useState('');
  const [newSampleType, setNewSampleType] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function onAddSample(e) {
    e.preventDefault();
    const userName = user.fname + ' ' + user.lname;
    const Day = new Date();
    const newDate = `${Day.getDate()}/${Day.getMonth()}/${Day.getFullYear()}`;
    const newSample = {
      name: newSampleName,
      username: userName,
      type: newSampleType,
      date: newDate,
    };
    dispatch(addSample(newSample));
    if (!addDataLoading && !Object.keys(errors).length) {
      setNewSampleName('');
      setNewSampleType('');
      setAddSampleModalOpen(false);
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
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 100,
      //   valueGetter: (params) =>
      //     params.row.type === 'users'
      //       ? 'User'
      //       : params.row.type === 'financers'
      //       ? 'Finance Officer'
      //       : 'Admin',
    },
  ];
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);
  useEffect(() => {
    dispatch(getSamples());
  }, []);
  return (
    <Grid container className='dashboard-container justify-around'>
      <Grid className='accounts-list-container w-full -mt-3'>
        <div className='w-full flex flex-row justify-between mb-2'>
          <p className='h4 text-left'>Samples</p>
          <div>
            <Button
              startIcon={<NoteAdd />}
              variant='contained'
              onClick={() => setAddSampleModalOpen(true)}
            >
              Add Sample
            </Button>
          </div>
        </div>
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
      <Modal
        open={addSampleModalOpen}
        onClose={() => setAddSampleModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide direction='down' in={addSampleModalOpen}>
          <Grid className='modal-content-container'>
            <Grid className='modal-header w-full mb-4'>
              <p className='h5 text-left text-gray-600'>New Sample</p>
            </Grid>
            <Grid className='modal-body w-full'>
              <form onSubmit={onAddSample}>
                <Grid container className='w-full' spacing={2}>
                  <Grid item lg={12}>
                    <TextField
                      className='w-full'
                      type='text'
                      value={newSampleName}
                      autoComplete='false'
                      onChange={(e) => setNewSampleName(e.target.value)}
                      label='Name'
                    />
                  </Grid>
                  <Grid item lg={12}>
                    <TextField
                      className='w-full'
                      type='text'
                      value={newSampleType}
                      autoComplete='false'
                      onChange={(e) => setNewSampleType(e.target.value)}
                      label='Type'
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
                      disabled={
                        !newSampleName.trim().length ||
                        !newSampleType.trim().length
                      }
                    >
                      Add Sample
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

export default SamplesUser;
