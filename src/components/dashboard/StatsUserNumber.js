import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
//

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginRight: "10px",
    color: "#f96d00",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const SimpleCard = ({user_count}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Ulanyjy sany
        </Typography>
        <Typography variant="h5" component="h2">
          {user_count && user_count}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to="/products">
          <Button
            size="small"
            style={{
              color: "#f96d00",
            }}
          >
            {" "}
            Ulanyjylar{" "}
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default SimpleCard;
