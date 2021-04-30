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
                            <TableCell align="left">Subkategoriýa Suraty</TableCell>
                            <TableCell align="left">Subkategoriýa Ady</TableCell>
                            <TableCell align="left">Kategoriýa</TableCell>
                            <TableCell align="left">Haryt sany</TableCell>
                            <TableCell align="left">Ölçeg görnüşi</TableCell>
                            <TableCell align="center">Üýtgetmek</TableCell>
                            <TableCell align="center">Pozmak</TableCell>
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
