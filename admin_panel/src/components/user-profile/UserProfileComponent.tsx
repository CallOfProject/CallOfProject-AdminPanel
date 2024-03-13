import {FC, useRef, useState} from "react";
import {Nullable} from "primereact/ts-helpers";
import {Avatar} from "primereact/avatar";
import cop_logo from "../../assets/new_logo.png";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {Image} from 'primereact/image';
import {FileUpload} from "primereact/fileupload";
import {Toast} from "primereact/toast";
import {InputNumber} from "primereact/inputnumber";
import {InputTextarea} from "primereact/inputtextarea";

interface EditUserComponentProps {
    openUserProfileEditDialog: boolean;
    setOpenUserProfileEditDialog: (isOpen: boolean) => void;
}

const UserProfileComponent: FC<EditUserComponentProps> = ({
                                                              openUserProfileEditDialog,
                                                              setOpenUserProfileEditDialog
                                                          }) => {
    const [date, setDate] = useState<Nullable<Date>>(null);
    const toast = useRef<Toast>(null);
    const [value, setValue] = useState<string>('');
    const onUpload = () => {
        /*toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });*/
    };

    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            <Avatar image={cop_logo} shape="square"/>
            <span className="font-bold white-space-nowrap">Edit User Profile</span>
        </div>
    );

    const footerContent = (
        <div>
            <Button outlined label="Close" severity="danger" icon="pi pi-times"
                    onClick={() => setOpenUserProfileEditDialog(false)} autoFocus/>
            <Button outlined label="Save" icon="pi pi-save" onClick={() => setOpenUserProfileEditDialog(false)}
                    autoFocus/>
        </div>

    );

    return (
        <div className="edit-container card flex justify-content-center">
            <Dialog visible={openUserProfileEditDialog} modal header={headerElement} footer={footerContent}
                    onHide={() => setOpenUserProfileEditDialog(false)} style={{overflow: 'auto'}}>
                <div className="card flex justify-content-center">
                    <Image src={cop_logo} alt="Image" preview width="230"/>
                </div>
                <div className="card flex justify-content-center">
                    <Toast ref={toast}></Toast>
                    <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" maxFileSize={1000000}
                                onUpload={onUpload} chooseLabel={"Select Image"}/>
                </div>


                <div className="card flex-column md:flex-row gap-3" style={{margin: '15px', width: '700px'}}>

                    <div className="flex flex-row gap-3" style={{justifyContent: 'center'}}>

                        <div className="flex flex-column gap-2" style={{margin: '15px', textAlign: 'center'}}>
                            <label htmlFor="horizontal-buttons" className="font-bold block mb-2">Horizontal with
                                Step</label>
                            <InputNumber inputId="horizontal-buttons" value={10}
                                         showButtons buttonLayout="horizontal"
                                         step={0.5}
                                         max={10} min={0}
                                         decrementButtonClassName="p-button-danger"
                                         incrementButtonClassName="p-button-primary" incrementButtonIcon="pi pi-plus"
                                         decrementButtonIcon="pi pi-minus"/>
                        </div>

                        <div className="flex flex-column gap-2" style={{margin: '15px', textAlign: 'center'}}>
                            <label htmlFor="horizontal-buttons" className="font-bold block mb-2">Horizontal with
                                Step</label>
                            <InputNumber inputId="horizontal-buttons" value={10}
                                         showButtons buttonLayout="horizontal"
                                         step={0.5}
                                         max={10} min={0}
                                         decrementButtonClassName="p-button-danger"
                                         incrementButtonClassName="p-button-primary" incrementButtonIcon="pi pi-plus"
                                         decrementButtonIcon="pi pi-minus"/>
                        </div>
                    </div>

                    <div className="card flex justify-content-center">
                        <span className="p-float-label">
                            <InputTextarea id="description" value={value} onChange={(e) => setValue(e.target.value)}
                                           style={{width: '100%'}} autoResize
                                           rows={5}
                                           cols={60}/>
                            <label className="font-bold" htmlFor="description">About me</label>
                        </span>
                    </div>

                    <br/>
                    <div className="card">
                        <label className="font-bold" htmlFor="cv">Upload CV</label>
                        <FileUpload id="cv" name="demo[]" url={'/api/upload'} maxFileSize={1000000}
                                    emptyTemplate={<p className="m-0">Drag and drop cv file to here to upload. (Recommended format is pdf)</p>}/>
                    </div>

                </div>
            </Dialog>
        </div>
    )
}

export default UserProfileComponent;