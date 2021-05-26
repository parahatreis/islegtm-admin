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
                           <TableCell align="left">Mag. Ady</TableCell>
                           <TableCell align="left">Mag. Belgisi</TableCell>
                           <TableCell align="left">Mag. Admin</TableCell>  
                           <TableCell align="left">Mag. Gaty</TableCell>
                           <TableCell align="left">Mag. El telefony</TableCell>
                           <TableCell align="left">Mag. Pul birligi</TableCell>
                           <TableCell align="left">Haryt sany</TableCell>
                           <TableCell align="left">Mag. Maglumaty</TableCell>
                           <TableCell align="center">Üýtgetmek</TableCell>
                           <TableCell align="center">Pozmak</TableCell>
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
