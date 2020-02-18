import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import BlockIcon from '@material-ui/icons/Block';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

import { openDrawer, closeDrawer } from './actions';
import { getIsDrawerOpen } from './selectors';

export const drawerWidth = 200;

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  list: {
    width: drawerWidth,
  },
});

const list = (
  <List>
    <ListItem button key="drawer-home" component={Link} to="/">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="home" />
    </ListItem>
    <Divider />
    <ListItem
      button
      key="drawer-subjects"
      component={Link}
      to="/subjects"
    >
      <ListItemIcon>
        <LibraryBooksIcon />
      </ListItemIcon>
      <ListItemText primary="subjects" />
    </ListItem>
    <Divider />
    <ListItem
      button
      key="drawer-notfound"
      component={Link}
      to="/goes-nowhere"
    >
      <ListItemIcon>
        <BlockIcon />
      </ListItemIcon>
      <ListItemText primary="notfound" />
    </ListItem>
  </List>
);

export const MobileDrawer = ({
  classes,
  open,
  openDrawer,
  closeDrawer,
}) => {
  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    if (open) {
      closeDrawer();
    } else {
      openDrawer();
    }
  };

  return (
    <Drawer open={open} onClose={toggleDrawer(open)}>
      <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer(open)}
        onKeyDown={toggleDrawer(open)}
      >
        {list}
      </div>
    </Drawer>
  );
};

export const PermanentDrawer = ({ classes, open }) => {
  const currentClass = !open
    ? classes.drawerClose
    : classes.drawerOpen;
  return (
    <Drawer
      variant="permanent"
      className={`${classes.drawer} ${currentClass}`}
      classes={{
        paper: currentClass,
      }}
      open={open}
    >
      <div className={classes.toolbar} />
      {list}
    </Drawer>
  );
};

// using the temporary drawer in xs width
export const AppDrawer = ({ width, ...rest }) => {
  const isXs = isWidthDown('xs', width);

  const drawer = isXs ? (
    <MobileDrawer {...rest} />
  ) : (
    <PermanentDrawer {...rest} />
  );

  return drawer;
};

const mapStateToProps = state => ({
  open: getIsDrawerOpen(state),
});

const mapDispatchToProps = {
  openDrawer,
  closeDrawer,
};

export const StyledDrawer = withWidth()(
  withStyles(styles)(AppDrawer),
);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(StyledDrawer),
);
