import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { replace, push } from 'connected-react-router';
import { Formik } from 'formik';
import * as yup from 'yup';

import Container from '@material-ui/core/Container';

import Errors from '../Error';
import LoginForm from './form';

import { getNonFieldErrors } from '../utils/form';

import { showSnackbar } from '../Snackbar/actions';

import { LOGIN_FAILURE } from './constants';
import { loginRequest } from './actions';
import { getUsername } from './selectors';

import {
  createErrorMessageSelector,
  getLocationState,
} from '../utils/selectors';

const schema = yup.object({
  username: yup
    .string('Enter an username')
    .required('Username is required.'),
  password: yup
    .string('Enter a password')
    .required('Password is required.'),
});

const fields = ['username', 'password'];

export class Login extends Component {
  componentDidMount() {
    const { username, replace, showSnackbar } = this.props;
    if (username) {
      showSnackbar('warning', 'You are already logged in!');
      replace({
        pathname: '/',
      });
    }
  }

  submit = (values, actions) => {
    const { loginRequest, push, redirectedFrom } = this.props;
    return loginRequest(values)
      .then(() => {
        push(redirectedFrom);
      })
      .catch(() => {
        const { errors } = this.props;
        actions.setErrors(errors);
      });
  };

  render() {
    const { errors } = this.props;
    const nonFieldErrors = getNonFieldErrors(errors, fields);
    return (
      <>
        <Container maxWidth="xs">
          {errors && <Errors errorData={nonFieldErrors} />}
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            validationSchema={schema}
            onSubmit={this.submit}
          >
            {props => <LoginForm {...props} />}
          </Formik>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => {
  const errors = createErrorMessageSelector([LOGIN_FAILURE])(state);
  const username = getUsername(state);
  const locationState = getLocationState(state);

  const redirectedFrom =
    (locationState && locationState.from.pathname) || '/';

  return {
    username,
    redirectedFrom,
    errors,
  };
};

const mapDispatchToProps = {
  loginRequest,
  replace,
  push,
  showSnackbar,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Login),
);
