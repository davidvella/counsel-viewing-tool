import React from "react";
import MaterialTable from "material-table";


export class TestTable extends React.Component<any, any> {
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
                        { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 }
                    ]}
                    title="Demo Title"
                />
            </div>
        );
    }
}