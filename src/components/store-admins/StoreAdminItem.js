import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios'
// 
import { deleteStoreAdmin } from '../../actions/storeAdminsAction';
import Spinner from '../layouts/Spinner'



const useStyles = makeStyles({
    table: {
      minWidth: 550
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



const StoreAdminItem = ({deleteStoreAdmin,store_admin :{
    store_admin_id,
    store_admin_name,
    store_admin_phone,
    store_admin_username,
    store
}}) => {


    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = (e) => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <> 
            {/* Store-Item */}
        <TableRow key="ID">
            {/* Store ID */}
            <TableCell align="left">{store_admin_id && store_admin_id.slice(0,5)} ...</TableCell>
            {/* Store Admin Name */}
            <TableCell align="left">{store_admin_name}</TableCell>
            {/* Store Admin UserName */}
            <TableCell align="left">{store_admin_username && store_admin_username}</TableCell>
            {/* Store */}
            <TableCell align="left">{
              store && store.store_name
            }</TableCell>
            {/* Store Admin Phone */}
            <TableCell align="left">{store_admin_phone && store_admin_phone}</TableCell>
            {/* Store Admin Password */}
            {/* <TableCell align="left">{store_admin_password && store_admin_password}</TableCell> */}
            {/* Edit */}
            <TableCell align="center">
              <Link to={`/store-admins/edit-store-admin/${store_admin_id}`}>
                <Button 
                  color="primary"
                >
                <EditIcon />
                </Button>
              </Link>
            </TableCell>
            {/* Delete */}
            <TableCell align="center">
                <Button
                onClick={handleOpen}
                color="secondary"
                >
                <DeleteOutlineIcon />
                </Button>
                <div key={store_admin_id}>
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
                      >
                        <div className={classes.paper}>
                          <h3 id="transition-modal-title">Hakykatdanam shu <span style={{color : 'blue'}}>{store_admin_name}</span> store adminy pozmak isleyanizmi?</h3>
                          <p id="transition-modal-description">
                            Store Admin pozulandan son yzyna gaydyp gelmeyar
                          </p>
                          <div className={classes.btnGroup}>
                            <Button onClick={handleClose}>
                              Cancel
                            </Button>
                            <Button variant="contained" color="secondary"
                              onClick={() => {
                                deleteStoreAdmin(store_admin_id);
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </Fade>
                    </Modal>
                </div>
            </TableCell>

        </TableRow>  
        </>
    )
}

StoreAdminItem.propTypes = {
  deleteStoreAdmin: PropTypes.func.isRequired,
  store_admin : PropTypes.object.isRequired,
}

export default connect(null, {
  deleteStoreAdmin,
})(StoreAdminItem);


