import React, {useEffect} from 'react';
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
import SubCategorieItem from './SubCategorieItem';
import Spinner from '../layouts/Spinner'



const useStyles = makeStyles({
    table: {
      minWidth: 550
    },
  });


const SubCategorieList = ({subcategories : {subcategories ,loading}}) => {

    const classes = useStyles();

    useEffect(() => {
        console.log(subcategories)
    }, [subcategories])

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
                            <TableCell align="left">SubCategorie Image</TableCell>
                            <TableCell align="left">SubCategorie Name</TableCell>
                            <TableCell align="left">Categorie</TableCell>
                            <TableCell align="left">Product Number</TableCell>
                            <TableCell align="left">Size</TableCell>
                            <TableCell align="left">Renk</TableCell>
                            <TableCell align="left">Size Type</TableCell>
                            <TableCell align="center">Edit</TableCell>
                            <TableCell align="center">Delete</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {/* Categorie ITEM */}

                        {subcategories.map((subcategorie,index) => <SubCategorieItem key={index} subcategorie={subcategorie} />)}

                        </TableBody>
                    </Table>
                </TableContainer>
                </>
            )
        }
        </div>
    )
}


SubCategorieList.propTypes = {
    subcategories : PropTypes.object.isRequired,
}

export default SubCategorieList
