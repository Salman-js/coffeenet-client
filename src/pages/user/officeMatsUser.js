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
import { Add } from '@mui/icons-material';
import { Loader } from '../../components/admin/accountsList';
import { getOfficeMats } from '../../actions/generalActions';
import { addOfficeMat } from '../../actions/userActions';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { CustomNoRowsOverlay } from '../../components/noRowsOverlay';

function OfficeMatsUser() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { officematerials, loading, addDataLoading } = useSelector(
    (state) => state.adminData
  );
  const errors = useSelector((state) => state.errors);
  const [addMatModalOpen, setAddMatModalOpen] = useState(false);
  const [newMatName, setNewMatName] = useState('');
  const [newMatType, setNewMatType] = useState('');
  const [newMatPrice, setNewMatPrice] = useState(0);
  const [newMatDop, setNewMatDop] = useState('');
  const [newMatBuyer, setNewMatBuyer] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDopChange = (newValue) => {
    setNewMatDop(newValue);
  };
  function onAddNewfficeMat(e) {
    e.preventDefault();
    const newDate = `${newMatDop.getDate()}/${newMatDop.getMonth()}/${newMatDop.getFullYear()}`;
    const newMat = {
      type: newMatType,
      name: newMatName,
      dop: newDate,
      price: newMatPrice,
      buyer: newMatBuyer,
    };
    dispatch(addOfficeMat(newMat));
    if (!addDataLoading && !Object.keys(errors).length) {
      setNewMatName('');
      setNewMatType('');
      setNewMatPrice('');
      setNewMatBuyer('');
      setNewMatDop('');
      setAddMatModalOpen(false);
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
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);
  useEffect(() => {
    dispatch(getOfficeMats());
  }, []);
  return (
    <Grid container className='dashboard-container justify-around'>
      <Grid className='accounts-list-container w-full -mt-3'>
        <div className='w-full flex flex-row justify-between mb-2'>
          <p className='h4 text-left'>Office Materials</p>
          <div>
            <Button
              startIcon={<Add />}
              variant='contained'
              onClick={() => setAddMatModalOpen(true)}
            >
              Add Office Material
            </Button>
          </div>
        </div>
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
      <Modal
        open={addMatModalOpen}
        onClose={() => setAddMatModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide direction='down' in={addMatModalOpen}>
          <Grid className='modal-content-container'>
            <Grid className='modal-header w-full mb-4'>
              <p className='h5 text-left text-gray-600'>New Office Material</p>
            </Grid>
            <Grid className='modal-body w-full'>
              <form onSubmit={onAddNewfficeMat}>
                <Grid container className='w-full' spacing={2}>
                  <Grid item lg={12}>
                    <TextField
                      className='w-full'
                      type='text'
                      value={newMatName}
                      autoComplete='false'
                      onChange={(e) => setNewMatName(e.target.value)}
                      label='Name'
                    />
                  </Grid>
                  <Grid item lg={12}>
                    <TextField
                      className='w-full'
                      type='text'
                      value={newMatType}
                      autoComplete='false'
                      onChange={(e) => setNewMatType(e.target.value)}
                      label='Type'
                    />
                  </Grid>
                  <Grid item lg={12}>
                    <TextField
                      className='w-full'
                      type='number'
                      value={newMatPrice}
                      autoComplete='false'
                      onChange={(e) => setNewMatPrice(e.target.value)}
                      label='Price'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>Br.</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item lg={12}>
                    <TextField
                      className='w-full'
                      type='text'
                      value={newMatBuyer}
                      autoComplete='false'
                      onChange={(e) => setNewMatBuyer(e.target.value)}
                      label='Buyer'
                    />
                  </Grid>
                  <Grid item lg={12}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DesktopDatePicker
                        className='w-full'
                        label='Date of Purchase'
                        inputFormat='dd/MM/yyyy'
                        value={newMatDop}
                        onChange={handleDopChange}
                        renderInput={(params) => (
                          <TextField {...params} className='w-full' />
                        )}
                      />
                    </LocalizationProvider>
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
                        !newMatName.trim().length ||
                        !newMatType.trim().length ||
                        !newMatDop ||
                        !newMatBuyer.trim().length ||
                        !newMatPrice.trim().length
                      }
                    >
                      Add Office Material
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

export default OfficeMatsUser;
