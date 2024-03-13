import React, {useEffect, useState} from "react";
import {RadioButton} from "primereact/radiobutton";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import './Ticket.css';
import SidebarComponent from "../sidebar/SidebarComponent";
import GiveFeedbackComponent from "../feedback-page/GiveFeedbackComponent";

interface Customer {
    title: string;
    createdDate: string;
    answeredDate: string;
    feedbackDeadline: string;
    open: JSX.Element;
    giveFeedback: JSX.Element;
    username: string;
    closeTicket: JSX.Element;
}

const TicketsTableComponent = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [openGiveFeedbackDialog, setOpenGiveFeedbackDialog] = useState<boolean>(false);


    const handleGiveFeedbackBtn = () => {
        setOpenGiveFeedbackDialog(!openGiveFeedbackDialog)
    };
    useEffect(() => {
        const customersToAdd: Customer[] = [];
        for (let i = 0; i < 20; i++) {
            const customer: Customer = {
                title: 'Ticket Title',
                createdDate: '2024-03-11',
                answeredDate: '2024-03-11',
                feedbackDeadline: '2024-03-11',
                open: <RadioButton checked={false}/>,
                giveFeedback: <Button className="p-button-sm" onClick={() => handleGiveFeedbackBtn()}
                                      label="Give Feedback" severity="success" outlined/>,
                username: 'janesmith',
                closeTicket: <Button className="p-button-sm" label="Close Ticket" severity="danger" outlined/>
            };
            customersToAdd.push(customer);
        }
        setCustomers(customersToAdd);
    }, []);

    return (
        <div className="card">
            {openGiveFeedbackDialog && <GiveFeedbackComponent openGiveFeedbackDialog={openGiveFeedbackDialog}
                                                              setOpenGiveFeedbackDialog={setOpenGiveFeedbackDialog}/>}
            <div className="my-navbar">
                <SidebarComponent/>
            </div>
            <div className="ticket-container card">
                <h2 style={{textAlign: 'center'}}>TICKET CONTROL PAGE</h2>
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
                    <Column field="title" header="Title" alignHeader={"center"} style={{textAlign: 'center'}}></Column>
                    <Column field="username" header="Username" alignHeader={"center"}
                            style={{textAlign: 'center'}}></Column>
                    <Column field="createdDate" header="Created Date" alignHeader={"center"}
                            style={{textAlign: 'center'}}></Column>
                    <Column field="answeredDate" header="Answered Date" alignHeader={"center"}
                            style={{textAlign: 'center'}}></Column>
                    <Column field="feedbackDeadline" header="Feedback Deadline Date" alignHeader={"center"}
                            style={{textAlign: 'center'}}></Column>
                    <Column field="open" header="Open/Close" alignHeader={"center"}
                            style={{textAlign: 'center'}}></Column>
                    <Column field="giveFeedback" alignHeader={"center"} style={{textAlign: 'center'}}></Column>
                    <Column field="closeTicket" alignHeader={"center"} style={{textAlign: 'center'}}></Column>
                </DataTable>
            </div>
        </div>

    );
}

export default TicketsTableComponent;
