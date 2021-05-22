import React, {useEffect, useState} from 'react';
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
import Chip from '@material-ui/core/Chip';
// 
import { deletBrand } from '../../actions/brandsActions';
import Placeholder from '../../img/BG.svg';
import apiPath from '../../utils/apiPath';
import { setAlert } from '../../actions/alertsAction'


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



const BrandItem = ({deletBrand,setAlert,brand :{
    brand_id,
    brand_name,
    brand_image,
    subcategories,
}}) => {


    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(Placeholder);
    const history = useHistory()

    useEffect(() => {
      if(brand_image){
        if(brand_image){
          setImage(`${apiPath()}/${brand_image}`)
        }
      }
    }, [brand_image])


    const handleOpen = (e) => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <> 
            {/* Brand-Item */}
        <TableRow key="ID">
            {/* Brand ID */}
            <TableCell align="left">{brand_id.slice(0,5)} ...</TableCell>
            {/* Brand Image */}
            <TableCell align="left">
                <Avatar className={classes.image} src={image} variant="square"/>
            </TableCell>
            {/* Brand Name */}
            <TableCell align="left" >{brand_name}</TableCell>
            {/* SubCategories */}
            <TableCell align="left">
              {
                subcategories && subcategories.length > 0 ? 
                subcategories.map((data,index) => {
                    if(index < 3){
                      return <Chip key={data.subcategorie_id} label={data.subcategorie_name_tm} variant='outlined' />
                    }
                }) : ""
              }
            </TableCell>
            {/* Edit */}
            <TableCell align="center">
              <Link to={`/brands/edit-brand/${brand_id}`}>
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
                <div key={brand_id}>
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
                          <h3 id="transition-modal-title">Hakykatdanam şu <span style={{color : 'blue'}}>{brand_name}</span> brendi pozmak isleyaňizmi?</h3>
                          <p id="transition-modal-description">
                            Brend pozulandan soň yzyna gaýdyp gelmeýär!
                          </p>
                          <div className={classes.btnGroup}>
                            <Button onClick={handleClose}>
                            Goýbolsun et
                            </Button>
                            <Button variant="contained" color="secondary"
                              onClick={() => {
                                deletBrand(brand_id).then((res) => {
                                    if(res === 200){
                                        return history.push('/brands')
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

BrandItem.propTypes = {
    deletBrand: PropTypes.func.isRequired,
    setAlert: PropTypes.func,
    brand : PropTypes.object.isRequired,
}

export default connect(null, {
    deletBrand,
    setAlert
})(BrandItem);


