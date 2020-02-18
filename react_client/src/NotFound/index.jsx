import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  path: {
    backgroundColor: `rgba(${0}, ${0}, ${0}, ${0.3})`,
  },
  padding: {
    margin: theme.spacing(4),
  },
});

export const NotFound = ({ classes, location }) => {
  return (
    <div className={classes.padding}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h1">404</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3">
            <div className={classes.path}>{location.pathname}</div> is
            not valid.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(NotFound);
