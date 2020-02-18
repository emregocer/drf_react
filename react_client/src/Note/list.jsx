import React from 'react';

import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';

import NoteListItem from './item';

export const NoteList = ({ notes, isFetchingNotes, showDialog }) => {
  return (
    <div className="noteList">
      {!isFetchingNotes && notes.length === 0 && (
        <Box m={2}>
          <Typography variant="subtitle1">
            There are no notes in this subject.
          </Typography>
        </Box>
      )}
      <List>
        {notes.map((note, index) => (
          <NoteListItem
            note={note}
            showDialog={showDialog}
            key={`NoteItem.${note.id}`}
            divider={index !== notes.length - 1}
          />
        ))}

        {isFetchingNotes && (
          <>
            {[...Array(6)].map((e, i) => (
              <Skeleton height={100} key={`NoteItemSkeleton.${i}`} />
            ))}
          </>
        )}
      </List>
    </div>
  );
};

export default NoteList;
