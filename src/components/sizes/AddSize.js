import React, { useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { InputLabel } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
// 
import { createSize } from '../../actions/sizesAction';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            marginRight : '0',
            marginLeft : '0',
        },
    },
    input : {
        width : '100%'
    },
    inputNumber : {
        width : '30%'
    },
    grid : {
        display : 'flex'
    },
    image : {
        width : '100px',
        height : '100px'
      },
    table: {
    minWidth: 650,
    },
}));
  


const AddSize = ({createSize}) => {
    
    const [formData,setFormData] = useState({
        size_type : ''
    });
    const [sizeNames, setSizeNames] = useState(
        [{
            id : 1,
            size_name : ''
        }]
    )
    const classes = useStyles();

    const onChange = (e) => setFormData({...formData, [e.target.name] : e.target.value});


    const changeSizeName = (e,id) => {
        const newArr = sizeNames.map((name) => {
            if(name.id === id){
                return name = {
                    id : name.id,
                    size_name : e.target.value
                }
            }
            else{
                return name
            }
        })
        setSizeNames(newArr)
    };

    const addSizeNameInput = () => {
        setSizeNames([...sizeNames, {
            id : sizeNames[sizeNames.length - 1].id + 1,
            size_name : ''
        }]);
    }

    const removeSizeNameInput = (id) => {
        setSizeNames(sizeNames.filter(val => val.id !== id))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        formData.size_names = sizeNames.filter(name => name.size_name !== '');
        createSize(formData);
    }

    return (
        <section className="add-product-section container">
            <Typography variant="h4" component="h2">
               Add Size Type
            </Typography>
            <div className="form-block"> 
                <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => onSubmit(e)}>
                    {/* Size Type */}
                    <TextField 
                        className={classes.input}
                        id="outlined-basic" 
                        label="Size Type" 
                        variant="outlined"
                        value={formData.size_type}
                        required
                        name="size_type"
                        onChange={(e) => onChange(e)}
                        /><br />
                    {/* Size Names */}
                    <InputLabel children={`Add Size Names`} />
                    {
                        sizeNames.map((val, index) => (
                            <>
                                <div className={classes.grid}>
                                    {/* Size Type */}
                                    <TextField 
                                        className={classes.input}
                                        id="outlined-basic" 
                                        label={`Size Name ${index + 1}`} 
                                        variant="outlined"
                                        value={val.size_name}
                                        name="size_name"
                                        onChange={(e) => changeSizeName(e,val.id)}
                                    />
                                    {
                                        sizeNames.length === 1 ? '' : 
                                        <IconButton aria-label="delete" className={classes.margin} onClick={(e) => removeSizeNameInput(val.id) }>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    }
                                </div>
                                <br />
                            </>
                        ))
                    }

                    <Button variant="outlined" color="default"
                        onClick={() => addSizeNameInput()}
                    >
                        <AddCircleOutlineIcon />
                    </Button>
                    <br />
                    <Button variant="contained" color="primary" type='submit'>
                        Create Size Type
                    </Button>
                </form>
            </div>
        </section>
    )
}

AddSize.propTypes = {
    createSize: PropTypes.func.isRequired,
}

export default connect(null, {
    createSize
  })(AddSize);
    
