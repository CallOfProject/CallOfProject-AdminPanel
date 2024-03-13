export class ProjectDTO {
    constructor(project_id, project_title, max_participant, start_date, project_owner_name) {
        this.project_id = project_id;
        this.project_title = project_title;
        this.max_participant = max_participant;
        this.start_date = start_date;
        this.project_owner_name = project_owner_name;
    }
}