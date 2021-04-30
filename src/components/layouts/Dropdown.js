import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// 
import {logout} from '../../actions/adminsAction'

const SimpleMenu = ({admins : {admin}, logout}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  }

  return (
    <div>
      <Button aria-controls="simple-menu" color="inherit" aria-haspopup="true" onClick={handleClick}>
        {admin && admin.admin_name}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
        <MenuItem onClick={handleLogout}>Çykmak</MenuItem>
      </Menu>
    </div>
  );
}

SimpleMenu.propTypes = {
  logout: PropTypes.func.isRequired,
  admins : PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  admins: state.admins
})

export default connect(mapStateToProps, {
  logout
})(SimpleMenu);