import React from 'react';
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
import { deleteCategorie } from '../../actions/categoriesAction';
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



const CategorieItem = ({deleteCategorie,categorie :{
    categorie_id,
    categorie_image,
    categorie_name
}}) => {


    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleOpen = (e) => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <> 
            {/* Categorie-Item */}
        <TableRow key="ID">
            {/* Categorie ID */}
            <TableCell align="left">{categorie_id.slice(0,5)} ...</TableCell>
            {/* Categorie Image */}
            <TableCell align="left">
            {
                categorie_image ? 
                    <Avatar className={classes.image} src={imgPath(categorie_image)} variant="square"/> :
                    <Avatar className={classes.image} src={Placeholder} variant="square"/>
              }
            </TableCell>
            {/* Categorie Name */}
            <TableCell align="left">{categorie_name}</TableCell>
            {/* Product Number */}
            <TableCell align="left">1542</TableCell>
            {/* Subcategorie Number */}
            <TableCell align="left">5</TableCell>
            {/* Edit */}
            <TableCell align="center">
              <Link to={`/categories/edit-categorie/${categorie_id}`}>
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
                <div key={categorie_id}>
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
                          <h3 id="transition-modal-title">Hakykatdanam shu <span style={{color : 'blue'}}>{categorie_name}</span> kategoriyany pozmak isleyanizmi?</h3>
                          <p id="transition-modal-description">
                            Kategoriya pozulandan son yzyna gaydyp gelmeyar
                          </p>
                          <div className={classes.btnGroup}>
                            <Button>
                              Cancel
                            </Button>
                            <Button variant="contained" color="secondary"
                              onClick={() => {
                                deleteCategorie(categorie_id);
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

CategorieItem.propTypes = {
  deleteCategorie: PropTypes.func.isRequired,
}

export default connect(null, {
  deleteCategorie,
})(CategorieItem);


