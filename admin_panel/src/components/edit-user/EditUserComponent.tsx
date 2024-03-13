import {Avatar} from "primereact/avatar";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {FC, useState} from "react";
import {InputText} from "primereact/inputtext";
import {Calendar} from "primereact/calendar";
import {Nullable} from "primereact/ts-helpers";
import './EditUser.css'
import cop_logo from '../../assets/new_logo.png'
interface EditUserComponentProps {
    openUserEditDialog: boolean;
    setOpenUserEditDialog: (isOpen: boolean) => void;
}

const EditUserComponent: FC<EditUserComponentProps> = ({openUserEditDialog, setOpenUserEditDialog}) => {

    const [date, setDate] = useState<Nullable<Date>>(null);
    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            <Avatar image={cop_logo} shape="square"/>
            <span className="font-bold white-space-nowrap">Edit User</span>
        </div>
    );

    const footerContent = (
        <div>
            <Button outlined label="Close" severity="danger" icon="pi pi-times"
                    onClick={() => setOpenUserEditDialog(false)} autoFocus/>
            <Button outlined label="Save" icon="pi pi-save" onClick={() => setOpenUserEditDialog(false)} autoFocus/>
        </div>

    );

    return (
        <div className="edit-container card flex justify-content-center">
            <Dialog visible={openUserEditDialog} modal header={headerElement} footer={footerContent}
                    onHide={() => setOpenUserEditDialog(false)}>

                <div className="card flex-column md:flex-row gap-3" style={{margin: '15px', width: '700px'}}>
                    <div className="flex flex-column gap-2" style={{margin: '15px'}}>
                        <label htmlFor="firstName">First Name</label>
                        <InputText id="firstName" placeholder="First Name"/>
                    </div>

                    <div className="flex flex-column gap-2" style={{margin: '15px'}}>
                        <label htmlFor="middleName">Middle Name</label>
                        <InputText id="middleName" placeholder="Middle Name" aria-describedby="username-help"/>
                    </div>

                    <div className="flex flex-column gap-2" style={{margin: '15px'}}>
                        <label htmlFor="lastName">Last Name</label>
                        <InputText id="lastName" placeholder="Last Name"/>
                    </div>

                    <div className="flex flex-column gap-2" style={{margin: '15px'}}>
                        <label htmlFor="email">Email</label>
                        <InputText id="email" placeholder="Email"/>
                    </div>

                    <div className="flex flex-column gap-2" style={{margin: '15px'}}>
                        <label htmlFor="birthDate">Birth Date</label>
                        <Calendar id="birthDate" dateFormat="dd/mm/yy" value={date} onChange={(e) => setDate(e.value)}
                                  showIcon/>
                    </div>

                </div>
            </Dialog>
        </div>
    )
}

export default EditUserComponent;