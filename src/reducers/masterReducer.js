import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { errorReducer } from './errorReducer';
import { registerReducer } from './registerReducer';
import { dataReducer } from './dataReducer';
// import { chatReducer } from './chatReducer';

export const masterReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  errors: errorReducer,
  adminData: dataReducer,
  // chat: chatReducer,
});
