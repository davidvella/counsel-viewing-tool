import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { CounselTable } from './components/Table/Table';
import CounselDialog from './components/Dialog/CounselDialog';
import BubbleChart from '@material-ui/icons/BubbleChart';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import { SearchBar } from './components/SearchBar/SearchBar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FolderIcon from '@material-ui/icons/Folder';
import MuiTreeView from './components/MuiTreeView/MuiTreeView';

import { Fab } from '@material-ui/core';
import Menu from './components/Menu/Menu';
import MenuMenu from './components/MenuMenu/MenuMenu';
import MenuItem from './components/MenuItem/MenuItem';



const drawerWidth = 256;

const tree = [
  {
    value: 'Parent A',
    nodes: [{ value: 'Child A', id: "2" }, { value: 'Child B', id: "3" }],
    id: "1"
  },
  {
    value: 'Parent B',
    id: "4",
    nodes: [
      {
        id: "5",
        value: 'Child C',
      },
      {
        id: "6",
        value: 'Parent C',
        nodes: [
          { value: 'Child D', id: "7" },
          { value: 'Child E', id: "8" },
          {
            value: 'Child F', id: "9", nodes: [
              {
                id: "10",
                value: 'Child C',
                nodes: [
                  {
                    id: "11",
                    value: 'Child C',
                  }
                ]
              }
            ]
          },
        ],
      },
    ],
  },
];


const useStyles = makeStyles((theme: any) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      marginLeft: drawerWidth,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      zIndex: theme.zIndex.drawer + 1
    },
    listToolBar: {
      backgroundColor: theme.palette.background.paper,
      minHeight: "48px",
      boxShadow: 'none',
      borderBottom: '1px solid #dadce0',
      paddingRight:12
    },
    searchBar: {
      maxWidth: 720,
      width: '100%',
      background: '#f1f3f4'
    },
    appBarTitle: {
      width: drawerWidth - theme.spacing(1)
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      borderRight: '0px'
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default
    }
  }),
);

export default function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleDialogOpen() {
    setOpen(true);
  }

  function handleDialogClose() {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className={classes.appBarTitle}>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <BubbleChart />
              </Grid>
              <Grid item>
                <Typography variant="h5" noWrap >
                  CVT
             </Typography>
              </Grid>
            </Grid>
          </div>
          <SearchBar
            onChange={() => console.log('onChange')}
            onRequestSearch={() => console.log('onRequestSearch')}
            placeholder={"Search Case"}
            className={classes.searchBar}
          />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <MuiTreeView
          tree={tree}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          defaultParentIcon={<FolderIcon />}
          onLeafClick={(event: any) => { global.console.log(event) }} />

      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Menu className={classes.listToolBar}>
          <MenuItem
            name='browse'
          >
            Browse
        </MenuItem>

          <MenuItem
            name='submit'
          >
            <FolderIcon />
          </MenuItem>

          <MenuMenu position='right'>
            <MenuItem
              name='signup'
            >
              <FolderIcon />
            </MenuItem>

            <MenuItem
              name='help'
            >
              <Fab size="small" >
                <FolderIcon  />
              </Fab>
            </MenuItem>
          </MenuMenu>
        </Menu>
        <CounselTable onRowClick={(event, object) => {
          handleDialogOpen();
        }}>

        </CounselTable>
        <CounselDialog showDialog={open} handleClose={handleDialogClose} />
      </main>
    </div>
  );
}