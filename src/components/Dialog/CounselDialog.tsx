import { Dialog, Theme, createStyles, AppBar, Toolbar, IconButton, Typography, List, ListItem, ListItemText, Divider, Drawer, Table, TableHead, TableRow, TableCell, TableBody, Switch, Grid, Fab } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight, Close } from '@material-ui/icons/';
import { TextDivider } from '../TextDivider/TextDivider';
import React from 'react';
import { MuiThemeProvider, makeStyles } from '@material-ui/core/styles';
import { darkTheme } from '../../theme/counselTheme';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            position: 'relative',
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: '0 8px',
            ...theme.mixins.toolbar,
            justifyContent: 'flex-start',
        },
        drawerHeaderDrawer: {
            display: 'flex',
            alignItems: 'center',
            padding: '15px',
            ...theme.mixins.toolbar,
            justifyContent: 'flex-start',
            "box-shadow": "0 2px 2px rgba(0,0,0,0.3)"
        },
        drawerContent: {
            padding: "15px"
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        content: {
            flexGrow: 1,
            backgroundColor: 'transparent'
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: 0,
        },
        iconContainer: {
            position: "absolute",
            top: "80px",
            bottom: "80px",
            "margin-top": "auto",
            "margin-bottom": "auto",
            outline: "0",
            height: "90px"
        }
    })
);

export interface ICounselDialogProps {
    /**
     * Boolean value to indicate whether the panel should appear or not.
     * Set to false by default
     */
    showDialog: boolean;

    /**
     * A callback function which can be used to when the document is created.
     */
    handleClose: () => void;
}

const drawerWidth = 344;

function createData(name: string, calories: number) {
    return { name, calories };
}

const rows = [
    createData('Frozen yoghurt', 159),
    createData('Ice cream sandwich', 237),
    createData('Eclair', 262),
    createData('Cupcake', 305),
    createData('Gingerbread', 356),
];


/**
 *  Default React component render method
 */
export default function CounselDialog(props: ICounselDialogProps) {
    const classes = useStyles();

    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    });

    const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [name]: event.target.checked });
    };

    return (
        <div>
            <MuiThemeProvider theme={darkTheme}>
                <Dialog fullScreen open={props.showDialog} >
                    <AppBar className={classes.appBar}>
                        <Toolbar>

                            <IconButton onClick={props.handleClose} aria-label="Hide Details">
                                <Close />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Grid container direction="row" spacing={3}>
                        <Grid key={0} item xs color="">
                            <div className={classes.iconContainer}>
                                <Fab aria-label="Left" color="primary">
                                    <KeyboardArrowLeft />
                                </Fab>
                            </div>
                        </Grid>
                        <Grid key={1} item xs={6}>
                            <List>
                                <ListItem button>
                                    <ListItemText primary="Phone ringtone" secondary="Titania" />
                                </ListItem>
                                <Divider />
                                <ListItem button>
                                    <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid key={2} item xs>
                            <div className={classes.iconContainer}>
                                <Fab aria-label="Right" color="primary" >
                                    <KeyboardArrowRight />
                                </Fab>
                            </div>
                        </Grid>
                    </Grid>
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        anchor="right"
                        PaperProps={{
                            style: {
                                backgroundColor: '#424242',
                                color: '#fff',
                            },
                        }}
                    >
                        <div className={classes.drawerHeaderDrawer}>
                            <Typography variant="body1" >
                                Details
                            </Typography>
                        </div>
                        <div className={classes.drawerContent}>
                            <TextDivider label="General Info" />
                            <Table >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Dessert (100g serving)</TableCell>
                                        <TableCell align="right">Calories</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map(row => (
                                        <TableRow key={row.name}>
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.calories}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <TextDivider label="Flags" />
                            <div>
                                <Switch
                                    checked={state.checkedA}
                                    onChange={handleChange('checkedA')}
                                    value="checkedA"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                                <Switch
                                    checked={state.checkedB}
                                    onChange={handleChange('checkedB')}
                                    value="checkedB"
                                    color="primary"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                                <Switch
                                    checked={state.checkedB}
                                    onChange={handleChange('checkedB')}
                                    value="checkedB"
                                    color="primary"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                                <Switch value="checkedC" inputProps={{ 'aria-label': 'primary checkbox' }} />
                                <Switch
                                    defaultChecked
                                    value="checkedF"
                                    color="default"
                                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                                />
                            </div>
                        </div>

                    </Drawer>

                </Dialog>
            </MuiThemeProvider>
        </div>
    );
};