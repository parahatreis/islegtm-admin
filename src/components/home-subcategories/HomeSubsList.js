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
import axios from 'axios';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
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
    const [data,setData] = useState(null);
    const [disabled,setDisable] = useState(false)
    const [subcategories,setSubCategories] = useState(null);


    useEffect(() => {
        setData(home_subcategories);
    }, [home_subcategories]);


    const addHomeSubcat = () => {
        setDisable(true)
        return setData([
            ...data,
            {
                home_subcategorie_id : 'last'
            }
        ])
    }


    // GET ALL SubCategories
    useEffect(() => {
        axios.get(`/v1/subcategories`)
            .then((res) => {
                if (res.data) {
                    setSubCategories(res.data);
                }
            })
            .catch((err) => console.error('SubCategories: ',err))

    }, [])


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
                            data.map((obj,index) => <HomeSubsItem key={index} obj={obj} index={index} subcats={subcategories} />) : 
                            'Loading'
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
                <div>
                    &nbsp; &nbsp;  
                </div>
                <Button variant="outlined" disabled={disabled} color="primary"
                    onClick={() => addHomeSubcat()}
                >
                    <AddCircleOutlineIcon />
                </Button>
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
