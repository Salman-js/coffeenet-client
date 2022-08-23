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
  IconButton,
  LinearProgress,
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { LoadingButton } from '@mui/lab';
import { Add, MapOutlined, OpenInNewOutlined } from '@mui/icons-material';
import { Loader } from '../../components/admin/accountsList';
import { getSites } from '../../actions/generalActions';
import { addSite } from '../../actions/userActions';

import parse from 'html-react-parser';
import { CustomNoRowsOverlay } from '../../components/noRowsOverlay';

function SitesUser() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { sites, loading, addDataLoading } = useSelector(
    (state) => state.adminData
  );
  const errors = useSelector((state) => state.errors);
  const [addSiteModalOpen, setAddSiteModalOpen] = useState(false);
  const [newSiteName, setNewSiteName] = useState('');
  const [newSiteLocation, setNewSiteLocation] = useState('');
  const [newSitePrice, setNewSitePrice] = useState(0);
  const [newSiteMap, setNewSiteMap] = useState('');
  const [SiteMap, setSiteMap] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function NewMap() {
    window.open('https://maps.google.com', '_blank');
  }
  function onAddNewSite(e) {
    e.preventDefault();
    const newSite = {
      name: newSiteName,
      location: newSiteLocation,
      price: newSitePrice,
      map: SiteMap,
    };
    dispatch(addSite(newSite));
    if (!addDataLoading && !Object.keys(errors).length) {
      setNewSiteName('');
      setNewSiteLocation('');
      setNewSitePrice('');
      setNewSiteMap('');
      setSiteMap('');
      setAddSiteModalOpen(false);
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
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);
  useEffect(() => {
    dispatch(getSites());
  }, []);
  useEffect(() => {
    setSiteMap(
      newSiteMap.replace(
        /width="600" height="450"/g,
        'width="100%" height="100%"'
      )
    );
  }, [newSiteMap]);
  return (
    <Grid container className='dashboard-container justify-around'>
      <Grid className='accounts-list-container w-full -mt-3'>
        <div className='w-full flex flex-row justify-between mb-2'>
          <p className='h4 text-left'>Sites</p>
          <div>
            <Button
              startIcon={<Add />}
              variant='contained'
              onClick={() => setAddSiteModalOpen(true)}
            >
              Add Site
            </Button>
          </div>
        </div>
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
      <Modal
        open={addSiteModalOpen}
        onClose={() => setAddSiteModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide direction='down' in={addSiteModalOpen}>
          <Grid
            className='modal-content-container w-2/3'
            sx={{
              width: '66%',
              left: '16.5%',
            }}
          >
            <Grid className='modal-header w-full mb-4'>
              <p className='h5 text-left text-gray-600'>New Site</p>
            </Grid>
            <Grid className='modal-body w-full flex flex-col'>
              <form onSubmit={onAddNewSite} className='w-1/2'>
                <Grid container className='w-1/2' spacing={2}>
                  <Grid item lg={12}>
                    <TextField
                      className='w-full'
                      type='text'
                      value={newSiteName}
                      autoComplete='false'
                      onChange={(e) => setNewSiteName(e.target.value)}
                      label='Name'
                    />
                  </Grid>
                  <Grid item lg={12}>
                    <TextField
                      className='w-full'
                      type='text'
                      value={newSiteLocation}
                      autoComplete='false'
                      onChange={(e) => setNewSiteLocation(e.target.value)}
                      label='Location'
                    />
                  </Grid>
                  <Grid item lg={12}>
                    <TextField
                      className='w-full'
                      type='number'
                      value={newSitePrice}
                      autoComplete='false'
                      onChange={(e) => setNewSitePrice(e.target.value)}
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
                      value={newSiteMap}
                      autoComplete='false'
                      onChange={(e) => setNewSiteMap(e.target.value)}
                      label='Map'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <MapOutlined />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position='start'>
                            <IconButton onClick={NewMap}>
                              <OpenInNewOutlined />
                            </IconButton>
                          </InputAdornment>
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
                      disabled={
                        !newSiteName.trim().length ||
                        !newSiteLocation.trim().length ||
                        !newSitePrice
                      }
                    >
                      Add Site
                    </LoadingButton>
                  </Grid>
                </Grid>
              </form>
              <Grid className='map-container w-1/2'>
                <div className='w-full h-full'>{parse(SiteMap)}</div>
              </Grid>
            </Grid>
          </Grid>
        </Slide>
      </Modal>
    </Grid>
  );
}

export default SitesUser;
