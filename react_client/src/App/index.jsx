import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';

import history from '../store/history';

import ProtectedRoute from '../utils/routeAuth';
import AppBar from '../AppBar';
import Drawer from '../Drawer';
import Login from '../Login';
import Register from '../Register';
import Home from '../Home';
import SubjectsPage from '../Subject';
import NotesBySubjectPage from '../Note';
import Snackbar from '../Snackbar';
import Dialog from '../Dialog';
import ErrorBoundary from '../Error/ErrorBoundary';
import NotFound from '../NotFound';

const styles = theme => ({
  App: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
  },
  appBarOffset: theme.mixins.toolbar,
});

export const App = ({ store, classes }) => {
  return (
    <div className={classes.App}>
      <CssBaseline />
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ErrorBoundary>
            <AppBar />
            <Drawer />
            <main className={classes.content}>
              <div className={classes.appBarOffset} />
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <ProtectedRoute path="/subjects" exact>
                  <SubjectsPage />
                </ProtectedRoute>
                <ProtectedRoute path="/subjects/:id">
                  <NotesBySubjectPage />
                </ProtectedRoute>
                <Route component={NotFound} />
              </Switch>
            </main>
            <Dialog />
            <Snackbar />
          </ErrorBoundary>
        </ConnectedRouter>
      </Provider>
    </div>
  );
};

export default withStyles(styles)(App);
