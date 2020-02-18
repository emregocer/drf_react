import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const styles = theme => ({
  errorPage: {
    marginTop: theme.spacing(8),
  },
});

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      info: null,
    };
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error,
      info,
    });
  }

  render() {
    const { hasError, error, info } = this.state;
    const { classes, children } = this.props;
    if (hasError) {
      return (
        <Container maxWidth="sm">
          <div className={classes.errorPage}>
            <Typography variant="h3">
              Oops, something went wrong :(
            </Typography>
            <Typography variant="h6">
              The error: {error.toString()}
            </Typography>
            <Typography variant="subtitle1">
              Where it occured: {info.componentStack}
            </Typography>
          </div>
        </Container>
      );
    }
    return children;
  }
}

export default withStyles(styles)(ErrorBoundary);
