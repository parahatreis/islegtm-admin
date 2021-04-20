import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
// 
import { login } from '../actions/adminsAction'

const useStyles = makeStyles({
    wrapper :{
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
        width : '100%',
        height : '100vh',
        backgroundColor : '#3f51b5',
    },
    root : {
        width : '95%',
        padding : '2rem',
        maxWidth : '450px'
    },
    inputBlock : {
        padding : '1rem 0',
        width : '100%',
    },
    input : {
        width : "100%"
    }
});


const LoginView = ({login}) => {

    const classes = useStyles();
    const [formData, setFormData] = useState({
        admin_username : '',
        admin_password : ''
    });

    const onChangeFormData = (e) => setFormData({...formData,[e.target.name] : e.target.value})

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        login(formData)
    }

    return (
        <div className={classes.wrapper}>
            <Card className={classes.root}>
                <CardContent>
                <form
                    onSubmit={(e) => onSubmit(e)}
                >
                    <Typography variant="h4" component="h4">
                        Login
                    </Typography>
                    <Typography variant="h6" style={{color : 'grey', margin : '1rem 0'}} component="h6">
                        Sowda Merkezi Admin Panel
                    </Typography>
                    {/* Username */}
                    <div className={classes.inputBlock}>
                        <TextField 
                            className={classes.input}
                            id="outlined-basic" 
                            label="Username" 
                            variant="outlined"
                            required
                            name="admin_username"
                            value={formData.admin_username}
                            onChange={(e) => onChangeFormData(e)}
                        /><br />
                    </div>

                    {/* Password */}
                    <div className={classes.inputBlock}>
                        <TextField 
                            className={classes.input}
                            type="password"
                            id="outlined-basic" 
                            label="Password" 
                            variant="outlined"
                            required
                            name="admin_password"
                            value={formData.admin_password}
                            onChange={(e) => onChangeFormData(e)}
                        /><br />
                    </div>

                    {/* Submit */}
                    <div className={classes.inputBlock}>
                        <Button variant="contained" className={classes.input} color="primary" type='submit'>
                            Login
                        </Button>
                    </div>
                </form>
                </CardContent>
            </Card>
        </div>
    )
}

LoginView.propTypes = {
    login: PropTypes.func.isRequired,
}

export default connect(null, {
    login
})(LoginView);
