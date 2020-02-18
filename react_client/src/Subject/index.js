import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import { Waypoint } from 'react-waypoint';

import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import Errors from '../Error';
import SubjectList from './list';

import SortMenu from '../SortMenu';

import {
  FETCH_SUBJECTS_REQUEST,
  FETCH_SUBJECTS_FAILURE,
} from './constants';

import { fetchSubjects, propChange } from './actions';
import { setSearchActionData } from '../Search/actions';
import { showDialog } from '../Dialog/actions';

import { getSubjectItems, getSubjects } from './selectors';
import {
  getLocationState,
  getRouterAction,
  createLoadingSelector,
  createErrorMessageSelector,
} from '../utils/selectors';

const styles = theme => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(10),
  },
  subjectsPageHeader: {
    display: 'flex',
    padding: theme.spacing(2, 3, 2, 2),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchParam: {
    padding: theme.spacing(0, 3, 0, 2),
  },
  endOfListWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export class SubjectsPage extends Component {
  componentDidMount() {
    const {
      fetchSubjects,
      ordering,
      setSearchActionData,
      fromSearch,
      search,
      routerAction,
    } = this.props;

    if (!(fromSearch && routerAction !== 'POP')) {
      setSearchActionData('subjects');
      // keeps the ordering and search between page changes
      // instead of resetting it to '-updated' and ''
      fetchSubjects(ordering, search, 1);
    }
  }

  componentDidUpdate(prevProps) {
    const { fetchSubjects, ordering, search } = this.props;

    if (
      ordering !== prevProps.ordering ||
      search !== prevProps.search
    ) {
      fetchSubjects(ordering, search, 1);
    }
  }

  render() {
    const {
      classes,
      subjects,
      fetchSubjects,
      showDialog,
      propChange,
      isFetchingSubjects,
      fetchSubjectsError,
      ordering,
      search,
      page,
      totalPages,
    } = this.props;

    if (fetchSubjectsError) {
      return (
        <Grid container justify="center">
          <Errors
            errorData={fetchSubjectsError}
            tryAgain={() => {
              fetchSubjects(ordering, search, page);
            }}
          />
        </Grid>
      );
    }
    return (
      <div className="subjectsPage">
        <div className={classes.subjectsPageHeader}>
          <Typography variant="h5">Subjects</Typography>
          <SortMenu
            propChange={propChange}
            currentOrdering={ordering}
            search={search}
            options={[
              { value: '-updated', text: 'Updated (Newest)' },
              { value: 'updated', text: 'Updated (Oldest)' },
              { value: 'name', text: 'A-Z' },
              { value: '-name', text: 'Z-A' },
              { value: '-created', text: 'Created (Newest)' },
              { value: 'created', text: 'Created (Oldest)' },
            ]}
          />
        </div>
        <div className={classes.searchParam}>
          {search && `Searched : ${search}`}
        </div>
        <SubjectList
          subjects={subjects}
          isFetchingSubjects={isFetchingSubjects}
          showDialog={showDialog}
        />
        <Tooltip
          title="create a subject"
          aria-label="create a subject"
        >
          <Fab
            color="primary"
            className={classes.absolute}
            onClick={() => showDialog('CREATE_SUBJECT')}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
        {!isFetchingSubjects && page < totalPages && (
          /* only render if it's currently not fetching and there are more pages */
          <Waypoint
            onEnter={() => {
              fetchSubjects(ordering, search, page + 1);
            }}
          />
        )}
        {totalPages > 1 && page === totalPages && (
          <div className={classes.endOfListWrapper}>
            <Typography variant="subtitle1">End of pages</Typography>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const subjectItems = getSubjectItems(state);
  const { ordering, search, page, totalPages } = subjectItems;

  const subjects = getSubjects(state);

  const isFetchingSubjects = createLoadingSelector([
    FETCH_SUBJECTS_REQUEST,
  ])(state);
  const fetchSubjectsError = createErrorMessageSelector([
    FETCH_SUBJECTS_FAILURE,
  ])(state);

  const locationState = getLocationState(state);
  const fromSearch = locationState && locationState.fromSearch;
  const routerAction = getRouterAction(state);

  return {
    subjects,
    ordering,
    search,
    page,
    totalPages,
    fromSearch,
    routerAction,
    isFetchingSubjects,
    fetchSubjectsError,
  };
};

const mapDispatchToProps = {
  fetchSubjects,
  showDialog,
  propChange,
  setSearchActionData,
};

export const StyledSubjectsPage = withStyles(styles)(SubjectsPage);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(StyledSubjectsPage),
);
