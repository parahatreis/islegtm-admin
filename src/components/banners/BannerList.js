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
import BannerItem from './BannerItem';
import Spinner from '../layouts/Spinner'



const useStyles = makeStyles({
    table: {
      minWidth: 550
    },
  });


const BannerList = ({banners : {banners ,loading}}) => {

    const classes = useStyles();

    const [dataBanners,setBannerData] = useState(null);

    useEffect(() => {
        setBannerData(banners);
    }, [banners])


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
                            <TableCell align="left">Banner Suraty</TableCell>
                            <TableCell align="left">Banner Ady</TableCell>
                            <TableCell align="left">Banner URL</TableCell>
                            <TableCell align="center">Üýtgetmek</TableCell>
                            <TableCell align="center">Pozmak</TableCell>
                        </TableRow>
                         </TableHead>
                         {
                            dataBanners && 
                               (
                                 <TableBody>
                                     {dataBanners.map((banner,index) => <BannerItem key={index} banner={banner} />)}
                                 </TableBody>
                            )
                        }
                    </Table>
                </TableContainer>
                </>
            )
        }
        </div>
    )
}


BannerList.propTypes = {
    banners : PropTypes.object.isRequired,
}

export default BannerList
