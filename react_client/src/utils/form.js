import React from 'react';
import _ from 'lodash';

import TextField from '@material-ui/core/TextField';

export const getNonFieldErrors = (errors, fieldNameArr) => {
  return _.omit(errors, fieldNameArr);
};

export const MaterialFormikTextInput = ({
  field,
  form: { touched, errors },
  ...props
}) => {
  const error = Boolean(touched[field.name] && errors[field.name]);
  const helperText = touched[field.name] && errors[field.name];
  const additionalProps = { error, helperText };

  return <TextField {...field} {...props} {...additionalProps} />;
};
