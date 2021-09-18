import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
//
import StatsProductNumber from "../components/dashboard/StatsProductNumber";
import StatsOrderNumber from "../components/dashboard/StatsOrderNumber";
import StatsUserNumber from "../components/dashboard/StatsUserNumber";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      marginRight: "0",
      marginLeft: "0",
    },
  },
  flex: {
    display: "flex",
    marginTop: "1rem",
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [stats, setStats] = useState(null);

  // GET ALL stats
  useEffect(() => {
    axios
      .get(`/v1/products/admin/stats`)
      .then((res) => {
         setStats(res.data);
      })
      .catch((err) => console.error("SizeTypes: ", err));
  }, []);

  return (
    <section className="container products-section">
      <header>
        <Typography variant="h4" component="h2">
          Dolandyryş paneli
        </Typography>
      </header>
      {stats && (
        <div className={classes.flex}>
          <StatsProductNumber product_count={stats.product_count} />
          <StatsOrderNumber order_count={stats.order_count} />
          <StatsUserNumber user_count={stats.user_count} /> 
        </div>
      )}
    </section>
  );
};

export default Dashboard;
