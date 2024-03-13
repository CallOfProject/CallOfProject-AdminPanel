import React, {useEffect, useState} from "react";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import './Projects.css'
import SidebarComponent from "../sidebar/SidebarComponent";
import ProjectUpdateComponent from "../project-update/ProjectUpdateComponent";

interface Customer {
    projectName: string;
    owner: string;
    projectStatus: string;
    startDate: string;
    participantStatus: string;
    edit: JSX.Element;
}

const ProjectsTableComponent = () => {

    /*<Button type="button" severity="danger" icon="pi pi-trash" rounded outlined/>*/
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleEditProjectBtn = () => {
        setIsOpen(!isOpen)
    };
    useEffect(() => {
        const customersToAdd: Customer[] = [];
        for (let i = 0; i < 60; i++) {
            const customer: Customer = {
                projectName: 'ORM Framework',
                owner: 'nuricanozturk',
                projectStatus: 'IN_PROGRESS',
                startDate: '2024-03-11',
                participantStatus: "3/10",
                edit: <Button type="button" onClick={() => handleEditProjectBtn()} icon="pi pi-pencil" rounded
                              outlined/>
            };
            customersToAdd.push(customer);
        }
        setCustomers(customersToAdd);
    }, []);

    return (
        <div className="card">
            {isOpen && <ProjectUpdateComponent openProjectEditDialog={isOpen} setOpenProjectEditDialog={setIsOpen}/>}
            <div className="my-navbar">
                <SidebarComponent/>
            </div>
            <div className="projects-container">
                <h2 style={{textAlign: 'center'}}>PROJECT CONTROL PAGE</h2>
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
                    <Column field="projectName" header="Title" alignHeader={"center"}
                            style={{textAlign: 'center'}}></Column>
                    <Column field="owner" header="Owner" alignHeader={"center"}
                            style={{textAlign: 'center'}}></Column>
                    <Column field="projectStatus" header="Status" alignHeader={"center"}
                            style={{textAlign: 'center'}}></Column>
                    <Column field="startDate" header="Start Date" alignHeader={"center"}
                            style={{textAlign: 'center'}}></Column>
                    <Column field="participantStatus" header="Participant" alignHeader={"center"}
                            style={{textAlign: 'center'}}></Column>
                    <Column field="edit" header="Edit" alignHeader={"center"}
                            style={{textAlign: 'center'}}></Column>
                </DataTable>
            </div>

        </div>
    );
}

export default ProjectsTableComponent;