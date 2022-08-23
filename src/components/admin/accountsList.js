import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Grid, IconButton, LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Check, Close, DeleteForever } from '@mui/icons-material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Skeleton from '@mui/material/Skeleton';
import { approveAcc, rejectAcc, deleteAcc } from '../../actions/adminActions';
import { CustomNoRowsOverlay } from '../noRowsOverlay';

export const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

function AccountsList({ admin, type }) {
  const { activeAccounts, pendingAccounts, loading } = useSelector(
    (state) => state.adminData
  );
  const dispatch = useDispatch();

  function onApprove(id, fname, lname, email, password, type) {
    const adminName = admin.fname + ' ' + admin.lname;
    const newAcc = {
      id,
      fname,
      lname,
      email,
      password,
      type,
      approvedBy: adminName,
    };
    dispatch(approveAcc(newAcc));
  }

  function onReject(id) {
    const rejAcc = {
      id,
    };
    dispatch(rejectAcc(rejAcc));
  }

  function onDelete(id, type) {
    const delAcc = {
      id,
      type,
    };
    dispatch(deleteAcc(delAcc));
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'fname', headerName: 'First Name', width: 130 },
    { field: 'lname', headerName: 'Last Name', width: 130 },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
    },
    {
      field: 'type',
      headerName: 'Type',
      description: 'This column is not sortable.',
      sortable: false,
      width: 100,
      valueGetter: (params) =>
        params.row.type === 'users'
          ? 'User'
          : params.row.type === 'financers'
          ? 'Finance Officer'
          : params.row.type === 'documenters'
          ? 'Document Officer'
          : 'Admin',
    },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            {type === 'active' ? (
              <div className='w-full flex justify-center'>
                <BootstrapTooltip title='Delete'>
                  <IconButton
                    sx={{
                      bgcolor: '#f23e3e',
                      color: 'white',
                      '&:hover': {
                        bgcolor: '#ee4b4b',
                      },
                    }}
                    size='small'
                    onClick={() => onDelete(params.row.id, params.row.type)}
                  >
                    <DeleteForever />
                  </IconButton>
                </BootstrapTooltip>
              </div>
            ) : (
              <div className='w-full flex flex-row justify-between'>
                <BootstrapTooltip title='Approve'>
                  <IconButton
                    sx={{
                      bgcolor: '#727aed',
                      color: 'white',
                      '&:hover': {
                        bgcolor: '#6da3ea',
                      },
                    }}
                    size='small'
                    onClick={() =>
                      onApprove(
                        params.row.id,
                        params.row.fname,
                        params.row.lname,
                        params.row.email,
                        params.row.password,
                        params.row.type
                      )
                    }
                  >
                    <Check />
                  </IconButton>
                </BootstrapTooltip>
                <BootstrapTooltip title='Reject'>
                  <IconButton
                    sx={{
                      bgcolor: '#f23e3e',
                      color: 'white',
                      '&:hover': {
                        bgcolor: '#ee4b4b',
                      },
                    }}
                    size='small'
                    onClick={() => onReject(params.row.id)}
                  >
                    <Close />
                  </IconButton>
                </BootstrapTooltip>
              </div>
            )}
          </>
        );
      },
    },
  ];
  return (
    <Grid className='accounts-list-container w-full -mt-3'>
      <p className='h4 text-left'>
        {type === 'active' ? 'Active' : 'Pending'} Accounts List
      </p>
      <DataGrid
        className='bg-white p-4'
        rows={type === 'active' ? activeAccounts : pendingAccounts}
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
  );
}

export const Loader = ({ limit }) => {
  let i;
  let loadingList = [];
  for (i = 0; i < limit; i++) {
    loadingList.push(
      <Skeleton
        variant='rectangular'
        animation='wave'
        width={1000}
        height={50}
        key={i}
        className='mt-3 rounded-sm'
      />
    );
  }
  return loadingList;
};
export default AccountsList;
