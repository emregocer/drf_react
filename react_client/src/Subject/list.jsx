import React from 'react';

import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';

import SubjectListItem from './item';

export const SubjectList = ({
  subjects,
  isFetchingSubjects,
  showDialog,
}) => {
  return (
    <div className="subject-list">
      {!isFetchingSubjects && subjects.length === 0 && (
        <Box m={2}>
          <Typography variant="subtitle1">
            There are no subjects.
          </Typography>
        </Box>
      )}
      <List>
        {subjects.map((subject, index) => (
          <SubjectListItem
            subject={subject}
            showDialog={showDialog}
            key={`SubjectItem.${subject.id}`}
            divider={index !== subjects.length - 1}
          />
        ))}

        {isFetchingSubjects &&
          [...Array(6)].map((e, i) => (
            <Skeleton height={100} key={`NoteItemSkeleton.${i}`} />
          ))}
      </List>
    </div>
  );
};

export default SubjectList;
