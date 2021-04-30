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
import BrandItem from './BrandItem';
import Spinner from '../layouts/Spinner'



const useStyles = makeStyles({
    table: {
      minWidth: 550
    },
  });


const BrandList = ({brands : {brands ,loading}}) => {

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
                            <TableCell align="left">Brend Suraty</TableCell>
                            <TableCell align="left">Brend Ady</TableCell>
                            <TableCell align="left">Subkategoriýalar</TableCell>
                            <TableCell align="center">Üýtgetmek</TableCell>
                            <TableCell align="center">Pozmak</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {/* Categorie ITEM */}

                        {brands.map((brand,index) => <BrandItem key={index} brand={brand} />)}

                        </TableBody>
                    </Table>
                </TableContainer>
                </>
            )
        }
        </div>
    )
}


BrandList.propTypes = {
    brands : PropTypes.object.isRequired,
}

export default BrandList
