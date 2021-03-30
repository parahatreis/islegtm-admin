import React, { useState, useEffect} from 'react';
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
import axios from 'axios';
import Chip from '@material-ui/core/Chip';

// 
import { deleteStore } from '../../actions/storesAction';
import Spinner from '../layouts/Spinner';




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



const StoreItem = ({deleteStore,store :{
    store_id,
    store_name,
    store_number,
    store_phone,
    store_description,
    store_floor,
    store_currency,
    store_admins
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
          <TableCell align="left">{store_id.slice(0,5)} ...</TableCell>
          <TableCell align="left">{store_name}</TableCell>
          <TableCell align="left">{store_number && store_number}</TableCell>
          <TableCell align="left">
          {
              store_admins && 
              store_admins.map((data,index) => {
                  return <Chip key={index} label={data.store_admin_name} variant='outlined' />
              })
            }
          </TableCell>
          <TableCell align="left">{store_phone && store_phone}</TableCell>
          <TableCell align="left">{store_floor && store_floor}</TableCell>
          <TableCell align="left">{store_currency && store_currency}</TableCell>
          <TableCell align="left">{store_description && store_description}</TableCell>
          {/* Edit */}
          <TableCell align="center">
            <Link to={`/stores/edit-store/${store_id}`}>
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
              <div key={store_id}>
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
                        <h3 id="transition-modal-title">Hakykatdanam shu <span style={{color : 'blue'}}>{store_name}</span> story pozmak isleyanizmi?</h3>
                        <p id="transition-modal-description">
                          Store pozulandan son yzyna gaydyp gelmeyar
                        </p>
                        <div className={classes.btnGroup}>
                          <Button onClick={handleClose}>
                            Cancel
                          </Button>
                          <Button variant="contained" color="secondary"
                            onClick={() => {
                              deleteStore(store_id);
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

StoreItem.propTypes = {
  deleteStore: PropTypes.func.isRequired,
  store : PropTypes.object.isRequired,
}

export default connect(null, {
    deleteStore,
})(StoreItem);


