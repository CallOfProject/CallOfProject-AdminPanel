import React, {useEffect, useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import './UsersTable.css';
import EditUserComponent from "../edit-user/EditUserComponent";
import UserProfileComponent from "../user-profile/UserProfileComponent";
import {findUsers} from "../../services/UserService";
import {Role, User} from "../../dto/Models";
import {InputSwitch} from "primereact/inputswitch";
import {Button} from "primereact/button";
import {Nullable} from "primereact/ts-helpers";

const UsersTableComponent = () => {
    const [openUserEditDialog, setOpenUserEditDialog] = useState<boolean>(false);
    const [openUserProfileEditDialog, setOpenUserProfileEditDialog] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | Nullable>(null);
    const handleUserEditBtn = (user: User) => {
        setSelectedUser(user)
        setOpenUserEditDialog(!openUserEditDialog)
    };
    const handleUserProfileEditBtn = (user: User) => {
        setSelectedUser(user)
        setOpenUserProfileEditDialog(!openUserProfileEditDialog)
    };

    const fetchData = async () => {
        const newUsers = await findUsers(currentPage);

        const users = newUsers.map((usr: any) => {
            const roles = new Array<Role>()
            usr.roles.map((role: any) => {
                roles.push(new Role(role.name))
            })

            return new User(usr.birth_date, usr.creation_date, usr.deleted_at, usr.email, usr.first_name,
                usr.is_account_blocked, usr.last_name, usr.middle_name, usr.user_id, usr.username, roles)
        })

        setUsers(users)
    };
    useEffect(() => {
        fetchData()
    }, []);

    const userBlockedTemplate = (rowData: any) => {
        return <div>
            <InputSwitch checked={rowData.is_account_blocked}/>
        </div>;
    }

    const userDeletedAtTemplate = (rowData: any) => {
        return <div>
            <InputSwitch checked={rowData.deleted_at}/>
        </div>;
    }
    const userEditTemplate = (user: User) => {
        return <Button type="button" icon="pi pi-pencil" onClick={() => handleUserEditBtn(user)} rounded outlined/>
    };
    const userProfileEditTemplate = (user: User) => {
        return <Button type="button" severity="help" onClick={() => handleUserProfileEditBtn(user)}
                       icon="pi pi-pencil" rounded outlined/>
    };
    const removeTemplate = () => {
        return <Button type="button" severity="danger" icon="pi pi-trash" rounded outlined/>
    };
    return (
        <div className="users-container card">
            {openUserEditDialog &&
                <EditUserComponent selectedUser={selectedUser} openUserEditDialog={openUserEditDialog}
                                   setOpenUserEditDialog={setOpenUserEditDialog}/>}
            {openUserProfileEditDialog && <UserProfileComponent userId={selectedUser!.user_id} openUserProfileEditDialog={openUserProfileEditDialog}
                                                                setOpenUserProfileEditDialog={setOpenUserProfileEditDialog}/>}
            <h2 style={{textAlign: 'center'}}>USER CONTROL PAGE</h2>
            <hr style={{color: '#BBE1FA'}}/>
            <DataTable value={users} paginator rows={7}
                       selectionMode="single"
                       reorderableRows={true}
                       resizableColumns={true}
                       reorderableColumns={true}
                       onRowReorder={(e) => setUsers(e.value)} tableStyle={{minWidth: '50rem'}}
                       paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                       currentPageReportTemplate="{first} to {last} of {totalRecords}">

                <Column rowReorder style={{width: '3rem'}}/>
                <Column field="username" header="Username" alignHeader={"center"}
                        style={{textAlign: 'center', fontWeight: 'bold'}}></Column>
                <Column field="email" header="Email" alignHeader={"center"}
                        style={{textAlign: 'center', fontWeight: 'bold'}}></Column>
                <Column field="creationDateStr" header="Creation Date" alignHeader={"center"}
                        style={{textAlign: 'center', fontWeight: 'bold'}}></Column>
                <Column field="is_account_blocked" header="Is Blocked" alignHeader={"center"} body={userBlockedTemplate}
                        style={{textAlign: 'center'}}></Column>
                <Column field="deleted_at" header="Is Removed" alignHeader={"center"} body={userDeletedAtTemplate}
                        style={{textAlign: 'center'}}></Column>
                <Column field="edit" header="User Edit" alignHeader={"center"} style={{textAlign: 'center'}}
                        body={userEditTemplate}/>
                <Column field="profileEdit" header="Profile Edit" alignHeader={"center"}
                        body={(evt) => userProfileEditTemplate(evt)}
                        style={{textAlign: 'center'}}></Column>
                <Column field="remove" header="Remove" alignHeader={"center"} style={{textAlign: 'center'}}
                        body={removeTemplate}>
                </Column>
            </DataTable>
        </div>
    );
}

export default UsersTableComponent;