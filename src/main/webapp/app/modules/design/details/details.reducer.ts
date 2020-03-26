import { defaultValue, IDesign } from 'app/shared/model/design.model';
import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';
import { ICrudGetAction } from 'react-jhipster';
import axios from 'axios';

export const ACTION_TYPES = {
  FETCH_DESIGNS: 'design/FETCH_DESIGNS',
  FETCH_DESIGN: 'design/FETCH_DESIGN',
  UPDATE_DESIGN: 'design/UPDATE_DESIGN',
  DELETE_DESIGN: 'design/DELETE_DESIGN',
  RESET: 'design/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  designs: [] as ReadonlyArray<IDesign>,
  authorities: [] as any[],
  design: defaultValue,
  updating: false,
  updateSuccess: false,
  totalItems: 0
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
    case FAILURE(ACTION_TYPES.FETCH_DESIGNS):
    case FAILURE(ACTION_TYPES.FETCH_DESIGN):
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
    case SUCCESS(ACTION_TYPES.DELETE_DESIGN):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        design: defaultValue
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
// export const getUsers: ICrudGetAllAction<IUser> = (page, size, sort) => {
//   const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
//   return {
//     type: ACTION_TYPES.FETCH_USERS,
//     payload: axios.get<IUser>(requestUrl)
//   };
// };

export const getDesign: ICrudGetAction<IDesign> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DESIGN,
    payload: axios.get<IDesign>(requestUrl)
  };
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
