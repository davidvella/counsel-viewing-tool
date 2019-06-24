import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { CounselTable } from './components/Table/Table';
import CounselDialog from './components/Dialog/CounselDialog';

const drawerWidth = 344;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
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
              <Typography variant="h6" noWrap>
                Permanent drawer
              </Typography>
            </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <CounselTable onRowClick={(event,object)=> {
            handleDialogOpen();
          }}>
          
        </CounselTable>
        <CounselDialog showDialog={open} handleClose={handleDialogClose}/>
      </main>
    </div>
  );
}