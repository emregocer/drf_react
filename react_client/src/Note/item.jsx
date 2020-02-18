import React, { Component } from 'react';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export class NoteListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    const { note, divider, showDialog } = this.props;
    const { content, updated } = note;
    const { anchorEl } = this.state;
    return (
      <>
        <ListItem divider={divider}>
          <ListItemText
            primary={content}
            secondary={new Date(updated).toLocaleString()}
          />
          <ListItemSecondaryAction>
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem
            aria-label="edit note"
            onClick={() => {
              showDialog('EDIT_NOTE', { id: note.id });
              this.handleClose();
            }}
          >
            edit
          </MenuItem>
          <MenuItem
            aria-label="delete note"
            onClick={() => {
              showDialog('DELETE_NOTE', { id: note.id });
              this.handleClose();
            }}
          >
            delete
          </MenuItem>
        </Menu>
      </>
    );
  }
}

export default NoteListItem;
