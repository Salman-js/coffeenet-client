import {
  LOADING,
  GET_ACTIVE_ACCOUNTS,
  GET_PENDING_ACCOUNTS,
  DELETE_ACCOUNT,
  GET_SAMPLES,
  GET_SITES,
  GET_PCR,
  GET_OFFICEMATS,
  GET_VEHICLES,
  REJECT_ACCOUNT,
  UPDATE_PCR,
  DELETE_PCR,
} from '../actions/types';

const initialState = {
  activeAccounts: [],
  pendingAccounts: [],
  samples: [],
  officematerials: [],
  sites: [],
  vehicles: [],
  cuppings: [],
  pcrs: [],
  loading: false,
};

export const adminDataReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ACTIVE_ACCOUNTS:
      return {
        ...state,
        loading: false,
        activeAccounts: payload,
      };
    case GET_PENDING_ACCOUNTS:
      return {
        ...state,
        loading: false,
        pendingAccounts: payload,
      };
    case REJECT_ACCOUNT:
      return {
        ...state,
        loading: false,
        pendingAccounts: state.pendingAccounts.filter(
          (account) => account.id !== payload
        ),
      };
    case DELETE_ACCOUNT:
      return {
        ...state,
        loading: false,
        activeAccounts: state.activeAccounts.filter(
          (account) => account.id !== payload
        ),
      };
    case GET_SAMPLES:
      return {
        ...state,
        loading: false,
        samples: payload,
      };
    case GET_SITES:
      return {
        ...state,
        loading: false,
        sites: payload,
      };
    case GET_PCR:
      return {
        ...state,
        loading: false,
        pcrs: payload,
      };
    case UPDATE_PCR:
      return {
        ...state,
        loading: false,
        pcrs: [payload, ...state.pcrs],
      };
    case DELETE_PCR:
      return {
        ...state,
        loading: false,
        pcrs: state.pcrs.filter((pcr) => pcr.id !== payload),
      };
    case GET_OFFICEMATS:
      return {
        ...state,
        loading: false,
        officematerials: payload,
      };
    case GET_VEHICLES:
      return {
        ...state,
        loading: false,
        vehicles: payload,
      };
    default:
      return state;
  }
};
