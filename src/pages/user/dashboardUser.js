import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Description,
  DirectionsCar,
  Email,
  ExpandMore,
  Grass,
  MapsHomeWork,
} from '@mui/icons-material';

function DashboardUser() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { samples, officematerials, sites, vehicles } = useSelector(
    (state) => state.adminData
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);
  return (
    <Grid container className='dashboard-container justify-around'>
      {/* Samples */}
      <Grid item lg={5} xs={12} md={5}>
        <Accordion className='w-full'>
          <AccordionSummary expandIcon={<ExpandMore />} className='w-full'>
            <div className='w-full flex flex-row'>
              <Description size='large' />
              <div className='ml-6'>
                <p className='h4 text-left'>Samples</p>
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className='w-full flex justify-around'>
            <Grid className='shadow-md rounded-md w-full px-4 py-3'>
              <div className='w-full flex flex-row'>
                <div className='m-auto mr-3'>
                  <p className='h4 text-left'>Total Samples</p>
                </div>
                <div className='m-auto flex flex-col'>
                  <p className='h4 text-left'>{samples.length}</p>
                  <Description />
                </div>
              </div>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
      {/* DHL */}
      <Grid item lg={5} xs={12} md={5}>
        <Accordion className='w-full'>
          <AccordionSummary expandIcon={<ExpandMore />} className='w-full'>
            <div className='w-full flex flex-row'>
              <Email size='large' />
              <div className='ml-6'>
                <p className='h4 text-left'>DHL</p>
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className='w-full flex justify-around'>
            <Grid className='shadow-md rounded-md w-full px-4 py-3'>
              <div className='w-full flex flex-row'>
                <div className='m-auto mr-3'>
                  <p className='h4 text-left'>All Mails</p>
                </div>
                <div className='m-auto flex flex-col'>
                  <p className='h4 text-left'>10</p>
                  <Email />
                </div>
              </div>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
      {/* Sites */}
      <Grid item lg={5} xs={12} md={5}>
        <Accordion className='w-full'>
          <AccordionSummary expandIcon={<ExpandMore />} className='w-full'>
            <div className='w-full flex flex-row'>
              <Grass size='large' />
              <div className='ml-6'>
                <p className='h4 text-left'>Sites</p>
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className='w-full flex justify-around'>
            <Grid className='shadow-md rounded-md w-4/5 px-4 py-3'>
              <div className='w-full flex flex-row'>
                <div className='m-auto mr-3'>
                  <p className='h4 text-left'>Total Sites</p>
                </div>
                <div className='m-auto flex flex-col'>
                  <p className='h4 text-left'>{sites.length}</p>
                  <Grass />
                </div>
              </div>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
      {/* Office Materials */}
      <Grid item lg={5} xs={12} md={5}>
        <Accordion className='w-full'>
          <AccordionSummary expandIcon={<ExpandMore />} className='w-full'>
            <div className='w-full flex flex-row'>
              <MapsHomeWork size='large' />
              <div className='ml-6'>
                <p className='h4 text-left'>Office Materials</p>
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className='w-full flex justify-around'>
            <Grid className='shadow-md rounded-md w-full lg:w-2/3 px-4 py-3'>
              <div className='w-full flex flex-row'>
                <div className='m-auto mr-3'>
                  <p className='h4 text-left'>Total Materials</p>
                </div>
                <div className='m-auto flex flex-col'>
                  <p className='h4 text-left'>{officematerials.length}</p>
                  <MapsHomeWork />
                </div>
              </div>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
      {/* Vehicles */}
      <Grid item lg={5} xs={12} md={5}>
        <Accordion className='w-full'>
          <AccordionSummary expandIcon={<ExpandMore />} className='w-full'>
            <div className='w-full flex flex-row'>
              <DirectionsCar size='large' />
              <div className='ml-6'>
                <p className='h4 text-left'>Vehicles</p>
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className='w-full flex justify-around'>
            <Grid className='shadow-md rounded-md w-4/5 px-4 py-3'>
              <div className='w-full flex flex-row'>
                <div className='m-auto mr-3'>
                  <p className='h4 text-left'>Total Vehicles</p>
                </div>
                <div className='m-auto flex flex-col'>
                  <p className='h4 text-left'>{vehicles.length}</p>
                  <DirectionsCar />
                </div>
              </div>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
}

export default DashboardUser;
