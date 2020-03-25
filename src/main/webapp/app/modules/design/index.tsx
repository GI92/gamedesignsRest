import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Create from './create/create'

const Routes = ({match}) => (
  <div>
    <ErrorBoundaryRoute path={`${match.url}/create`} component={Create}/>
  </div>
);

export default Routes;
