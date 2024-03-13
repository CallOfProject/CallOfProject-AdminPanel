import {FC, useEffect, useRef, useState} from "react";
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
import {findUserProfile} from "../../services/UserService";
import {UserProfile} from "../../dto/Models";

interface EditUserComponentProps {
    openUserProfileEditDialog: boolean;
    setOpenUserProfileEditDialog: (isOpen: boolean) => void;
    userId: string;
}

const UserProfileComponent: FC<EditUserComponentProps> = ({
                                                              userId,
                                                              openUserProfileEditDialog,
                                                              setOpenUserProfileEditDialog
                                                          }) => {
    const toast = useRef<Toast>(null);
    const [value, setValue] = useState<string>('');
    const [userProfile, setUserProfile] = useState<UserProfile | Nullable>(null);
    const onUpload = () => {
        /*toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });*/
    };

    const fetchData = async () => {
        const profile = await findUserProfile(userId);
        setUserProfile(profile)
    };
    useEffect(() => {
        fetchData()
    }, [])

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
                    <Image src={userProfile?.profile_photo} alt="Image" preview width="300"/>
                </div>
                <br/>
                <div className="card flex justify-content-center">
                    <Toast ref={toast}></Toast>
                    <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" maxFileSize={1000000}
                                onUpload={onUpload} chooseLabel={"Select Image"}/>
                </div>


                <div className="card flex-column md:flex-row gap-3" style={{margin: '15px', width: '700px'}}>

                    <div className="flex flex-row gap-3" style={{justifyContent: 'center'}}>

                        <div className="flex flex-column gap-2" style={{margin: '15px', textAlign: 'center'}}>
                            <label htmlFor="horizontal-buttons" className="font-bold block mb-2">User Rate</label>
                            <InputNumber inputId="horizontal-buttons" value={userProfile?.user_rate}
                                         showButtons buttonLayout="horizontal"
                                         step={0.5}
                                         max={10} min={0}
                                         decrementButtonClassName="p-button-danger"
                                         incrementButtonClassName="p-button-primary" incrementButtonIcon="pi pi-plus"
                                         decrementButtonIcon="pi pi-minus"/>
                        </div>

                        <div className="flex flex-column gap-2" style={{margin: '15px', textAlign: 'center'}}>
                            <label htmlFor="horizontal-buttons" className="font-bold block mb-2">Feedback Rate</label>
                            <InputNumber inputId="horizontal-buttons" value={userProfile?.user_feedback_rate}
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
                            <InputTextarea id="aboutMe" value={userProfile?.about_me}
                                           onChange={(e) => setValue(e.target.value)}
                                           style={{width: '100%'}} autoResize
                                           rows={5}
                                           cols={60}/>
                            <label className="font-bold" htmlFor="aboutMe">About me</label>
                        </span>
                    </div>

                    <br/>

                    <div className="flex flex-row gap-3" style={{justifyContent: 'center'}}>

                        <div className="flex flex-column gap-2" style={{margin: '15px', textAlign: 'center'}}>
                            <label className="font-bold" htmlFor="cv">Upload CV</label>
                            <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*"
                                        maxFileSize={1000000} onUpload={onUpload} auto chooseLabel="Browse"/>
                        </div>


                <div className="flex flex-column gap-2" style={{margin: '15px', textAlign: 'center'}}>
                    <label className="font-bold" htmlFor="downloadCv">Download CV</label>

                    <a href={userProfile?.cv} download style={{color: "black"}}>
                        <Button disabled={userProfile?.cv === null} label="Download" icon="pi pi-download" className="p-button-primary"/>
                    </a>

                </div>

        </div>


</div>
</Dialog>
</div>
)
}

export default UserProfileComponent;