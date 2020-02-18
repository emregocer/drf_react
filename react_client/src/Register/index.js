import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';

import Container from '@material-ui/core/Container';

import { getNonFieldErrors } from '../utils/form';

import Errors from '../Error';
import RegisterForm from './form';

import { REGISTER_USER_FAILURE } from './constants';
import { registerUserRequest } from './actions';

import { createErrorMessageSelector } from '../utils/selectors';

const schema = yup.object({
  username: yup
    .string('Enter an username')
    .required('Username is required.')
    .max(36, 'Username must be fewer than 36 characters.'),
  email: yup
    .string('Enter an email')
    .required('Email is required.')
    .email('This is not a valid email.'),
  password: yup
    .string('Enter a password')
    .required('Password is required.')
    .min(8, 'Password must be at least 8 characters.'),
  rePassword: yup
    .string('Confirm the password')
    .oneOf([yup.ref('password'), null], "Passwords don't match.")
    .required('Password confirmation is required.'),
});

const fields = ['username', 'email', 'password', 'rePassword'];

export class Register extends Component {
  submit = (values, actions) => {
    const { registerUserRequest } = this.props;
    return registerUserRequest(values)
      .then(() => {})
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
              email: '',
              password: '',
              rePassword: '',
            }}
            validationSchema={schema}
            onSubmit={this.submit}
          >
            {props => <RegisterForm {...props} />}
          </Formik>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  errors: createErrorMessageSelector([REGISTER_USER_FAILURE])(state),
});

const mapDispatchToProps = {
  registerUserRequest,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Register),
);
