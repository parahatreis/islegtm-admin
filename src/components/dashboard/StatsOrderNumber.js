import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import {Link} from 'react-router-dom';
// 


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginRight : '10px',
    color : '#ff1744'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const SimpleCard = () => {

    const classes = useStyles();

    const [number,setNumber] = useState(null)


    useEffect(() => {
        axios.get(`/v1/orders`)
            .then((res) => {
                if (res.data.count) {
                    setNumber(res.data.length);
                }
            })
            .catch((err) => console.error('SubCategories: ',err))
    }, [])

    return (
    <Card className={classes.root}>
        <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            Sargyt sany
        </Typography>
        <Typography variant="h5" component="h2">
            {number && number}
        </Typography>
        </CardContent>
        <CardActions>
        <Link to="/products">
            <Button size="small">
                Sargytlar
            </Button>
        </Link>
        </CardActions>
    </Card>
    );
};

export default SimpleCard;