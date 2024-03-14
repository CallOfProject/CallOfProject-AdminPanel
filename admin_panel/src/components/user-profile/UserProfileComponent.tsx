import {FC, useEffect, useRef, useState} from "react";
import {Nullable} from "primereact/ts-helpers";
import {Avatar} from "primereact/avatar";
import cop_logo from "../../assets/new_logo.png";
import default_pp from "../../assets/user_pp.webp";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {Image} from 'primereact/image';
import {FileUpload} from "primereact/fileupload";
import {Toast} from "primereact/toast";
import {InputNumber} from "primereact/inputnumber";
import {InputTextarea} from "primereact/inputtextarea";
import {findUserProfile, updateUserProfile} from "../../services/UserService";
import {UserProfile, UserProfileUpdateDTO} from "../../dto/Models";

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
    const [aboutMe, setAboutMe] = useState<string>('');
    const [userProfile, setUserProfile] = useState<UserProfile | Nullable>(null);
    const [photo, setPhoto] = useState<File | null>(null);
    const [cv, setCv] = useState<File | null>(null);
    const onPhotoUpload = (event: any) => {
        const file = event.files[0];
        setPhoto(file);
    };

    const onCvUpload = (event: any) => {
        const file = event.files[0];
        setCv(file);
    };

    const handleSave = async () => {
        try {
            await updateUserProfile(new UserProfileUpdateDTO(aboutMe, userId), photo, cv);
            toast.current?.show({severity: 'success', summary: 'Success', detail: 'Profile updated successfully'});
            // Profili güncelledikten sonra gereken diğer işlemleri yapabilirsiniz
        } catch (error) {
            toast.current?.show({severity: 'error', summary: 'Error', detail: 'Failed to update profile'});
            console.error('Failed to update profile:', error);
        }
    };

    const fetchData = async () => {
        console.log("User ID: ", userId)
        const profile = await findUserProfile(userId);
        console.log("Profile: ", profile)
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
            <Button outlined label="Save" icon="pi pi-save" onClick={() => handleSave()}
                    autoFocus/>
        </div>

    );

    return (
        <div className="edit-container card flex justify-content-center">
            <Dialog visible={openUserProfileEditDialog} modal header={headerElement} footer={footerContent}
                    onHide={() => setOpenUserProfileEditDialog(false)} style={{overflow: 'auto'}}>
                <div className="card flex justify-content-center">
                    <Image src={userProfile?.profile_photo ? userProfile?.profile_photo : default_pp} alt="Image"
                           preview width="300"/>
                </div>
                <br/>
                <div className="card flex justify-content-center">
                    <Toast ref={toast}></Toast>
                    <input type="file" accept="image/*" onChange={(e) => {
                        const file = e.target.files![0];
                        setPhoto(file);
                    }}/>
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
                                           onChange={(e) => setAboutMe(e.target.value)}
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
                            <input type="file" accept="application/pdf" onChange={(e) => {
                                const file = e.target.files![0];
                                setCv(file);
                            }}/>
                        </div>


                        <div className="flex flex-column gap-2" style={{margin: '15px', textAlign: 'center'}}>
                            <label className="font-bold" htmlFor="downloadCv">Download CV</label>

                            <a href={userProfile?.cv} download style={{color: "black"}}>
                                <Button disabled={userProfile?.cv == null} label="Download" icon="pi pi-download"
                                        className="p-button-primary"/>
                            </a>

                        </div>

                    </div>


                </div>
            </Dialog>
        </div>
    )
}

export default UserProfileComponent;