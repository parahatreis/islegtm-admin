import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
// 
import { deleteSize } from '../../actions/sizesAction';




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



const SizeItem = ({deleteSize,size :{
    size_type,
    size_type_id,
    size_names,
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
          <TableCell align="left">{size_type_id && size_type_id.slice(0,5)} ...</TableCell>
          <TableCell align="left">{size_type && size_type}</TableCell>
          <TableCell align="left">
          {
              size_names && 
              size_names.map((data,index) => {
                  return <Chip key={index} label={data.size_name} variant='outlined' />
              })
            }
          </TableCell>
          {/* Delete */}
          <TableCell align="center">
              <Button
              onClick={handleOpen}
              color="secondary"
              >
              <DeleteOutlineIcon />
              </Button>
              <div key={size_type_id && size_type_id}>
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
                        <h3 id="transition-modal-title">Hakykatdanam shu <span style={{color : 'blue'}}>{size_type}</span> story pozmak isleyanizmi?</h3>
                        <p id="transition-modal-description">
                          Store pozulandan son yzyna gaydyp gelmeyar
                        </p>
                        <div className={classes.btnGroup}>
                          <Button onClick={handleClose}>
                            Cancel
                          </Button>
                          <Button variant="contained" color="secondary"
                            onClick={() => {
                              deleteSize(size_type_id);
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

SizeItem.propTypes = {
  deleteSize: PropTypes.func.isRequired,
  size : PropTypes.object.isRequired,
}

export default connect(null, {
  deleteSize,
})(SizeItem);


