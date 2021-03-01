import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  spinnerWraper : {
    display : 'flex',
    width : '100%',
    justifyContent : 'center'
  },
  spinner: {
    display : 'flex',
    width : '100%',
    justifyContent : 'center'
  },
}));

const Spinner = () => {

    const classes = useStyles();

    return (
        <div className={classes.spinnerWrapper}>
          <div className={classes.spinner}>
            <CircularProgress />
          </div>
        </div>
    )
}

export default Spinner
