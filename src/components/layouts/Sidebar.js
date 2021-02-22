import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Grid from '@material-ui/core/Grid';
import ViewStreamIcon from '@material-ui/icons/ViewStream';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import GroupIcon from '@material-ui/icons/Group'
import ListAltIcon from '@material-ui/icons/ListAlt';
//Components
import Dropdown from './Dropdown';
import AdminPanel from '../../pages/AdminRoutes';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
   },
  nested: {
     paddingLeft: theme.spacing(4),
   },
   linkColor: {
     color: '#000000DE'
  }

}));

export default function MiniDrawer() {
   const classes = useStyles();
   const theme = useTheme();
   const [open, setOpen] = React.useState(true);

   const handleDrawerOpen = () => {
      setOpen(true);
   };

   const handleDrawerClose = () => {
      setOpen(false);
   };

   return (
      <div className={classes.root}>
         <CssBaseline />
            {/* HEADER */}
         <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
               [classes.appBarShift]: open,
            })}
            >
            <Toolbar>
               <IconButton
               color="inherit"
               aria-label="open drawer"
               onClick={handleDrawerOpen}
               edge="start"
               className={clsx(classes.menuButton, {
                  [classes.hide]: open,
               })}
               >
               <MenuIcon />
               </IconButton>
                  <Grid
                  container
                  justify = "space-between"
                  alignItems="baseline"
                  >
                  <Typography variant="h6" noWrap>
                     Sowda Merkezi
                  </Typography>
                  {/* Dropdown */}
                  <Dropdown />
               </Grid>
            </Toolbar>
         </AppBar>
         {/* END HEADER */}

         <Drawer
         variant="permanent"
         className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
         })}
         classes={{
            paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
            }),
         }}
         >
            <div className={classes.toolbar}>
               <IconButton onClick={handleDrawerClose}>
               {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
               </IconButton>
            </div>
            <Divider />
            <Link to="/" className={classes.linkColor}>
               <List>
                  <ListItem button>
                     <ListItemIcon>
                        <DashboardIcon />
                     </ListItemIcon>
                     <ListItemText primary="Dashboard" />
                  </ListItem>
               </List>
            </Link>
            {/* Orders */}
            <List>
               <ListItem button>
                  <ListItemIcon>
                     <ShoppingCartIcon />
                  </ListItemIcon>
                  <ListItemText primary="Orders" />
               </ListItem>
            </List>
            {/* Products */}
            <Link to="/products">
               <List>
                  <ListItem button>
                     <ListItemIcon>
                        <ListAltIcon />
                     </ListItemIcon>
                     <ListItemText primary="Products" className={classes.linkColor} />
                  </ListItem>
                  </List>
            </Link>
            {/* Categories */}
            <Link to="/categories">
               <List>
                  <ListItem button>
                     <ListItemIcon>
                        <ViewStreamIcon />
                     </ListItemIcon>
                     <ListItemText primary="Categories" className={classes.linkColor} />
                  </ListItem>
               </List>
            </Link>
            {/* Subcategories */}
            <List>
               <ListItem button>
                  <ListItemIcon>
                     <ViewModuleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Subcategories" />
               </ListItem>
            </List>
            {/* Users */}
            <List>
               <ListItem button>
                  <ListItemIcon>
                     <GroupIcon />
                  </ListItemIcon>
                  <ListItemText primary="Users" />
               </ListItem>
            </List>

            
         </Drawer>


         {/* MAIN */}
         <main className={classes.content}>
            <div className={classes.toolbar} />
            {/* <AdminPanel /> */}
         </main>

         
      </div>
   );
}
