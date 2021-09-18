import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import ProfileForm from "../components/profile/ProfileForm";
//

const Profile = ({ admins: { admin } }) => {
  return (
    <section className="container products-section">
      <header>
        <Typography variant="h4" component="h2">
          Hasabym
        </Typography>
      </header>
      {admin && (
        <div className="products-wrapper">
          <ProfileForm admin={admin} />
        </div>
      )}
    </section>
  );
};
Profile.propTypes = {
  admins: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  admins: state.admins,
});

export default connect(mapStateToProps)(Profile);
