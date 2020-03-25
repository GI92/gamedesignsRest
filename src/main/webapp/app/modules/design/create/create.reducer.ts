import axios from 'axios';
import { translate } from 'react-jhipster';

import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';

export const ACTION_TYPES = {
  CREATE_DESIGN: 'design/CREATE_DESIGN',
  RESET: 'design/RESET'
};

const initialState = {
  loading: false,
  creationSuccess: false,
  creationFailure: false,
  errorMessage: null
};

export type CreateState = Readonly<typeof initialState>;

// Reducer
export default (state: CreateState = initialState, action): CreateState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.CREATE_DESIGN):
      return {
        ...state,
        loading: true
      };
    case FAILURE(ACTION_TYPES.CREATE_DESIGN):
      return {
        ...initialState,
        creationFailure: true,
        errorMessage: action.payload.response.data.errorKey
      };
    case SUCCESS(ACTION_TYPES.CREATE_DESIGN):
      return {
        ...initialState,
        creationSuccess: true
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

// Actions
export const handleCreate = (name, description) => ({
  type: ACTION_TYPES.CREATE_DESIGN,
  payload: axios.post('api/design', { name, description }),
  meta: {
    successMessage: translate('design.messages.create.success')
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
