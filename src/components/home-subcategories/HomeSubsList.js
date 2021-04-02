import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { makeStyles } from '@material-ui/core/styles';
// 
import HomeSubsItem from './HomeSubsItem';
import Spinner from '../layouts/Spinner'



const useStyles = makeStyles({
    table: {
      minWidth: 550
    },
  });


const HomeSubsList = ({home : {home_subcategories ,loading}}) => {

    const classes = useStyles();

    const [data,serData] = useState(null);

    useEffect(() => {
        serData(home_subcategories);
    }, [home_subcategories])


    return (
        <div className="list-wrapper">
             {  
            loading ? <Spinner /> : (
                <>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">              
                        <TableHead>
                        <TableRow>
                            <TableCell align="left">Order</TableCell>
                            <TableCell align="left">Subcategories</TableCell>
                            <TableCell align="center">Delete</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            data ? 
                            data.map((obj,index) => <HomeSubsItem key={index} obj={obj} index={index} />) : 
                            'Loading'
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
                </>
            )
        }
        </div>
    )
}


HomeSubsList.propTypes = {
    home : PropTypes.object.isRequired,
}

export default HomeSubsList