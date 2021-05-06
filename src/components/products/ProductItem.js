import React, {useEffect,useState,useRef} from 'react';
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
import Chip from '@material-ui/core/Chip';
// 
import { deleteProduct, changeStatus } from '../../actions/productsAction';
import Placeholder from '../../img/BG.svg';
import apiPath from '../../utils/apiPath'



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
        product_name_tm,
        price_tmt,
        price_usd,
        product_status,
        brand,
        subcategorie,
        store,
        product_images,
        stocks
    },
    deleteProduct,changeStatus
}) => {


    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const nodeRef = useRef(null);
    const [image,setImage] = useState(Placeholder);
    const [status,setStatus] = useState(false);

    useEffect(() => {
      if(product_images){
        if(product_images[0]){
          setImage(`${apiPath()}/${product_images[0]}`)
        }
      }
    }, [product_images])

    const changeProductStatus = () => {
      setStatus(!status);
      changeStatus(product_id,!product_status)
    };

    useEffect(() => {
      setStatus(product_status);
    }, [product_status])


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
                src={image}
                variant="square" 
                />
            </TableCell>
            {/* Product Name */}
            <TableCell align="left">{product_name_tm}</TableCell>
            {/* Price(TMT) */}
            <TableCell align="left">{price_tmt && price_tmt}</TableCell>
            {/* Price(USD) */}
            <TableCell align="left">{price_usd && price_usd}</TableCell>
            {/* Brand */}
            <TableCell align="left">{brand && brand.brand_name}</TableCell>
            {/* Subcategorie */}
            <TableCell align="left">{subcategorie && subcategorie.subcategorie_name_tm}</TableCell>
            {/* Store No */}
             <TableCell align="left">{store && store.store_name}</TableCell>
             {/* Stok No */}
             <TableCell align="left">{
                stocks &&
                stocks.map((stock,index) => (
                   <>
                      <div style={{display : 'flex'}}>
                         <Chip
                            key={index}
                            label={`Ölçeg ${stock.sizeName && stock.sizeName.size_name}`} variant='outlined'
                         />
                         <Chip
                            key={index}
                            label={stock.stock_quantity && stock.stock_quantity}
                         />
                      </div>
                      <br />
                   </>
                ))
            }</TableCell>
            {/* Status */}
            <TableCell align="left">
                <FormControlLabel
                    value="status"
                    control={<Switch checked={status && status} color="primary" onChange={(e) => changeProductStatus()} />
                  }
                />
            </TableCell>
                {/* Edit */}
                <TableCell align="left">
                <Button 
                color="primary"
                href={`/products/edit-product/${product_id}`}
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
                  <h2 id="transition-modal-title">Hakykatdanam şu harydy pozmak isleýäňizmi?</h2>
                  <p id="transition-modal-description">
                    Haryt pozulandan soň yzyna gaýdyp gelmeýär!
                  </p>
                  <div className={classes.btnGroup}>
                    <Button variant="contained">
                      Goybolsun et
                    </Button>
                    <Button variant="contained" color="secondary"
                      onClick={() => {
                        deleteProduct(product_id);
                      }}
                    > 
                      Poz
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
  changeStatus: PropTypes.func.isRequired,
}

export default connect(null, {
  deleteProduct,
  changeStatus
})(ProductItem);
