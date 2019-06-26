import React from "react";
import MaterialTable from "material-table";

export interface CounselTableProps {
    onRowClick?: (event?: React.MouseEvent, rowData?: any, toggleDetailPanel?: (panelIndex?: number) => void) => void;
    onRowSelected?: (rowData: any) => void;
}

export class CounselTable extends React.Component<CounselTableProps, any> {
    public render() {
        return (
            <div>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
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
                    data={[
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
                    ]}
                    title="Demo Title"
                    onRowClick={this.props.onRowClick}
                    onRowSelected={this.props.onRowSelected}
                    options={{
                        search: false,
                        headerStyle: {
                            fill:"rgba(0,0,0,.54)",
                            fontSize: '13px',
                            textAlign:'left',
                            fontWeight:'bold'
                          },
                        toolbar: false
                      }}
                />
            </div>
        );
    }
}