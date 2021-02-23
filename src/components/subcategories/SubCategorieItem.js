import React, {useEffect} from 'react';
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
// 
// import { deleteCategorie } from '../../actions/categoriesAction';
import Placeholder from '../../img/BG.svg';
import imgPath from '../../utils/imgPath'



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



const SubCategorieItem = ({subcategorie :{
    subcategorie_id,
    subcategorie_image,
    subcategorie_name,
    categorie_name,
    hasSize,
    hasColor,
    sizeType
}}) => {


    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [image, setImage] = React.useState(Placeholder);



    useEffect(() => {
      if(subcategorie_image){
        setImage(imgPath(subcategorie_image))
      }
    }, [subcategorie_image])


    const handleOpen = (e) => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <> 
            {/* SubCategorie-Item */}
        <TableRow key="ID">
            {/* SubCategorie ID */}
            <TableCell align="left">{subcategorie_id.slice(0,5)} ...</TableCell>
            {/* SubCategorie Image */}
            <TableCell align="left">
                <Avatar className={classes.image} src={image} variant="square"/>
            </TableCell>
            {/* SubCategorie Name */}
            <TableCell align="left">{subcategorie_name}</TableCell>
            {/* Categorie Name */}
            <TableCell align="left">{categorie_name}</TableCell>
            {/* Product Number */}
            <TableCell align="left">5</TableCell>
            {/* hasSize */}
            <TableCell align="left">true</TableCell>
            {/* hasColor */}
            <TableCell align="left">false</TableCell>
            {/* sizeType */}
            <TableCell align="left">number</TableCell>
            {/* Edit */}
            <TableCell align="center">
              <Link to={`/subcategories/edit-subcategorie/${subcategorie_id}`}>
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
                <div key={subcategorie_id}>
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
                          <h3 id="transition-modal-title">Hakykatdanam shu <span style={{color : 'blue'}}>{subcategorie_name}</span> kategoriyany pozmak isleyanizmi?</h3>
                          <p id="transition-modal-description">
                            Kategoriya pozulandan son yzyna gaydyp gelmeyar
                          </p>
                          <div className={classes.btnGroup}>
                            <Button>
                              Cancel
                            </Button>
                            <Button variant="contained" color="secondary"
                              onClick={() => {
                                // deleteCategorie(categorie_id);
                                console.log(subcategorie_id)
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

SubCategorieItem.propTypes = {
  deleteCategorie: PropTypes.func.isRequired,
  subcategorie : PropTypes.object.isRequired,
}

export default SubCategorieItem

