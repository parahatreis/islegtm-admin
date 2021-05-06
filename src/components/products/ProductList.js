import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { makeStyles } from '@material-ui/core/styles';
//
import ProductItem from './ProductItem';
import Spinner from '../layouts/Spinner'
import { getProducts, setPageNumber } from '../../actions/productsAction';



const useStyles = makeStyles({
  table: {
    minWidth: 550
  },
});

const ProductList = ({products : {products, loading, count_products}, setPageNumber, getProducts}) => {

  const classes = useStyles();
  const [pageCount, setCounter] = useState(0);

  // Calculate Page Number
  useEffect(() => {
    setCounter(Math.ceil(count_products / 10));
    setPageNumber(0)
 }, [count_products, pageCount, setPageNumber]);


  // Pagination Click
  const handlePageClick = (data) => {
    let selected = data.selected;
    // set Page Number
    setPageNumber(selected * 10);
    // Get next page products 
    getProducts(selected * 10, null);
    // scroll top
    window.scrollTo(0, 0);
   }
   console.log(products)


  return (
    <>
      <div className="list-wrapper">
          {
            loading ? <Spinner /> : (
                <>
                  {/* Product Item */}
                  <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">              
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Haryt Kody</TableCell>
                        <TableCell align="left">Haryt Suraty</TableCell>
                        <TableCell align="left">Haryt Ady</TableCell>
                        <TableCell align="left">Bahasy (TMT)</TableCell>
                        <TableCell align="left">Bahasy (USD)</TableCell>
                        <TableCell align="left">Brend</TableCell>
                        <TableCell align="left">Subkategoriýa</TableCell>
                        <TableCell align="left">Magazin No</TableCell>
                        <TableCell align="left">Stok sany</TableCell>
                        <TableCell align="left">Status</TableCell>
                        <TableCell align="center">Edit</TableCell>
                        <TableCell align="center">Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        products.map((product,index) => <ProductItem key={index} product={product} />)
                      }
                
                    </TableBody>
                  </Table>
                </TableContainer>
                </>
            )
          }
        </div>
        
        <ReactPaginate
           onPageChange={handlePageClick}
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
           pageCount={pageCount && pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            initialPage={0}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
        />
    </>
  );
}

ProductList.propTypes = {
  products: PropTypes.object.isRequired,
  getProducts: PropTypes.func.isRequired,
  setPageNumber: PropTypes.func.isRequired,
}

export default connect(null, {
  getProducts,
  setPageNumber
})(ProductList);