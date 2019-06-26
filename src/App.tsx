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
import TreeNode from './components/TreeNode/TreeNode';
import TreeView from './components/TreeView/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FolderIcon from '@material-ui/icons/Folder';
const drawerWidth = 256;

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
        <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />} defaultParentIcon={<FolderIcon />}>
          <TreeNode nodeId="1" label="Case 1">
            <TreeNode nodeId="2" label="Revelation: Case 1">
              <TreeNode nodeId="3" label="Container 1" />
            </TreeNode>
            <TreeNode nodeId="4" label="Disclosure: Case 1">
              <TreeNode nodeId="5" label="Container 2"/>
            </TreeNode>
          </TreeNode>
          <TreeNode nodeId="6" label="Case 2">
            <TreeNode nodeId="7" label="Revelation: Case 2">
              <TreeNode nodeId="8" label="Container 1" />
            </TreeNode>
            <TreeNode nodeId="9" label="Disclosure: Case 2">
              <TreeNode nodeId="10" label="Container 2" />
            </TreeNode>
          </TreeNode>
        </TreeView>

      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <CounselTable onRowClick={(event, object) => {
          handleDialogOpen();
        }}>

        </CounselTable>
        <CounselDialog showDialog={open} handleClose={handleDialogClose} />
      </main>
    </div>
  );
}