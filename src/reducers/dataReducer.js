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
  ADD_SAMPLE,
  ADD_SITE,
  SEND_PCR,
  ADD_OFFICEMAT,
  ADD_LOADING,
  GET_ERRORS,
  GET_CUPPINGS,
  ADD_CUPPING,
  ADD_INVOICE,
  DATA_UPDATED,
  RESET_UPDATE,
  GET_INVOICES,
  GET_SHIPPING,
  GET_PACKING,
  GET_WAYBILLS,
  GET_CERTS,
  GET_SHIPDECS,
  GET_WEIGHTNOTES,
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
  invoices: [],
  shippingInstructions: [],
  packingLists: [],
  wayBills: [],
  certificates: [],
  shipDecs: [],
  weightNotes: [],
  loading: false,
  addDataLoading: false,
  dataUpdated: null,
};

export const dataReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_LOADING:
      return {
        ...state,
        addDataLoading: true,
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
        addDataLoading: false,
      };
    case GET_CUPPINGS:
      return {
        ...state,
        loading: false,
        cuppings: payload,
        addDataLoading: false,
      };
    case GET_SITES:
      return {
        ...state,
        loading: false,
        sites: payload,
        addDataLoading: false,
      };
    case GET_PCR:
      return {
        ...state,
        loading: false,
        pcrs: payload,
        addDataLoading: false,
      };
    case SEND_PCR:
    case UPDATE_PCR:
      return {
        ...state,
        loading: false,
        pcrs: [payload, ...state.pcrs],
        addDataLoading: false,
      };
    case DELETE_PCR:
      return {
        ...state,
        loading: false,
        pcrs: state.pcrs.filter((pcr) => pcr.id !== payload),
        addDataLoading: false,
      };
    case GET_INVOICES:
      return {
        ...state,
        loading: false,
        invoices: payload,
      };
    case GET_SHIPPING:
      return {
        ...state,
        loading: false,
        shippingInstructions: payload,
      };
    case GET_PACKING:
      return {
        ...state,
        loading: false,
        packingLists: payload,
      };
    case GET_WAYBILLS:
      return {
        ...state,
        loading: false,
        wayBills: payload,
      };
    case GET_CERTS:
      return {
        ...state,
        loading: false,
        certificates: payload,
      };
    case GET_SHIPDECS:
      return {
        ...state,
        loading: false,
        shipDecs: payload,
      };
    case GET_WEIGHTNOTES:
      return {
        ...state,
        loading: false,
        weightNotes: payload,
      };
    case GET_OFFICEMATS:
      return {
        ...state,
        loading: false,
        officematerials: payload,
        addDataLoading: false,
      };
    case GET_VEHICLES:
      return {
        ...state,
        loading: false,
        vehicles: payload,
        addDataLoading: false,
      };
    case DATA_UPDATED:
      return {
        ...state,
        loading: false,
        dataUpdated: payload,
        addDataLoading: false,
      };
    case RESET_UPDATE:
      return {
        ...state,
        dataUpdated: null,
      };
    case ADD_SAMPLE:
      return {
        ...state,
        loading: false,
        samples: [payload, ...state.samples],
        addDataLoading: false,
      };
    case ADD_INVOICE:
      return {
        ...state,
        loading: false,
        invoices: [payload, ...state.invoices],
        addDataLoading: false,
      };
    case ADD_CUPPING:
      return {
        ...state,
        loading: false,
        cuppings: [payload, ...state.cuppings],
        addDataLoading: false,
      };
    case ADD_SITE:
      return {
        ...state,
        loading: false,
        sites: [payload, ...state.sites],
        addDataLoading: false,
      };
    case ADD_OFFICEMAT:
      return {
        ...state,
        loading: false,
        officematerials: [payload, ...state.officematerials],
        addDataLoading: false,
      };
    case GET_ERRORS:
      return {
        ...state,
        loading: false,
        addDataLoading: false,
      };
    default:
      return state;
  }
};
