import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import TableRow from '@material-ui/core/TableRow';
import MenuItem from '@material-ui/core/MenuItem';
// 
import { addHomeSubcategorie, deleteHomeSubcat, editHomeSubcategorie } from '../../actions/homeSubcategoriesAction';



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
    },
    input : {
      width : '100%'
  },
  });



const HomeSubsItem = ({
  obj :{
    home_subcategorie_id,
    subcategorie
  },
  subcats,
  index,
  addHomeSubcategorie,
  deleteHomeSubcat,
  editHomeSubcategorie
}) => {


    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [subcategories,setSubCategories] = useState(null);
    const [selectedSubcategorie,setSelectedSubcat] = useState('');



    useEffect(() => {
      if(subcategorie){
        setSelectedSubcat(subcategorie.subcategorie_id)
      }
    }, [subcategorie])
    
    useEffect(() => {
      if(subcats){
        setSubCategories(subcats);
      }
    }, [subcats])


    const handleOpen = (e) => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const changeSubcat  = (e) => {
      const id = e.target.value;
      setSelectedSubcat(id);
      if(!subcategorie){
        // Add Home Sub
        addHomeSubcategorie(id)
      }
      else{
        // Edit Home Subcat
        editHomeSubcategorie(id,home_subcategorie_id)
      }
    }


    const deleteHome = (id) => {
      deleteHomeSubcat(id)
    }


    return (
        <> 
        <TableRow>
            {/* Index */}
            <TableCell align="left">{ index + 1 }</TableCell>
            {/* subcategorie_name */}
            <TableCell>
              <TextField
                  className={classes.input}
                  id="outlined-select-currency"
                  select
                  label="Subcategorie Name"
                  value={selectedSubcategorie}
                  onChange={(e) => changeSubcat(e)}
                  variant="outlined"
                  name="subcategorie"
              >
                  {
                      subcategories && subcategories.length > 0 ?
                      subcategories.map((option,index) => (
                          <MenuItem key={index} value={option.subcategorie_id}>
                          {option.subcategorie_name_tm}
                          </MenuItem>
                      )) : 'Başga subkategoriýa ýok'
                  }
              </TextField>
            </TableCell>
            {/* Delete */}
            <TableCell align="center">
                <Button
                  disabled={subcategorie ? false : true}
                  onClick={handleOpen}
                  color="secondary"
                  href="#delete"
                >
                <DeleteOutlineIcon />
                </Button>
                <div key={home_subcategorie_id}>
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
                          <h3 id="transition-modal-title">Hakykatdanam pozmak isleyanizmi?</h3>
                          <div className={classes.btnGroup}>
                            <Button onClick={handleClose}>
                              Cancel
                            </Button>
                            <Button variant="contained" color="secondary"
                              onClick={() => {
                                deleteHome(home_subcategorie_id);
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

HomeSubsItem.propTypes = {
  addHomeSubcategorie: PropTypes.func.isRequired,
  deleteHomeSubcat: PropTypes.func.isRequired,
  editHomeSubcategorie: PropTypes.func.isRequired,
  obj : PropTypes.object.isRequired,
}

export default connect(null, {
  addHomeSubcategorie,
  deleteHomeSubcat,
  editHomeSubcategorie
})(HomeSubsItem);


