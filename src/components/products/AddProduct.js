import React, {Fragment, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { InputLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Avatar from '@material-ui/core/Avatar';



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
}));

const brandData = [
    {
      value: 'Zara',
      label: 'Zara',
    },
    {
      value: 'Nike',
      label: 'Nike',
    },
  ];

const subData = [
{
    value: 'tshirt',
    label: 'T-shirt',
},
];

const AddProduct = () => {

    const classes = useStyles();

    const [brand, setBrand] = useState('Zara');
    const [sub, setSub] = useState('tshirt');
    const [countFileNumber, setFile] = useState([
        {
            id : 1
        },
        {
            id : 2
        }
    ]);

    console.log(countFileNumber)


    const Files = () => {
        return countFileNumber.map((value,index) => 
            <Fragment key={index}>
            {/* Product Image */}
            <div className={classes.grid}>
                <Avatar 
                    className={classes.image}
                    src="/broken-image.jpg"
                    variant="square" 
                    />
                <div style={{paddingLeft : '10px', width : '100%'}}>
                    <InputLabel children={`Product Image ${value.id} `} />
                    <br />
                    <TextField className={classes.inputNumber} id="outlined-basic" type="file" variant="outlined" /><br />
                </div>
            </div>
        </Fragment>
        )
    }


    const changeBrand = (event) => {
        setBrand(event.target.value);
    };

    const changeSub = (event) => {
        setSub(event.target.value);
    };

    const addFormFile = () => {
        if(countFileNumber.length < 6) {
            setFile([...countFileNumber, {
                id : parseInt(countFileNumber[countFileNumber.length - 1].id) + 1
            }])
        }
    }



    return (
        <section className="add-product-section container">
            <Typography variant="h4" component="h2">
               Add Product
            </Typography>
            <div className="form-block"> 
                <form className={classes.root} noValidate autoComplete="off">
                    {/* Product Name */}
                    <TextField className={classes.input} id="outlined-basic" label="Product Name" variant="outlined" /><br />
                    {/* Price(TMT) */}
                    <TextField className={classes.inputNumber} id="outlined-basic" label="Price(TMT)" type="number" variant="outlined" />
                    &nbsp; &nbsp;  
                    {/* Price(USD) */}
                    <TextField className={classes.inputNumber} id="outlined-basic" label="Price(USD)" variant="outlined" /><br />
                    {/* Brand */}
                    <TextField
                        className={classes.input}
                        id="outlined-select-currency"
                        select
                        label="Brand"
                        value={brand}
                        onChange={changeBrand}
                        variant="outlined"
                        >
                        {brandData.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                        </TextField>
                    {/* Subcategorie */}
                    <TextField
                        className={classes.input}
                        id="outlined-select-currency"
                        select
                        label="Subcategorie"
                        value={sub}
                        onChange={changeSub}
                        variant="outlined"
                        >
                        {subData.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                        </TextField>
                    {/* Store */}
                    <TextField
                        className={classes.input}
                        id="outlined-select-currency"
                        select
                        label="Store"
                        value={'135'}
                        variant="outlined"
                        >
                            <MenuItem key='135' value='135'>
                                135
                            </MenuItem>
                            <MenuItem key='136' value='136'>
                                136
                            </MenuItem>
                        </TextField>
                    <br />
                    <Files />
                    <Button variant="outlined" color="default"
                        onClick={() => addFormFile()}
                        disabled={countFileNumber.length === 6 ? true : false}
                    >
                        <AddCircleOutlineIcon />
                    </Button>
                </form>
            </div>
        </section>
    )
}

export default AddProduct
