import React, {useEffect, useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import './UsersTable.css';
import {InputSwitch} from "primereact/inputswitch";
import {Button} from "primereact/button";
import EditUserComponent from "../edit-user/EditUserComponent";
import UserProfileComponent from "../user-profile/UserProfileComponent";

interface Customer {
    fullName: string;
    username: string;
    email: string;
    creationDate: string;
    blocked: JSX.Element;
    removed: JSX.Element;
    edit: JSX.Element;
    profileEdit: JSX.Element;
    remove: JSX.Element;
}

const UsersTableComponent = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [openUserEditDialog, setOpenUserEditDialog] = useState<boolean>(false);
    const [openUserProfileEditDialog, setOpenUserProfileEditDialog] = useState<boolean>(false);

    const handleUserEditBtn = () => {
        setOpenUserEditDialog(!openUserEditDialog)
    };
    const handleUserProfileEditBtn = () => {
        setOpenUserProfileEditDialog(!openUserProfileEditDialog)
    };
    useEffect(() => {
        const customersToAdd: Customer[] = [];
        for (let i = 0; i < 60; i++) {
            const customer: Customer = {
                fullName: 'Jane Smith',
                username: 'janesmith',
                email: 'jane@example.com',
                creationDate: '2024-03-11',
                blocked: <InputSwitch checked={false}/>,
                removed: <InputSwitch checked={true}/>,
                edit: <Button type="button" icon="pi pi-pencil" onClick={() => handleUserEditBtn()} rounded outlined/>,
                profileEdit: <Button type="button" severity="help" onClick={() => handleUserProfileEditBtn()} icon="pi pi-pencil" rounded outlined/>,
                remove: <Button type="button" severity="danger" icon="pi pi-trash" rounded outlined/>
            };
            customersToAdd.push(customer);
        }
        setCustomers(customersToAdd);
    }, []);

    return (
        <div className="users-container card">
            {openUserEditDialog && <EditUserComponent openUserEditDialog={openUserEditDialog}
                                                      setOpenUserEditDialog={setOpenUserEditDialog}/>}
            {openUserProfileEditDialog && <UserProfileComponent openUserProfileEditDialog={openUserProfileEditDialog}
                                                                setOpenUserProfileEditDialog={setOpenUserProfileEditDialog}/>}
            <h2 style={{textAlign: 'center'}}>USER CONTROL PAGE</h2>
            <hr style={{color: '#BBE1FA'}}/>
            <DataTable value={customers} paginator rows={7}
                       selectionMode="single"
                       reorderableRows={true}
                       resizableColumns={true}
                       reorderableColumns={true}
                       onRowReorder={(e) => setCustomers(e.value)} tableStyle={{minWidth: '50rem'}}
                       paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                       currentPageReportTemplate="{first} to {last} of {totalRecords}">
                <Column rowReorder style={{width: '3rem'}}/>
                <Column field="username" header="Username" alignHeader={"center"}
                        style={{textAlign: 'center'}}></Column>
                <Column field="email" header="Email" alignHeader={"center"} style={{textAlign: 'center'}}></Column>
                <Column field="creationDate" header="Creation Date" alignHeader={"center"}
                        style={{textAlign: 'center'}}></Column>
                <Column field="blocked" header="Is Blocked" alignHeader={"center"}
                        style={{textAlign: 'center'}}></Column>
                <Column field="removed" header="Is Removed" alignHeader={"center"}
                        style={{textAlign: 'center'}}></Column>
                <Column field="edit" header="User Edit" alignHeader={"center"} style={{textAlign: 'center'}}></Column>
                <Column field="profileEdit" header="Profile Edit" alignHeader={"center"}
                        style={{textAlign: 'center'}}></Column>
                <Column field="remove" header="Remove" alignHeader={"center"} style={{textAlign: 'center'}}>
                </Column>
            </DataTable>
        </div>
    );
}

export default UsersTableComponent;