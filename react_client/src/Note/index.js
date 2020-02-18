import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Waypoint } from 'react-waypoint';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';

import NoteList from './list';
import NotesBySubjectHeader from '../Subject/detail';
import Errors from '../Error';
import SortMenu from '../SortMenu';

import { showDialog } from '../Dialog/actions';
import { setSearchActionData } from '../Search/actions';

import { FETCH_SUBJECT_FAILURE } from '../Subject/constants';
import { fetchSubject } from '../Subject/actions';
import { getSubject } from '../Subject/selectors';

import {
  FETCH_NOTES_REQUEST,
  FETCH_NOTES_FAILURE,
} from './constants';
import { fetchNotes, propChange } from './actions';
import {
  getNoteItemsBySubjectId,
  getNotesBySubjectId,
} from './selectors';

import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../utils/selectors';

const styles = theme => ({
  pageHeader: {
    padding: theme.spacing(2),
  },
  absolute: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(10),
  },
  notesCountAndMenu: {
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

export class NotesBySubjectPage extends Component {
  componentDidMount() {
    const { id, fetchNotes, setSearchActionData } = this.props;
    setSearchActionData('notes', { subject: id });
    fetchNotes(id, '-updated', '', 1);
  }

  componentDidUpdate(prevProps) {
    const { fetchNotes, ordering, search, id } = this.props;

    if (
      ordering !== prevProps.ordering ||
      search !== prevProps.search
    ) {
      fetchNotes(id, ordering, search, 1);
    }
  }

  render() {
    const {
      classes,
      subject,
      id,
      notesList,
      count,
      ordering,
      search,
      propChange,
      fetchSubject,
      fetchNotes,
      page,
      totalPages,
      isFetchingNotes,
      error,
      showDialog,
    } = this.props;

    if (error) {
      return (
        <Grid container justify="center">
          <Errors
            errorData={error}
            tryAgain={() => {
              fetchSubject(id);
              fetchNotes(id, ordering, search, page);
            }}
          />
        </Grid>
      );
    }

    return (
      <div className="subjectsPage">
        <Grid container className={classes.pageHeader}>
          <NotesBySubjectHeader subject={subject} id={id} />
        </Grid>
        <Divider />
        <div className={classes.notesCountAndMenu}>
          <Typography variant="subtitle2">{count} notes</Typography>
          <SortMenu
            propChange={values => {
              propChange(values, { subject: id });
            }}
            search={search}
            currentOrdering={ordering}
            options={[
              { value: '-updated', text: 'Updated (Newest)' },
              { value: 'updated', text: 'Updated (Oldest)' },
              { value: 'content', text: 'A-Z' },
              { value: '-content', text: 'Z-A' },
              { value: '-created', text: 'Created (Newest)' },
              { value: 'created', text: 'Created (Oldest)' },
            ]}
          />
        </div>
        <div className={classes.searchParam}>
          {search && `Searched : ${search}`}
        </div>
        <NoteList
          notes={notesList}
          isFetchingNotes={isFetchingNotes}
          showDialog={showDialog}
        />
        <Tooltip title="create a note" aria-label="create a note">
          <Fab
            color="primary"
            className={classes.absolute}
            component={Button}
            onClick={() =>
              showDialog('CREATE_NOTE', { subjectId: subject.id })
            }
          >
            <AddIcon />
          </Fab>
        </Tooltip>
        {!isFetchingNotes && page < totalPages && (
          /* only render if it's currently not fetching and there are more pages */
          <Waypoint
            onEnter={() => {
              fetchNotes(id, ordering, search, page + 1);
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

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;

  const isFetchingNotes = createLoadingSelector([
    FETCH_NOTES_REQUEST,
  ])(state);

  const error = createErrorMessageSelector([
    FETCH_SUBJECT_FAILURE,
    FETCH_NOTES_FAILURE,
  ])(state);

  const subject = getSubject(state, id) || {};
  const noteItemsBySubjectId = getNoteItemsBySubjectId(state);
  const notesList = getNotesBySubjectId(state, id);

  const {
    page = 1,
    totalPages = 1,
    count = 0,
    ordering = '-updated',
    search = '',
  } = noteItemsBySubjectId[id] || {};

  return {
    id,
    subject,
    notesList,
    count,
    ordering,
    search,
    error,
    isFetchingNotes,
    page,
    totalPages,
  };
};

const mapDispatchToProps = {
  fetchSubject,
  fetchNotes,
  showDialog,
  setSearchActionData,
  propChange,
  push,
};

export const StyledNotesBySubjectPage = withStyles(styles)(
  NotesBySubjectPage,
);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(StyledNotesBySubjectPage),
);
