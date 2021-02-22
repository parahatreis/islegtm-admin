import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TableRow from '@material-ui/core/TableRow';
// 
import { deleteProduct } from '../../actions/productsAction';



const useStyles = makeStyles({
    table: {
      minWidth: 650
    },
    primaryText : {
      color : '#3f51b5'
    },
    image : {
      width : '100px',
      height : '100px'
    },
    paper: {
      position: 'absolute',
      left : "50%",
      top : "50%",
      transform : "translate(-50%,-50%)",
      width: 400,
      backgroundColor: 'white',
      boxShadow: '0 0 10px grey',
      padding: '20px',
      outline : 'none',
      borderRadius : '5px',
      display : 'flex',
      flexDirection : "column" ,
      alignItems :'center'
    },
    btnGroup : {
      display : 'flex',
      width : '60%',
      justifyContent :'space-between',
    }
  });



const ProductItem = ({product : 
    {
        product_id,
        product_name,
        price_tmt,
        price_usd,
        product_status,
        store_id,
        subcategorie_id
    },
    deleteProduct
}) => {


    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const nodeRef = React.useRef(null);

    const handleOpen = (e) => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <> 
            {/* Product-Item */}
        <TableRow key="ID" data-row={product_id}>
            <TableCell component="th" scope="row">
                184214
            </TableCell>
            {/* Product Image */}
            <TableCell align="left">
                <Avatar 
                className={classes.image}
                // src="/broken-image.jpg"
                variant="square" 
                />
            </TableCell>
            {/* Product Name */}
            <TableCell align="left">{product_name}</TableCell>
            {/* Price(TMT) */}
            <TableCell align="left">{price_tmt}</TableCell>
            {/* Price(USD) */}
            <TableCell align="left">{price_usd}</TableCell>
            {/* Brand */}
            <TableCell align="left">Zara</TableCell>
            {/* Subcategorie */}
            <TableCell align="left">T-shirts</TableCell>
            {/* Store No */}
            <TableCell align="left">135</TableCell>
            {/* Status */}
            <TableCell align="left">
                <FormControlLabel
                value="status"
                control={<Switch color="primary" />}
                />
            </TableCell>
                {/* Edit */}
                <TableCell align="left">
                <Button 
                color="primary"
                href="#edit"
                >
                <EditIcon />
                </Button>
                </TableCell>
                {/* Delete */}
                <TableCell align="left">
                <Button
                onClick={handleOpen}
                color="secondary"
                href="#delete"
                >
                <DeleteOutlineIcon />
                </Button>
                </TableCell>

        </TableRow>
               
          <div>
          {/* MODAL FOR DELETE */}
            <Modal
              open={open}
              onClose={(e) => handleClose(e)}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}
                ref={nodeRef}
              >
                <div className={classes.paper}>
                  <h2 id="transition-modal-title">Hakykatdanam bu harydy pozmak isleyanizmi?</h2>
                  <p id="transition-modal-description">
                    Haryt pozulandan son yzyna gaydyp gelmeyar
                  </p>
                  <div className={classes.btnGroup}>
                    <Button variant="contained">
                      Cancel
                    </Button>
                    <Button variant="contained" color="secondary"
                      onClick={() => {
                        deleteProduct(product_id);
                        console.log(product_id)
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Fade>
            </Modal>
        </div>  
        </>
    )
}

ProductItem.propTypes = {
  deleteProduct: PropTypes.func.isRequired,
}

export default connect(null, {
  deleteProduct
})(ProductItem);
