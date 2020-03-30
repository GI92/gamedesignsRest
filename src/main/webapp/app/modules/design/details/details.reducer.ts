import { defaultValue, IDesign } from 'app/shared/model/design.model';
import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';
import { ICrudGetAction, ICrudGetAllAction } from 'react-jhipster';
import axios from 'axios';

export const ACTION_TYPES = {
  FETCH_DESIGNS: 'design/FETCH_DESIGNS',
  FETCH_DESIGN: 'design/FETCH_DESIGN',
  UPDATE_DESIGN: 'design/UPDATE_DESIGN',
  DELETE_DESIGN: 'design/DELETE_DESIGN',
  RESET: 'design/RESET',
  UPDATE_VIEW: 'design/UPDATE_VIEW'
};

const initialState = {
  loading: false,
  errorMessage: null,
  designs: [] as ReadonlyArray<IDesign>,
  authorities: [] as any[],
  design: defaultValue,
  updating: false,
  updateSuccess: false,
  totalItems: 0,
  edit: false
};

export type DetailsState = Readonly<typeof initialState>;

// Reducer
export default (state: DetailsState = initialState, action): DetailsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DESIGNS):
      return {
        ...state
      };
    case REQUEST(ACTION_TYPES.FETCH_DESIGN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.UPDATE_DESIGN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: true,
        loading: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DESIGNS):
    case FAILURE(ACTION_TYPES.FETCH_DESIGN):
    case FAILURE(ACTION_TYPES.UPDATE_DESIGN):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DESIGNS):
      return {
        ...state,
        loading: false,
        designs: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_DESIGN):
      return {
        ...state,
        loading: false,
        design: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.UPDATE_DESIGN):
      return {
        ...state,
        loading: false,
        design: action.payload.data,
        edit: false
      };
    case SUCCESS(ACTION_TYPES.DELETE_DESIGN):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        design: defaultValue
      };
    case ACTION_TYPES.UPDATE_VIEW:
      return {
        ...state,
        edit: !state.edit
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/design';
// Actions
export const getDesigns: ICrudGetAllAction<IDesign> = (page, size, sort) => {
  const requestUrl = `${apiUrl}/all${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_DESIGNS,
    payload: axios.get<IDesign>(requestUrl)
  };
};

export const getMyDesigns: ICrudGetAllAction<IDesign> = (page, size, sort) => {
  const requestUrl = `${apiUrl}/all/me${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_DESIGNS,
    payload: axios.get<IDesign>(requestUrl)
  };
};

export const getDesign: ICrudGetAction<IDesign> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DESIGN,
    payload: axios.get<IDesign>(requestUrl)
  };
};

export const updateDesign: ICrudGetAction<IDesign> = value => {
  const requestUrl = `${apiUrl}`;
  return {
    type: ACTION_TYPES.UPDATE_DESIGN,
    payload: axios.patch<IDesign>(requestUrl, value)
  };
};

export const deleteDesign = id => dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  return dispatch({
    type: ACTION_TYPES.DELETE_DESIGN,
    payload: axios.delete(requestUrl)
  });
};

export const editView = () => ({
  type: ACTION_TYPES.UPDATE_VIEW
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
