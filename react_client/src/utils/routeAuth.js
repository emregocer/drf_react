import React from 'react';
import { withRouter, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { getAuth } from '../Login/selectors';

const ProtectedRoute = ({ auth, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.token && auth.username && auth.refreshToken ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  auth: getAuth(state),
});

export default withRouter(
  connect(mapStateToProps, null)(ProtectedRoute),
);
