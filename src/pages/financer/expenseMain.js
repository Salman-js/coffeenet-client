import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, Radio } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

function ExpenseMain() {
  const { isFinancerAuthenticated } = useSelector((state) => state.auth);
  const [selectedExpense, setSelectedExpense] = useState('');
  const navigate = useNavigate();
  const expenseTypes = [
    {
      name: 'Stationary',
      route: 'stationary',
    },
    {
      name: 'Telephone',
      route: 'telephone',
    },
    {
      name: 'Rent',
      route: 'rent',
    },
    {
      name: 'Bank Service Charge',
      route: 'bank-service',
    },
    {
      name: 'Repair',
      route: 'repair',
    },
    {
      name: 'Salary',
      route: 'salary',
    },
    {
      name: 'Pension',
      route: 'pension',
    },
    {
      name: 'Transport',
      route: 'transport',
    },
    {
      name: 'Fuel',
      route: 'fuel',
    },
    {
      name: 'Interest',
      route: 'interest',
    },
    {
      name: 'Postage',
      route: 'postage',
    },
    {
      name: 'License',
      route: 'license',
    },
    {
      name: 'Deptation',
      route: 'deptation',
    },
    {
      name: 'Miscellaneous',
      route: 'miscellaneous',
    },
  ];
  useEffect(() => {
    if (!isFinancerAuthenticated) {
      navigate('/');
    }
  }, [isFinancerAuthenticated, navigate]);
  return (
    <Grid container className='dashboard-container justify-around'>
      <Grid className='accounts-list-container w-full -mt-4'>
        <div className='w-full flex flex-row justify-between mb-2'>
          <p className='h4 text-left'>Expenses</p>
          <Button
            variant='contained'
            sx={{
              ml: 3,
            }}
            disabled={!selectedExpense}
            endIcon={<ArrowForward />}
          >
            Next
          </Button>
        </div>
      </Grid>
      <Grid
        className='invoice-layout-container w-full bg-white p-6 overflow-auto'
        style={{ height: '70vh' }}
      >
        <Grid
          container
          gap={2}
          columns={16}
          className='w-full flex justify-start'
        >
          {expenseTypes.map((expenseType, index) => {
            return (
              <Grid
                item
                lg={5}
                xs={7}
                className='rounded-xl overflow-hidden p-3 pr-5 border border-blue-500 cursor-pointer'
                sx={{
                  backgroundColor:
                    selectedExpense === expenseType.route
                      ? 'rgb(59 130 246)'
                      : 'transparent',
                  '&:hover': {
                    backgroundColor:
                      selectedExpense === expenseType.route
                        ? 'rgb(59 130 246)'
                        : '#e7e3e3',
                  },
                }}
                onClick={() => setSelectedExpense(expenseType.route)}
              >
                <div className='w-full flex flex-row justify-between'>
                  <Radio
                    checked={selectedExpense === expenseType.route}
                    sx={{
                      '&.Mui-checked': {
                        color: 'white',
                      },
                    }}
                    onChange={() => {
                      if (selectedExpense !== expenseType.route) {
                        setSelectedExpense(expenseType.route);
                      }
                    }}
                    value='b'
                  />
                  <div className='my-auto'>
                    <p
                      className='h5 text-left my-auto'
                      style={{
                        color:
                          selectedExpense === expenseType.route
                            ? 'white'
                            : 'black',
                      }}
                    >
                      {expenseType.name}
                    </p>
                  </div>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ExpenseMain;
