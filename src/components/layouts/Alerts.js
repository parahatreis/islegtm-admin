import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth : '400px',
    margin : '1rem',
    position : 'fixed',
    top: '60px',
    right : '0',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Alerts = ({alerts}) => {

  const classes = useStyles();
  const [data,setData] = useState([])
  
  useEffect(() => {
    setData(alerts)
  }, [alerts])

  return (
    <div className={classes.root}>
      {
        data.length > 0 &&
        data.map((alert) => (
          <Alert key={alert.id} severity={alert.alertType}>
            {alert.msg}
          </Alert>
        ))
      }
    </div>
  );
};

Alerts.propTypes = {
    alerts: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
    alerts : state.alerts
})

export default connect(mapStateToProps)(Alerts);