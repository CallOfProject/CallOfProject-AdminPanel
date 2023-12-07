export class ProjectDTO {
    constructor(projectId, projectTitle, participantCount, startDate) {
        this.projectId = projectId;
        this.projectTitle = projectTitle;
        this.participantCount = participantCount;
        this.startDate = startDate;
    }
}