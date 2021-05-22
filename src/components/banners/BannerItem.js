import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
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
import { deleteBanner } from '../../actions/bannersAction';
import Placeholder from '../../img/BG.svg';
import apiPath from '../../utils/apiPath';
import { setAlert } from '../../actions/alertsAction'



const useStyles = makeStyles({
    table: {
      minWidth: 650
    },
    primaryText : {
      color : '#3f51b5'
    },
    image : {
      width : '200px',
      height : '100px',
    },
    paper: {
      position: 'absolute',
      left : "50%",
      top : "50%",
      transform : "translate(-50%,-50%)",
      width: 400,
      backgroundColor: 'white',
      boxShadow: '0 0 10px grey',
      padding: '10px',
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



const BannerItem = ({deleteBanner,setAlert,banner :{
    banner_id,
    banner_name,
    banner_url,
    banner_image
}}) => {


    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [image,setImage] = useState(Placeholder);
    const history = useHistory()


    useEffect(() => {
      if(banner_image){
        if(banner_image){
          setImage(`${apiPath()}/${banner_image}`)
        }
      }
    }, [banner_image])


    const handleOpen = (e) => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <> 
            {/* Banner-Item */}
        <TableRow key="ID">
            {/* Banner ID */}
            <TableCell align="left">{banner_id.slice(0,5)} ...</TableCell>
            {/* Banner Image */}
            <TableCell align="left">
                <Avatar className={classes.image} src={image} variant="square"/>
            </TableCell>
            {/* Banner Name */}
            <TableCell align="left">{banner_name && banner_name}</TableCell>
            {/* Banner URL */}
            <TableCell align="left">
              <a href={banner_url ? banner_url : '#'} rel="noreferrer" target="_blank">
                {
                  banner_url.length > 40 ? banner_url.slice(0,40) +  '..' : banner_url
                }
              </a>
            </TableCell>
            {/* Edit */}
            <TableCell align="center">
              <Link to={`/banners/edit-banner/${banner_id}`}>
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
                href="#delete"
                >
                <DeleteOutlineIcon />
                </Button>
                <div key={banner_id}>
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
                          <h3 id="transition-modal-title">Hakykatdanam şu <span style={{color : 'blue'}}>{banner_name}</span> banneri pozmak isleýäňizmi?</h3>
                          <p id="transition-modal-description">
                            Banner pozulandan soň yzyna gaýdyp gelmeyar!
                          </p>
                          <div className={classes.btnGroup}>
                            <Button onClick={handleClose}>
                              Goýbolsun et
                            </Button>
                            <Button variant="contained" color="secondary"
                              onClick={() => {
                                deleteBanner(banner_id).then((res) => {
                                    if(res === 200){
                                        return history.push('/banners')
                                    }
                                    else{
                                        return setAlert('Error!', 'error');
                                    }
                                });
                              }}
                            >
                              Poz
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

BannerItem.propTypes = {
  deleteBanner: PropTypes.func.isRequired,
  setAlert: PropTypes.func,
  banner : PropTypes.object,
}

export default connect(null, {
  deleteBanner,
  setAlert
})(BannerItem);


