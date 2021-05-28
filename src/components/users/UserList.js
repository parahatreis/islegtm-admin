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
// import OrderItem from './OrderItem';
import Spinner from '../layouts/Spinner'



const useStyles = makeStyles({
    table: {
      minWidth: 550
    },
  });


const UserList = ({users : {users ,loading}}) => {

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
                            <TableCell align="left">Ady</TableCell>
                            <TableCell align="left"> Telefony </TableCell>
                               <TableCell align="left">Adres(Salgysy)</TableCell>
                            <TableCell align="left">Mail</TableCell>
                            <TableCell align="left">Agza bolan senesi</TableCell>
                            <TableCell align="left">Sargyt sany</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {/* Categorie ITEM */}
                        {/* {
                            orders.map((order,index) => <OrderItem key={index} order={order} />)
                        } */}

                        </TableBody>
                    </Table>
                </TableContainer>
                </>
            )
        }
        </div>
    )
}


UserList.propTypes = {
    users : PropTypes.object.isRequired,
}

export default UserList
