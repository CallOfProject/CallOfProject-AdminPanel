import {FC, useRef, useState} from "react";
import {Nullable} from "primereact/ts-helpers";
import {Avatar} from "primereact/avatar";
import cop_logo from "../../assets/new_logo.png";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {Toast} from "primereact/toast";
import {Image} from "primereact/image";
import {FileUpload} from "primereact/fileupload";
import {InputTextarea} from "primereact/inputtextarea";
import {InputText} from "primereact/inputtext";
import {Calendar} from "primereact/calendar";
import {Dropdown, DropdownChangeEvent} from "primereact/dropdown";

interface EditProjectComponentProps {
    openProjectEditDialog: boolean;
    setOpenProjectEditDialog: (isOpen: boolean) => void;
}

interface City {
    name: string;
    code: string;
}

const ProjectUpdateComponent: FC<EditProjectComponentProps> = ({openProjectEditDialog, setOpenProjectEditDialog}) => {

    const [date, setDate] = useState<Nullable<Date>>(null);
    const toast = useRef<Toast>(null);
    const [value, setValue] = useState<string>('');

    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const cities: City[] = [
        {name: 'New York', code: 'NY'},
        {name: 'Rome', code: 'RM'},
        {name: 'London', code: 'LDN'},
        {name: 'Istanbul', code: 'IST'},
        {name: 'Paris', code: 'PRS'}
    ];
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
                    onClick={() => setOpenProjectEditDialog(false)} autoFocus/>
            <Button outlined label="Save" icon="pi pi-save" onClick={() => setOpenProjectEditDialog(false)}
                    autoFocus/>
        </div>

    );

    return (
        <div className="edit-container card flex justify-content-center">
            <Dialog visible={openProjectEditDialog} modal header={headerElement} footer={footerContent}
                    onHide={() => setOpenProjectEditDialog(false)} style={{overflow: 'auto'}}>
                <div className="card flex justify-content-center">
                    <Image src={cop_logo} alt="Image" preview width="230"/>
                </div>
                <div className="card flex justify-content-center">
                    <Toast ref={toast}></Toast>
                    <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" maxFileSize={1000000}
                                onUpload={onUpload} chooseLabel={"Select Image"}/>
                </div>


                <div className="card flex-column md:flex-row gap-3" style={{margin: '15px', width: '600px'}}>
                    <div className="flex flex-column gap-2" style={{margin: '15px'}}>
                        <label htmlFor="projectName">Project Name</label>
                        <InputText id="projectName" placeholder="Project Name"/>
                    </div>

                    <div className="card flex justify-content-center gap-5" style={{margin: '15px'}}>
                        <span className="p-float-label">
                            <InputTextarea id="summary" value={value} onChange={(e) => setValue(e.target.value)}
                                           style={{width: '100%'}} autoResize
                                           rows={5}
                                           cols={60}/>
                            <label className="font-bold" htmlFor="summary">Project Summary</label>
                        </span>
                    </div>

                    <div className="card flex justify-content-center" style={{margin: '15px'}}>
                        <span className="p-float-label gap-5">
                            <InputTextarea id="description" value={value} onChange={(e) => setValue(e.target.value)}
                                           style={{width: '100%'}} autoResize
                                           rows={5}
                                           cols={60}/>
                            <label className="font-bold" htmlFor="description">Project Description</label>
                        </span>
                    </div>

                    <div className="card flex justify-content-center" style={{margin: '15px'}}>
                        <span className="p-float-label gap-5">
                            <InputTextarea id="aim" value={value} onChange={(e) => setValue(e.target.value)}
                                           style={{width: '100%'}} autoResize
                                           rows={5}
                                           cols={60}/>
                            <label className="font-bold" htmlFor="aim">Project Aim</label>
                        </span>
                    </div>

                    <div className="flex flex-row gap-3" style={{justifyContent: 'center'}}>
                        <div className="flex flex-column gap-2" style={{margin: '15px'}}>
                            <label htmlFor="projectAccessType">Project Access Type</label>
                            <Dropdown id="projectAccessType" value={selectedCity}
                                      onChange={(e: DropdownChangeEvent) => setSelectedCity(e.value)}
                                      options={cities} optionLabel="name"
                                      placeholder="Select a City" className="w-full md:w-14rem"/>
                        </div>

                        <div className="flex flex-column gap-2" style={{margin: '15px'}}>
                            <label htmlFor="professionLevel">Project Professional Level</label>
                            <Dropdown id="professionLevel" value={selectedCity}
                                      onChange={(e: DropdownChangeEvent) => setSelectedCity(e.value)}
                                      options={cities} optionLabel="name"
                                      placeholder="Select a City" className="w-full md:w-14rem"/>
                        </div>

                    </div>


                    <div className="flex flex-row gap-3" style={{justifyContent: 'center'}}>
                        <div className="flex flex-column gap-2" style={{margin: '15px'}}>
                            <label htmlFor="degree">Recommended Degree</label>
                            <Dropdown id="degree" value={selectedCity}
                                      onChange={(e: DropdownChangeEvent) => setSelectedCity(e.value)}
                                      options={cities} optionLabel="name"
                                      placeholder="Select a City" className="w-full md:w-14rem"/>
                        </div>

                        <div className="flex flex-column gap-2" style={{margin: '15px'}}>
                            <label htmlFor="projectLevel">Project Level</label>
                            <Dropdown id="projectLevel" value={selectedCity}
                                      onChange={(e: DropdownChangeEvent) => setSelectedCity(e.value)}
                                      options={cities} optionLabel="name"
                                      placeholder="Select a City" className="w-full md:w-14rem"/>
                        </div>

                    </div>


                    <div className="flex flex-row gap-3" style={{justifyContent: 'center'}}>
                        <div className="flex flex-column gap-2" style={{margin: '15px'}}>
                            <label htmlFor="applicationDeadline">Application Date</label>
                            <Calendar id="applicationDeadline" dateFormat="dd/mm/yy" value={date}
                                      onChange={(e) => setDate(e.value)}
                                      showIcon/>
                        </div>
                        <div className="flex flex-column gap-2" style={{margin: '15px'}}>
                            <label htmlFor="expectedCompletionDate">Expected Completion Date</label>
                            <Calendar id="expectedCompletionDate" dateFormat="dd/mm/yy" value={date}
                                      onChange={(e) => setDate(e.value)}
                                      showIcon/>
                        </div>
                    </div>

                    <div className="flex flex-row gap-3" style={{justifyContent: 'center'}}>
                        <div className="flex flex-column gap-2" style={{margin: '15px'}}>
                            <label htmlFor="startDate">Start Date</label>
                            <Calendar id="startDate" dateFormat="dd/mm/yy" value={date}
                                      onChange={(e) => setDate(e.value)}
                                      showIcon/>
                        </div>

                        <div className="flex flex-column gap-2" style={{margin: '15px'}}>
                            <label htmlFor="completionDate">Completion Date</label>
                            <Calendar id="completionDate" dateFormat="dd/mm/yy" value={date}
                                      onChange={(e) => setDate(e.value)}
                                      showIcon/>
                        </div>
                    </div>

                </div>
            </Dialog>
        </div>
    )
}

export default ProjectUpdateComponent;
