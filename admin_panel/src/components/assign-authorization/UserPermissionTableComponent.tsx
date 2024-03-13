import React, {useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from "primereact/button";
import './UsersPermissionTable.css';
import SidebarComponent from "../sidebar/SidebarComponent";
import {Tag} from "primereact/tag";

const UserPermissionTableComponent = () => {
    const [customers, setCustomers] = useState([
        {
            username: 'janesmith',
            roles: [<Tag className="my-tag" severity="success" value="ROLE_USER"></Tag>,
                <Tag className="my-tag" severity="warning" value="ROLE_ROOT"></Tag>,
                <Tag className="my-tag" severity="info" value="ROLE_ADMIN"></Tag>],
            giveAdminRole: <Button severity="success" label="Give Role" outlined/>,
            removeAdminRole: <Button severity="danger" label="Remove Role" outlined/>,
        },
        {
            username: 'janesmith',
            roles: [<Tag className="my-tag" severity="success" value="ROLE_USER"></Tag>,
                <Tag className="my-tag" severity="warning" value="ROLE_ROOT"></Tag>,
                <Tag className="my-tag" severity="info" value="ROLE_ADMIN"></Tag>],
            giveAdminRole: <Button severity="success" label="Give Role" outlined/>,
            removeAdminRole: <Button severity="danger" label="Remove Role" outlined/>,
        },
        {
            username: 'janesmith',
            roles: [<Tag className="my-tag" severity="success" value="ROLE_USER"></Tag>,
                <Tag className="my-tag" severity="warning" value="ROLE_ROOT"></Tag>,
                <Tag className="my-tag" severity="info" value="ROLE_ADMIN"></Tag>],
            giveAdminRole: <Button severity="success" label="Give Role" outlined/>,
            removeAdminRole: <Button severity="danger" label="Remove Role" outlined/>,
        },
        {
            username: 'janesmith',
            roles: [<Tag className="my-tag" severity="success" value="ROLE_USER"></Tag>,
                <Tag className="my-tag" severity="warning" value="ROLE_ROOT"></Tag>,
                <Tag className="my-tag" severity="info" value="ROLE_ADMIN"></Tag>],
            giveAdminRole: <Button severity="success" label="Give Role" outlined/>,
            removeAdminRole: <Button severity="danger" label="Remove Role" outlined/>,
        },
        {
            username: 'janesmith',
            roles: [<Tag className="my-tag" severity="success" value="ROLE_USER"></Tag>,
                <Tag className="my-tag" severity="warning" value="ROLE_ROOT"></Tag>,
                <Tag className="my-tag" severity="info" value="ROLE_ADMIN"></Tag>],
            giveAdminRole: <Button severity="success" label="Give Role" outlined/>,
            removeAdminRole: <Button severity="danger" label="Remove Role" outlined/>,
        },
        {
            username: 'janesmith',
            roles: [<Tag className="my-tag" severity="success" value="ROLE_USER"></Tag>,
                <Tag className="my-tag" severity="warning" value="ROLE_ROOT"></Tag>,
                <Tag className="my-tag" severity="info" value="ROLE_ADMIN"></Tag>],
            giveAdminRole: <Button severity="success" label="Give Role" outlined/>,
            removeAdminRole: <Button severity="danger" label="Remove Role" outlined/>,
        },
    ]);


    /*    useEffect(() => {
            CustomerService.getCustomersMedium().then((data) => setCustomers(data));
        }, []);*/

    return (
        <div className="card">
            <div className="my-navbar">
                <SidebarComponent/>
            </div>

            <div className="users-container card">
                <h2 style={{textAlign: 'center'}}>AUTHORIZATION CONTROL PAGE</h2>
                <hr style={{color: '#BBE1FA'}}/>
                <DataTable className="centered-header" value={customers} paginator rows={7}
                           selectionMode="single"
                           reorderableRows={true}
                           resizableColumns={true}
                           reorderableColumns={true}
                           onRowReorder={(e) => setCustomers(e.value)}
                           paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                           currentPageReportTemplate="{first} to {last} of {totalRecords}">
                    <Column rowReorder/>
                    <Column field="username" header="Username" alignHeader={"center"}
                            style={{textAlign: 'center'}}></Column>
                    <Column alignHeader={"center"} field="roles" header="Roles" style={{textAlign: 'center'}}></Column>
                    <Column field="giveAdminRole" header="Give Admin Role"></Column>
                    <Column field="removeAdminRole" header="Remove Admin Role"></Column>
                </DataTable>
            </div>
        </div>

    );
}

export default UserPermissionTableComponent;