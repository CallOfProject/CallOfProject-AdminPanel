import {FC, useRef, useState} from "react";
import {Nullable} from "primereact/ts-helpers";
import {Toast} from "primereact/toast";
import {Avatar} from "primereact/avatar";
import cop_logo from "../../assets/new_logo.png";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {InputTextarea} from "primereact/inputtextarea";
import {InputText} from "primereact/inputtext";
import {Editor, EditorTextChangeEvent} from "primereact/editor";

interface GiveFeedbackComponentProps {
    openGiveFeedbackDialog: boolean;
    setOpenGiveFeedbackDialog: (isOpen: boolean) => void;
}


const GiveFeedbackComponent: FC<GiveFeedbackComponentProps> = ({openGiveFeedbackDialog, setOpenGiveFeedbackDialog}) => {

    const [date, setDate] = useState<Nullable<Date>>(null);
    const toast = useRef<Toast>(null);
    const [value, setValue] = useState<string>('');
    const [text, setText] = useState<string>('');
    const onUpload = () => {
        /*toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });*/
    };

    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            <Avatar image={cop_logo} shape="square"/>
            <span className="font-bold white-space-nowrap">Give Feedback</span>
        </div>
    );

    const footerContent = (
        <div>
            <Button outlined label="Close" severity="danger" icon="pi pi-times"
                    onClick={() => setOpenGiveFeedbackDialog(false)} autoFocus/>
            <Button outlined label="Save" icon="pi pi-save" onClick={() => setOpenGiveFeedbackDialog(false)}
                    autoFocus/>
        </div>

    );

    return (
        <div className="edit-container card flex justify-content-center">
            <Dialog visible={openGiveFeedbackDialog} modal header={headerElement} footer={footerContent}
                    onHide={() => setOpenGiveFeedbackDialog(false)} style={{overflow: 'auto'}}>


                <div className="card flex-column md:flex-row gap-3" style={{margin: '10px', width: '700px'}}>

                    <div className="flex flex-column gap-2" style={{margin: '10px'}}>
                        <label className="font-bold" htmlFor="ticketTitle">Ticket Title</label>
                        <InputText id="ticketTitle" placeholder="Ticket Title" readOnly={true}/>
                    </div>

                    <div className="flex flex-row justify-content-around">
                        <div className="flex flex-column gap-2" style={{margin: '10px'}}>
                            <label style={{textAlign: "center"}} className="font-bold" htmlFor="ticketOwner">Ticket
                                Owner</label>
                            <InputText id="ticketOwner" style={{width: "300px"}} placeholder="Ticket Owner"
                                       readOnly={true}/>
                        </div>

                        <div className="flex flex-column gap-2" style={{margin: '10px'}}>
                            <label style={{textAlign: "center"}} className="font-bold" htmlFor="ticketOwnerEmail">Ticket
                                Owner Email</label>
                            <InputText id="ticketOwnerEmail" placeholder="Email" readOnly={true}
                                       style={{width: "300px"}}/>
                        </div>
                    </div>


                    <div className="flex flex-row justify-content-around">
                        <div className="flex flex-column gap-2" style={{margin: '10px'}}>
                            <label style={{textAlign: "center"}} className="font-bold"
                                   htmlFor="adminUsername">Admin</label>
                            <InputText id="adminUsername" style={{width: "300px"}} placeholder="Admin"
                                       readOnly={true}/>
                        </div>

                        <div className="flex flex-column gap-2" style={{margin: '10px'}}>
                            <label style={{textAlign: "center"}} className="font-bold" htmlFor="adminEmail">Admin
                                Email</label>
                            <InputText id="adminEmail" placeholder="Admin Email" readOnly={true}
                                       style={{width: "300px"}}/>
                        </div>
                    </div>


                    <div className="card flex justify-content-center" style={{marginTop: "15px", padding: "10px"}}>
                        <span className="p-float-label">
                            <InputTextarea id="description" value={"value"} onChange={(e) => setValue(e.target.value)}
                                           style={{width: '100%'}} autoResize readOnly={true}
                                           rows={10}
                                           cols={80}/>
                            <label className="font-bold" style={{fontSize: "12pt"}} htmlFor="description">Ticket Description</label>
                        </span>
                    </div>

                    <div className="card flex justify-content-center" style={{marginTop: "15px", padding: "10px"}}>
                        <Editor id="feedback" value={text}
                                onTextChange={(e: EditorTextChangeEvent) => setText(e.htmlValue!)}
                                style={{height: '320px', width: '100%'}}/>
                    </div>

                    <br/>
                </div>
            </Dialog>
        </div>
    )
}

export default GiveFeedbackComponent;