import React from 'react';
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
import StoreItem from './StoreItem';
import Spinner from '../layouts/Spinner'



const useStyles = makeStyles({
    table: {
      minWidth: 550
    },
  });


const StoreList = ({stores : {stores ,loading}}) => {

    const classes = useStyles();

    return (
        <div className="list-wrapper">
             {  
            loading ? <Spinner /> : (
                <>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">              
                        <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">Store Name</TableCell>
                            <TableCell align="left">Store Number</TableCell>
                            <TableCell align="left">Store Admin</TableCell>
                            <TableCell align="left">Store Phone</TableCell>
                            <TableCell align="left">Store Floor</TableCell>
                            <TableCell align="left">Store Currency</TableCell>
                            <TableCell align="left">Store Description</TableCell>
                            <TableCell align="center">Edit</TableCell>
                            <TableCell align="center">Delete</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {/* Categorie ITEM */}

                        {stores.map((store,index) => <StoreItem key={index} store={store} />)}

                        </TableBody>
                    </Table>
                </TableContainer>
                </>
            )
        }
        </div>
    )
}


StoreList.propTypes = {
    stores : PropTypes.object.isRequired,
}

export default StoreList
