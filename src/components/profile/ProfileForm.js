import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import validator from "validator";
import { useHistory } from "react-router-dom";
//
import { updateAdmin } from '../../actions/adminsAction';
import { setAlert } from "../../actions/alertsAction";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      marginRight: "0",
      marginLeft: "0",
    },
  },
  input: {
    width: "100%",
  },
  inputNumber: {
    width: "30%",
  },
  grid: {
    display: "flex",
  },
  image: {
    width: "400px",
    height: "200px",
  },
  table: {
    minWidth: 650,
  },
}));

const ProfileForm = ({ updateAdmin, setAlert, admin }) => {
  const [formData, setFormData] = useState({
    admin_username: admin.admin_username,
    admin_password: "",
  });
  const classes = useStyles();
  const history = useHistory();
  const [loacalLoading, setLocalLoading] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const validated = validateInputs();

    if (validated) {
      // Update the formData object
      setLocalLoading(true);
      updateAdmin(formData).then((res) => {
        if (res === 200) {
          setLocalLoading(false);
          return history.push("/profile");
        } else {
          setLocalLoading(false);
          return setAlert("Error!", "error");
        }
      });
    }
  };

  const validateInputs = () => {
    if (validator.isEmpty(formData.admin_password)) {
      setAlert("Ulanyjy password giriziň!", "error");
      return false;
    }
    if (validator.isEmpty(formData.admin_username)) {
      setAlert("Ulanyjy ady giriziň!", "error");
      return false;
    }
    return true;
  };

  return (
    <section className="add-product-section">
      <div className="form-block">
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={(e) => onSubmit(e)}
        >
          {/* Username */}
          <TextField
            className={classes.input}
            label="Username"
            name="admin_username"
            id="outlined-basic"
            variant="outlined"
            value={formData.admin_username}
            onChange={(e) => onChange(e)}
          />
          <br />
          {/* Password */}
          <TextField
            className={classes.input}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            value={formData.admin_password}
            required
            name="admin_password"
            onChange={(e) => onChange(e)}
          />
          <br />
          <Button
            variant="contained"
            disabled={loacalLoading || validator.isEmpty(formData.admin_password)}
            color="primary"
            type="submit"
          >
            {loacalLoading ? "Ýüklenýär..." : "Ýatda sakla"}
          </Button>
        </form>
      </div>
    </section>
  );
};

ProfileForm.propTypes = {
  updateAdmin: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
};

export default connect(null, {
  updateAdmin,
  setAlert,
})(ProfileForm);
