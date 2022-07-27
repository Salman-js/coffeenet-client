import { REGISTER_SUCCESS } from '../actions/types';

const initialState = {
  regUser: null,
};

export const registerReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...payload,
        regUser: payload,
      };
    default:
      return state;
  }
};
