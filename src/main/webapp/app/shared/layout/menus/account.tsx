import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import {Translate, translate} from 'react-jhipster';
import {NavDropdown} from './menu-components';

const accountMenuItemsAuthenticated = (
  <>
    <MenuItem icon="list" to="/design/me">
      <Translate contentKey="global.menu.design.my">My designs</Translate>
    </MenuItem>
    <MenuItem icon="plus" to="/design/create">
      <Translate contentKey="global.menu.design.create">Create design</Translate>
    </MenuItem>
    <MenuItem icon="wrench" to="/account/settings">
      <Translate contentKey="global.menu.account.settings">Settings</Translate>
    </MenuItem>
    <MenuItem icon="lock" to="/account/password">
      <Translate contentKey="global.menu.account.password">Password</Translate>
    </MenuItem>
    <MenuItem icon="sign-out-alt" to="/logout">
      <Translate contentKey="global.menu.account.logout">Sign out</Translate>
    </MenuItem>
  </>
);

const accountMenuItems = (
  <>
    <MenuItem id="login-item" icon="sign-in-alt" to="/login">
      <Translate contentKey="global.menu.account.login">Sign in</Translate>
    </MenuItem>
    <MenuItem icon="sign-in-alt" to="/account/register">
      <Translate contentKey="global.menu.account.register">Register</Translate>
    </MenuItem>
  </>
);

export const AccountMenu = ({ isAuthenticated = false }) => (
  <NavDropdown icon="user" name={translate('global.menu.account.main')} id="account-menu">
    {isAuthenticated ? accountMenuItemsAuthenticated : accountMenuItems}
  </NavDropdown>
);

export default AccountMenu;
