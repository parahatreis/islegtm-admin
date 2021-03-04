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
import StoreAdminItem from './StoreAdminItem';
import Spinner from '../layouts/Spinner'



const useStyles = makeStyles({
    table: {
      minWidth: 550
    },
  });


const StoreAdminList = ({store_admins : {store_admins ,loading}}) => {

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
                            <TableCell align="left">S.Admin Name</TableCell>
                            <TableCell align="left">S.Admin Username</TableCell>
                            <TableCell align="left">Store</TableCell>
                            <TableCell align="left">S.Admin Phone</TableCell>
                            <TableCell align="left">S.Admin Password</TableCell>
                            <TableCell align="center">Edit</TableCell>
                            <TableCell align="center">Delete</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {/* Categorie ITEM */}

                        {store_admins.map((store_admin,index) => <StoreAdminItem key={index} store_admin={store_admin} />)}

                        </TableBody>
                    </Table>
                </TableContainer>
                </>
            )
        }
        </div>
    )
}


StoreAdminList.propTypes = {
    store_admins : PropTypes.object.isRequired,
}

export default StoreAdminList
