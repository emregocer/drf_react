import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Formik } from 'formik';

import SearchForm from './SearchForm';

import { getActionKey, getActionPayload } from './reducer';

import { propChange as subjectsPropChange } from '../Subject/actions';
import { propChange as notesPropChange } from '../Note/actions';

import { getPathname } from '../utils/selectors';

const propChangeActions = {
  subjects: subjectsPropChange,
  notes: notesPropChange,
};

export class Search extends Component {
  submit = (values, actions) => {
    const {
      push,
      pathname,
      actionKey,
      actionPayload,
      dispatch,
    } = this.props;

    const actionToDispatch = actionPayload
      ? propChangeActions[actionKey](values, actionPayload)
      : propChangeActions[actionKey](values);

    // default search is subjects
    if (
      actionKey === 'subjects' &&
      !pathname.startsWith('/subjects')
    ) {
      push({
        pathname: `/subjects`,
        state: { fromSearch: true },
      });
    }

    dispatch(actionToDispatch);
    actions.setSubmitting(false);
  };

  render() {
    return (
      <Formik
        initialValues={{ search: '' }}
        enableReinitialize
        onSubmit={this.submit}
      >
        {props => <SearchForm {...props} />}
      </Formik>
    );
  }
}

const mapStateToProps = state => ({
  actionKey: getActionKey(state),
  actionPayload: getActionPayload(state),
  pathname: getPathname(state),
});

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ push }, dispatch),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
