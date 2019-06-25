import { TextDivider } from '../TextDivider/TextDivider';
import React from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { darkTheme } from '../../theme/counselTheme';
import createStyles from '@material-ui/styles/createStyles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Switch from '@material-ui/core/Switch';
import TableBody from '@material-ui/core/TableBody';
import ArrowBack from '@material-ui/icons/ArrowBack';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles((theme: any) =>
    createStyles({
        appBar: {
            position: 'relative',
            backgroundColor: backgroundColor,
            opacity: .93
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
            marginRight: drawerWidth,
            backgroundColor: backgroundColor,
            opacity: .93
        },
        iconContainerRight: {
            position: "absolute",
            top: "80px",
            bottom: "80px",
            "margin-top": "auto",
            "margin-bottom": "auto",
            outline: "0",
            height: "90px",
            right: theme.spacing(3) + drawerWidth
        },
        iconContainerLeft: {
            position: "absolute",
            top: "80px",
            bottom: "80px",
            "margin-top": "auto",
            "margin-bottom": "auto",
            outline: "0",
            height: "90px",
            left: theme.spacing(3)

        },
        tableFont: {
            fontSize: '12px'
        }
    })
);

const drawerWidth = 344;
const backgroundColor = 'rgba(0,0,0,0.85)';

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
                                <ArrowBack />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <main className={classes.content}>
                        <div className={classes.iconContainerLeft}>
                            <Fab aria-label="Left" color="primary">
                                <KeyboardArrowLeft />
                            </Fab>
                        </div>
                        <div className={classes.iconContainerRight}>
                            <Fab aria-label="Right" color="primary" >
                                <KeyboardArrowRight />
                            </Fab>
                        </div>
                    </main>
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
                                <TableBody>
                                    {rows.map(row => (
                                        <TableRow key={row.name}>
                                            <TableCell component="th" scope="row" className={classes.tableFont}>
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography className={classes.tableFont} color="textSecondary" >
                                                    {row.calories}
                                                </Typography>
                                            </TableCell>
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
