import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
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
import axios from 'axios'
import Chip from '@material-ui/core/Chip';
// 
import { deletBrand } from '../../actions/brandsActions';
import Placeholder from '../../img/BG.svg';
import imgPath from '../../utils/imgPath'
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



const BrandItem = ({deletBrand,brand :{
    brand_id,
    brand_name,
    brand_image,
    subcategories,
}}) => {


    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(Placeholder);
    const [localLoading, setLocalLoading] = useState(true)
    const [subcategorieData,setSubcategorieData] = useState(null);



    useEffect(() => {
      if(brand_image){
        setImage(imgPath(brand_image))
      }
    }, [brand_image])


    // GET Categorie Name
    useEffect(() => {
      if(brand_id){
        axios.get(`/api/subcategories`,{
          params : {
            getImage : false
          }
        })
          .then((res) => {
             if (res.data) {
                setLocalLoading(false)
                setSubcategorieData(res.data);
             }
          })
          .catch((err) => console.error('Categories: ',err))
      }
  }, [brand_id])


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
                localLoading ? <Spinner/> : 
                subcategories && subcategorieData ? 
                subcategories.map((data,index) => {
                    if(index < 3){
                      const myData = subcategorieData.find((val) => val.subcategorie_id === data.subcategorie_id);
                      return <Chip key={myData.subcategorie_id} label={myData.subcategorie_name} variant='outlined' />
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
                          <h3 id="transition-modal-title">Hakykatdanam shu <span style={{color : 'blue'}}>{brand_name}</span> brendi pozmak isleyanizmi?</h3>
                          <p id="transition-modal-description">
                            Brend pozulandan son yzyna gaydyp gelmeyar
                          </p>
                          <div className={classes.btnGroup}>
                            <Button onClick={handleClose}>
                              Cancel
                            </Button>
                            <Button variant="contained" color="secondary"
                              onClick={() => {
                                deletBrand(brand_id);
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

BrandItem.propTypes = {
    deletBrand: PropTypes.func.isRequired,
  brand : PropTypes.object.isRequired,
}

export default connect(null, {
    deletBrand,
})(BrandItem);


