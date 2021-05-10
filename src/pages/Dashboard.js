import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// 
import StatsProductNumber from '../components/dashboard/StatsProductNumber'
import StatsOrderNumber from '../components/dashboard/StatsOrderNumber'
import StatsUserNumber from '../components/dashboard/StatsUserNumber'


const useStyles = makeStyles((theme) => ({
   root: {
       '& > *': {
           margin: theme.spacing(1),
           marginRight : '0',
           marginLeft : '0',
       },
   },
   flex : {
       display : 'flex',
   },
}));

const Dashboard = () => {

   const classes = useStyles();


   return (
      <section className="container products-section">
         <header>
            <Typography variant="h4" component="h2">
               Dolandyryş paneli
            </Typography>
         </header>
         <div className={classes.flex}>
            <StatsProductNumber />
            <StatsOrderNumber />
            <StatsUserNumber />
         </div>
      </section>
   )
}

export default Dashboard
