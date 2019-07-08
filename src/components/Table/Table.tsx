import MaterialTable from "material-table";
import React from "react";
import MDSpinner from "react-md-spinner";
import createStyles from '@material-ui/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

const styles = (theme: any) => createStyles({
    spinner: {
        textAlign: "center",
        paddingTop: "40px"
    },
});

export interface CounselTableProps extends WithStyles<typeof styles> {
    onRowClick?: (event?: React.MouseEvent, rowData?: any, toggleDetailPanel?: (panelIndex?: number) => void) => void;
    onRowSelected?: (rowData: any) => void;
}

export interface ICounselTableState {
    isLoadingData: boolean;
    items: any[];
}
export const CounselTable = withStyles(styles)(
    class extends React.Component<CounselTableProps, ICounselTableState> {

        private _isMounted: boolean = false;

        constructor(props: CounselTableProps) {
            super(props);

            // set initial state
            this.state = {
                isLoadingData: false,
                items: [],

            };
        }

        /**
         * Lifecycle hook when component is mounted
         */
        public componentDidMount(): void {
            this._isMounted = true;
            this.readListData();
        }

        /**
         * Lifecycle hook when component is unmounted
         */
        public componentWillUnmount(): void {
            this._isMounted = false;
        }

        handleRowClick = (event?: React.MouseEvent, rowData?: any, toggleDetailPanel?: (panelIndex?: number) => void) => {
            if (this.props.onRowClick) {
                this.props.onRowClick(event, rowData, toggleDetailPanel);
            }
        };

        handleRowSelected = (rowData: any) => {
            if (this.props.onRowSelected) {
                this.props.onRowSelected(rowData);
            }
        }

        public render() {
            const { items } = this.state;
            const { classes } = this.props;

            return (
                <div>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    />
                    {this.state.isLoadingData ? (
                        <div className={classes.spinner}>
                            <MDSpinner />
                        </div>
                    ) : (
                            <MaterialTable
                                columns={[
                                    { title: "Test1", field: "name" },
                                    { title: "Test2", field: "surname" },
                                    { title: "Test3", field: "birthYear", type: "numeric" },
                                    {
                                        title: "Test23",
                                        field: "birthCity",
                                        lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
                                    }
                                ]}
                                data={items}
                                title="Demo Title"
                                onRowClick={this.handleRowClick}
                                onRowSelected={this.handleRowSelected}
                                options={{
                                    search: false,
                                    headerStyle: {
                                        fill: "rgba(0,0,0,.54)",
                                        fontSize: '13px',
                                        textAlign: 'left',
                                        fontWeight: 'bold'
                                    },
                                    toolbar: false
                                }}
                            />
                        )}
                </div>
            );
        }

        private async readListData(): Promise<void> {
            if (this._isMounted) {
                this.setState({
                    ...this.state,
                    isLoadingData: true
                });
            }

            if (this._isMounted) {
                setTimeout(() => {
                    this.setState({
                        ...this.state,
                        isLoadingData: false,
                        items: [
                            { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
                            { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
                            { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
                            { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
                            { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
                            { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
                            { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
                            { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
                            { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
                            { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
                            { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
                            { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
                            { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
                            { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
                            { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
                            { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 }
                        ]
                    });
                }, 3000);
            }
        }


    });

