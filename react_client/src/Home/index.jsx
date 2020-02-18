import React from 'react';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  home: {
    margin: theme.spacing(2),
  },
});

export const Home = ({ classes }) => {
  return (
    <div className={classes.home}>
      <h1>Homepage.</h1>
    </div>
  );
};

export default withStyles(styles)(Home);
