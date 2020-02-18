import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Create from '@material-ui/icons/Create';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

import { FETCH_SUBJECT_REQUEST } from './constants';
import { loadSubject } from './actions';
import { getSubject } from './selectors';
import { showDialog } from '../Dialog/actions';

import { createLoadingSelector } from '../utils/selectors';

const styles = theme => ({
  subjectName: {
    paddingBottom: theme.spacing(2),
  },
  subjectDescription: {
    paddingBottom: theme.spacing(2),
  },
  dateTime: {
    display: 'inline',
    flexGrow: 1,
  },
  headerBottom: {
    display: 'flex',
    alignItems: 'center',
  },
});

export class NotesBySubjectHeader extends Component {
  componentDidMount() {
    const { loadSubject, id } = this.props;
    loadSubject(id);
  }

  render() {
    const {
      classes,
      subject,
      fetchingSubject,
      showDialog,
    } = this.props;

    if (fetchingSubject) {
      return (
        <Grid item xs={12}>
          <Skeleton height={100} />
          <Skeleton height={40} width="40%" />
        </Grid>
      );
    }

    return (
      <>
        <Grid item xs={12} className={classes.subjectName}>
          <Typography variant="h5">{subject.name}</Typography>
        </Grid>
        <Grid item xs={12} className={classes.subjectDescription}>
          <Typography variant="subtitle1">
            {subject.description}
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.headerBottom}>
          {fetchingSubject ? (
            <>
              <Skeleton height={40} width="40%" />
            </>
          ) : (
            <>
              <Typography
                className={classes.dateTime}
                variant="subtitle2"
              >
                {new Date(subject.updated).toLocaleString()}
              </Typography>
              <IconButton
                color="primary"
                onClick={() =>
                  showDialog('EDIT_SUBJECT', { id: subject.id })
                }
              >
                <Create />
              </IconButton>
            </>
          )}
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.id,
  subject: getSubject(state, ownProps.id) || {},
  fetchingSubject: createLoadingSelector([FETCH_SUBJECT_REQUEST])(
    state,
  ),
});

const mapDispatchToProps = {
  loadSubject,
  showDialog,
};

export const StyledNotesBySubjectHeader = withStyles(styles)(
  NotesBySubjectHeader,
);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(StyledNotesBySubjectHeader),
);
