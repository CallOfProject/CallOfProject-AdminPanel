import SidebarComponent from "../sidebar/SidebarComponent";
import React, {useContext, useRef} from "react";
import {Card} from "primereact/card";
import './Settings.css';
import {confirmPopup, ConfirmPopup} from "primereact/confirmpopup";
import {Toast} from "primereact/toast";
import {Button} from "primereact/button";
import {Accordion, AccordionTab} from 'primereact/accordion';
import {PrimeReactContext} from "primereact/api";

const SettingsPageComponent = () => {
    const toast = useRef<Toast>(null);
    const {changeTheme} = useContext(PrimeReactContext);

    //changeTheme(currentTheme: string, newTheme: string, linkElementId: string, callback: Function)
    const accept = () => {
        toast.current!.show({severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000});
    };

    const reject = () => {
        toast.current!.show({severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000});
    };

    const confirm1 = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Are you sure you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept,
            reject
        });
    };


    return (
        <div className="card">
            <Toast ref={toast}/>
            <ConfirmPopup/>
            <div className="my-navbar">
                <SidebarComponent/>
            </div>
            <Card title="Scheduler Settings" className="settings-container">
                <Accordion multiple activeIndex={[0]}>
                    <AccordionTab header="Interview Service">
                        <div className="flex flex-row justify-content-around gap-5">
                            <Button className="p-button" severity="warning" outlined rounded
                                    onClick={(evt) => confirm1(evt)} icon="pi pi-calendar-times"
                                    label="Start Time (Test)"></Button>

                            <Button className="p-button" severity="warning" outlined rounded
                                    onClick={(evt) => confirm1(evt)} icon="pi pi-calendar-times"
                                    label="Start Time (Coding)"></Button>
                            <Button className="p-button" severity="warning" outlined rounded
                                    onClick={(evt) => confirm1(evt)} icon="pi pi-calendar-times"
                                    label="Reminder (Test)"></Button>

                            <Button className="p-button" severity="warning" outlined rounded
                                    onClick={(evt) => confirm1(evt)} icon="pi pi-calendar-times"
                                    label="Reminder (Coding)"></Button>
                            <Button className="p-button" severity="warning" outlined rounded
                                    onClick={(evt) => confirm1(evt)} icon="pi pi-calendar-times"
                                    label="Expired (Test)"></Button>

                            <Button className="p-button" severity="warning" outlined rounded
                                    onClick={(evt) => confirm1(evt)} icon="pi pi-calendar-times"
                                    label="Expired (Coding)"></Button>
                        </div>
                    </AccordionTab>
                    <AccordionTab header="Project Service">
                        <div className="flex flex-row justify-content-around gap-5">
                            <Button className="p-button" severity="info" outlined rounded
                                    onClick={(evt) => confirm1(evt)} icon="pi pi-calendar-times"
                                    label="Schedule Project Deadline"></Button>

                            <Button className="p-button" severity="info" outlined rounded
                                    onClick={(evt) => confirm1(evt)} icon="pi pi-calendar-times"
                                    label="Schedule Feedback Timeout"></Button>
                            <Button className="p-button" severity="info" outlined rounded
                                    onClick={(evt) => confirm1(evt)} icon="pi pi-calendar-times"
                                    label="Schedule Feedbacks"></Button>

                            <Button className="p-button" severity="info" outlined rounded
                                    onClick={(evt) => confirm1(evt)} icon="pi pi-calendar-times"
                                    label="Schedule Project Start Date"></Button>
                        </div>
                    </AccordionTab>
                    <AccordionTab header="Task Service">
                        <div className="flex flex-row justify-content-evenly gap-5">
                            <Button className="p-button" severity="help" outlined rounded
                                    onClick={(evt) => confirm1(evt)} icon="pi pi-calendar-times"
                                    label="Schedule Notify User"></Button>

                            <Button className="p-button" severity="help" outlined rounded
                                    onClick={(evt) => confirm1(evt)} icon="pi pi-calendar-times"
                                    label="Schedule Expired Tasks"></Button>
                        </div>
                    </AccordionTab>
                </Accordion>
            </Card>
        </div>
    )
}

export default SettingsPageComponent;