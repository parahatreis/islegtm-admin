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
import CategorieItem from './CategorieItem';
import Spinner from '../layouts/Spinner'



const useStyles = makeStyles({
    table: {
      minWidth: 550
    },
  });


const CategorieList = ({categories : {categories ,loading}}) => {

    const classes = useStyles();

    const [dataCategories,setDataCategories] = useState(null);

    useEffect(() => {
        setDataCategories(categories);
    }, [categories])


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
                            <TableCell align="left">Kategoriýa Suraty</TableCell>
                            <TableCell align="left">Kategoriýa Ady</TableCell>
                            <TableCell align="left">Subkategoriýa sany</TableCell>
                            <TableCell align="center">Üýtgetmek</TableCell>
                            <TableCell align="center">Pozmak</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {/* Categorie ITEM */}

                        {
                            dataCategories ? 
                            categories.map((categorie,index) => <CategorieItem key={index} categorie={categorie} />) : 
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


CategorieList.propTypes = {
    categories : PropTypes.object.isRequired,
}

export default CategorieList
