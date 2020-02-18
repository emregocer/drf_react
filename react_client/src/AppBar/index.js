import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Search from '../Search/Search';

import { openDrawer, closeDrawer } from '../Drawer/actions';
import { getIsDrawerOpen } from '../Drawer/selectors';

import { logoutRequest } from '../Login/actions';
import { getUsername } from '../Login/selectors';

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    paddingRight: '0 !important', // prevent modal from pushing appbar
  },
  toolbar: {
    minWidth: 320,
  },
  grow: {
    flexGrow: 1,
  },
  contextTitle: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  userAvatar: {
    marginRight: 6,
  },
  loginButton: {
    marginLeft: 6,
  },
  menuButton: {
    marginRight: 24,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

export class MyAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileMoreAnchorEl: null,
    };
  }

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleMobileMenuOpen = e => {
    this.setState({ mobileMoreAnchorEl: e.currentTarget });
  };

  render() {
    const {
      classes,
      open,
      openDrawer,
      closeDrawer,
      username,
      logoutRequest,
    } = this.props;

    const { mobileMoreAnchorEl } = this.state;

    const mobileMenuId = 'mobile-appbar-controls';
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(mobileMoreAnchorEl)}
        onClose={this.handleMobileMenuClose}
      >
        {username ? (
          <div>
            <MenuItem>
              <IconButton
                aria-label="account of current user"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                this.handleMobileMenuClose();
                logoutRequest();
              }}
            >
              <IconButton aria-label="logout" color="inherit">
                <ExitToAppIcon />
              </IconButton>
              Logout
            </MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem
              component={Link}
              to="/login"
              onClick={this.handleMobileMenuClose}
            >
              Login
            </MenuItem>
            <MenuItem
              component={Link}
              to="/register"
              onClick={this.handleMobileMenuClose}
            >
              Register
            </MenuItem>
          </div>
        )}
      </Menu>
    );

    return (
      <div>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={open ? closeDrawer : openDrawer}
              edge="start"
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.contextTitle}>
              <Typography variant="h6" noWrap>
                AppName
              </Typography>
            </div>
            <Search />
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {username ? (
                <>
                  <Avatar className={classes.userAvatar}>
                    {username.charAt(0)}
                  </Avatar>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={logoutRequest}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <div>
                    <Button
                      variant="contained"
                      component={Link}
                      to="/register"
                      onClick={this.handleMobileMenuClose}
                    >
                      Register
                    </Button>
                  </div>
                  <div>
                    <Button
                      className={classes.loginButton}
                      variant="contained"
                      component={Link}
                      to="/login"
                      onClick={this.handleMobileMenuClose}
                    >
                      Login
                    </Button>
                  </div>
                </>
              )}
              <div />
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: getUsername(state),
  open: getIsDrawerOpen(state),
});

const mapDispatchToProps = {
  logoutRequest,
  openDrawer,
  closeDrawer,
};

export const StyledAppBar = withStyles(styles)(MyAppBar);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(StyledAppBar),
);
