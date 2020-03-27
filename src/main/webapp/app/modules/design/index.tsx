import React from 'react';
import {Switch} from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Create from './create/create'
import DesignView from 'app/modules/design/details/details-view';
import DesignDeleteDialog from 'app/modules/design/details/design-delete-dialogue';
import Designs from 'app/modules/design/details/details';

const Routes = ({match}) => (
  <div>
    <Switch>
      <ErrorBoundaryRoute path={`${match.url}/create`} component={Create}/>
      <ErrorBoundaryRoute path={`${match.url}/:id`} component={DesignView}/>
      <ErrorBoundaryRoute path={`${match.url}`} component={Designs}/>
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={DesignDeleteDialog}/>
  </div>
);

export default Routes;
