import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import SortIcon from '@material-ui/icons/Sort';
import Paper from '@material-ui/core/Paper';

export class SortMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.anchorRef = React.createRef();
    const { open } = this.state;
    this.prevOpen = React.createRef(open);
  }

  componentDidUpdate(prevProps, prevState) {
    const { open } = this.state;
    // return focus to the button when we transitioned from !open -> open
    if (prevState.open !== open) {
      if (this.prevOpen.current === true && open === false) {
        this.anchorRef.current.focus();
      }

      this.prevOpen.current = open;
    }
  }

  changeOpen = value => {
    this.setState({ open: value });
  };

  handleToggle = () => {
    this.changeOpen(!this.prevOpen.current);
  };

  handleClose = event => {
    if (
      this.anchorRef.current &&
      this.anchorRef.current.contains(event.target)
    ) {
      return;
    }

    this.changeOpen(false);
  };

  handleListKeyDown = event => {
    if (event.key === 'Tab') {
      event.preventDefault();
      this.changeOpen(false);
    }
  };

  handleSelect = e => {
    const { propChange, search, currentOrdering } = this.props;
    const ordering = e.currentTarget.dataset.myValue;
    if (currentOrdering === ordering) {
      this.handleClose(e);
      return;
    }
    propChange({ ordering, search });
    this.handleClose(e);
  };

  render() {
    const { options, currentOrdering } = this.props;
    const { open } = this.state;

    const menuOptions = options.map(option => {
      return (
        <MenuItem
          selected={option.value === currentOrdering}
          key={option.value}
          data-my-value={option.value}
          onClick={event => this.handleSelect(event)}
        >
          {option.text}
        </MenuItem>
      );
    });

    return (
      <>
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<SortIcon />}
          ref={this.anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={this.handleToggle}
        >
          SORT BY
        </Button>
        <Popper
          open={open}
          anchorEl={this.anchorRef.current}
          role={undefined}
          placement="bottom-end"
          transition
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom'
                    ? 'center top'
                    : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={this.handleListKeyDown}
                  >
                    {menuOptions}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </>
    );
  }
}

export default SortMenu;
