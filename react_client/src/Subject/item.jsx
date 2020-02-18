import React from 'react';
import { Link } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';

export const SubjectListItem = ({ subject, divider, showDialog }) => {
  const { name, description, id } = subject || {};

  return (
    <ListItem
      button
      component={Link}
      divider={divider}
      to={`subjects/${id}`}
    >
      <ListItemText primary={name} secondary={description} />
      <ListItemSecondaryAction>
        <IconButton
          aria-label="Delete Subject"
          onClick={() => {
            showDialog('DELETE_SUBJECT', { id });
          }}
        >
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default SubjectListItem;
