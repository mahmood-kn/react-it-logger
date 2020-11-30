import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LOG,
  SEARCH_LOGS,
} from '../actions/types';

const initialState = {
  logs: null,
  loading: false,
  current: null,
  error: null,
};

const logsReducer = (state = initialState, aciton) => {
  switch (aciton.type) {
    case GET_LOGS:
      return {
        ...state,
        logs: aciton.payload,
        loading: false,
      };
    case ADD_LOG:
      return {
        ...state,
        logs: [...state.logs, aciton.payload],
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: aciton.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case UPDATE_LOG:
      return {
        ...state,
        logs: state.logs.map((log) =>
          log.id === aciton.payload.id ? aciton.payload : log
        ),
        loading: false,
      };
    case SEARCH_LOGS:
      return {
        ...state,
        logs: aciton.payload,
      };
    case DELETE_LOG:
      return {
        ...state,
        logs: state.logs.filter((log) => log.id !== aciton.payload),
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOGS_ERROR:
      console.error(aciton.payload);
      return {
        ...state,
        error: aciton.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default logsReducer;
