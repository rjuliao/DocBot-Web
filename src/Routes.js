import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  UserList as UserListView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  Menu as PacientMenu,
  FindRisk as FindRiskTest,
  ChangePassword as ChangePasswordView,
  EmailForm as EmailFormView,
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/sign-in"
      />
      <RouteWithLayout
        component={PacientMenu}
        exact
        layout={MainLayout}
        path="/menu"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/pacientes"
      />
      <RouteWithLayout
      component={FindRiskTest}
      exact
      layout={MainLayout}
      path="/findrisk"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={ChangePasswordView}
        exact
        layout={MinimalLayout}
        path="/cambiar-contraseña"
      />
      <RouteWithLayout
        component={EmailFormView}
        exact
        layout={MinimalLayout}
        path="/obtener-codigo"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
