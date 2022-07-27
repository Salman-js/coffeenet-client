import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import AccountsList from '../../components/admin/accountsList';
import { getActiveAccs } from '../../actions/adminActions';

function ActiveAccountsContainer() {
  const { admin, isAdminAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const accounts = [
  //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 45 },
  //   { id: 6, lastName: 'Melisandre', firstName: 'dfgdfgdfg', age: 150 },
  //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  // ]
  useEffect(() => {
    dispatch(getActiveAccs());
  }, []);
  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/');
    }
  }, [isAdminAuthenticated]);
  return (
    <Grid className='dashboard-container'>
      <AccountsList admin={admin} type='active' />
    </Grid>
  );
}

export default ActiveAccountsContainer;
