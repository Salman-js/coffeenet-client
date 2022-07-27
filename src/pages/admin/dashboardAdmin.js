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
  HourglassTop,
  LocalCafe,
  ManageAccounts,
  MapsHomeWork,
  MonetizationOn,
  People,
  PersonRounded,
  PriceCheck,
} from '@mui/icons-material';

function DashboardAdmin() {
  const { isAdminAuthenticated } = useSelector((state) => state.auth);
  const {
    activeAccounts,
    pendingAccounts,
    samples,
    officematerials,
    sites,
    vehicles,
    cuppings,
    pcrs,
  } = useSelector((state) => state.adminData);
  let approvedPcrs = pcrs.filter((pcr) => pcr.status === 'Approved');
  let pendingPcrs = pcrs.filter((pcr) => pcr.status === 'Pending');
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/');
    }
  }, [isAdminAuthenticated]);
  return (
    <Grid container className='dashboard-container justify-around'>
      {/* Accounts */}
      <Grid item lg={5} xs={12} md={6}>
        <Accordion className='w-full'>
          <AccordionSummary expandIcon={<ExpandMore />} className='w-full'>
            <div className='w-full flex flex-row'>
              <PersonRounded size='large' />
              <div className='ml-6'>
                <p className='h4 text-left'>Accounts</p>
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className='w-full flex flex-col xs:flex-col md:flex-row lg:flex-row  justify-around'>
            <Grid className='shadow-md rounded-md w-full lg:w-1/2 px-4 py-3'>
              <div className='w-full flex flex-row'>
                <div className='mr-3'>
                  <p className='h4 text-left'>Active Accounts</p>
                </div>
                <div className='flex flex-col'>
                  <p className='h4 text-left'>{activeAccounts.length}</p>
                  <People />
                </div>
              </div>
            </Grid>
            <Grid className='shadow-md rounded-md w-full lg:w-1/2 px-4 py-3'>
              <div className='w-full flex flex-row'>
                <div>
                  <p className='h4 text-left'>Pending Accounts</p>
                </div>
                <div className='flex flex-col ml-3'>
                  <p className='h4 text-left'>{pendingAccounts.length}</p>
                  <ManageAccounts />
                </div>
              </div>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
      {/* Samples */}
      <Grid item lg={3} xs={12} md={4}>
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
                <div className='mr-3'>
                  <p className='h4 text-left'>Total Samples</p>
                </div>
                <div className='flex flex-col'>
                  <p className='h4 text-left'>{samples.length}</p>
                  <Description />
                </div>
              </div>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
      {/* DHL */}
      <Grid item lg={2} xs={12} md={5}>
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
                <div className='mr-3'>
                  <p className='h4 text-left'>All Mails</p>
                </div>
                <div className='flex flex-col'>
                  <p className='h4 text-left'>10</p>
                  <Email />
                </div>
              </div>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
      {/* Cuppings */}
      <Grid item lg={3} xs={12} md={5}>
        <Accordion className='w-full'>
          <AccordionSummary expandIcon={<ExpandMore />} className='w-full'>
            <div className='w-full flex flex-row'>
              <LocalCafe size='large' />
              <div className='ml-6'>
                <p className='h4 text-left'>Cuppings</p>
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className='w-full flex justify-around'>
            <Grid className='shadow-md rounded-md w-full px-4 py-3'>
              <div className='w-full flex flex-row'>
                <div className='mr-3'>
                  <p className='h4 text-left'>Total Cuppings</p>
                </div>
                <div className='flex flex-col'>
                  <p className='h4 text-left'>{cuppings.length}</p>
                  <LocalCafe />
                </div>
              </div>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
      {/* Petty Cash Requests */}
      <Grid item lg={7} xs={12} md={10}>
        <Accordion className='w-full'>
          <AccordionSummary expandIcon={<ExpandMore />} className='w-full'>
            <div className='w-full flex flex-row'>
              <MonetizationOn />
              <div className='ml-6'>
                <p className='h4 text-left'>Petty Cash Requests</p>
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className='w-full flex md:flex-row flex-col xs:flex-col justify-around'>
            <Grid className='shadow-md rounded-md w-full lg:w-5/12 px-4 py-3'>
              <div className='w-full flex flex-row'>
                <div>
                  <p className='h5 text-left'>Approved Requests</p>
                </div>
                <div className='flex flex-col px-2'>
                  <p className='h5 text-left'>{approvedPcrs.length}</p>
                  <PriceCheck />
                </div>
              </div>
            </Grid>
            <Grid className='shadow-md rounded-md w-full lg:w-5/12 px-4 py-3'>
              <div className='w-full flex flex-row'>
                <div>
                  <p className='h5 text-left'>Pending Requests</p>
                </div>
                <div className='flex flex-col px-2'>
                  <p className='h5 text-left'>{pendingPcrs.length}</p>
                  <HourglassTop />
                </div>
              </div>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
      {/* Sites */}
      <Grid item lg={3} xs={12} md={5}>
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
                <div className='mr-3'>
                  <p className='h4 text-left'>Total Sites</p>
                </div>
                <div className='flex flex-col'>
                  <p className='h4 text-left'>{sites.length}</p>
                  <Grass />
                </div>
              </div>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
      {/* Office Materials */}
      <Grid item lg={4} xs={12} md={5}>
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
                <div className='mr-3'>
                  <p className='h4 text-left'>Total Materials</p>
                </div>
                <div className='flex flex-col'>
                  <p className='h4 text-left'>{officematerials.length}</p>
                  <MapsHomeWork />
                </div>
              </div>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
      {/* Vehicles */}
      <Grid item lg={3} xs={12} md={5}>
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
                <div className='mr-3'>
                  <p className='h4 text-left'>Total Vehicles</p>
                </div>
                <div className='flex flex-col'>
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

export default DashboardAdmin;
