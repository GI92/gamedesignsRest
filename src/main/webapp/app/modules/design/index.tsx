import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Create from './create/create'
import Details from 'app/modules/design/details/details';
import {Switch} from 'react-router-dom';

const Routes = ({match}) => (
  <div>
    <Switch>
      <ErrorBoundaryRoute path={`${match.url}/create`} component={Create}/>
      <ErrorBoundaryRoute path={`${match.url}/:id`} component={Details}/>
    </Switch>
  </div>
);

export default Routes;
