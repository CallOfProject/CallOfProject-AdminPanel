export class ProjectUpdateDTO {
    constructor(project) {
        this.userId = project.userId;
        this.projectId = project.projectId;
        this.projectImage = project.projectImage;
        this.projectName = project.projectName;
        this.projectSummary = project.projectSummary;
        this.projectDescription = project.projectDescription;
        this.projectAim = project.projectAim;
        this.applicationDeadline = project.applicationDeadline;
        this.expectedCompletionDate = project.expectedCompletionDate;
        this.maxParticipantCount = project.maxParticipantCount;
        this.technicalRequirements = project.technicalRequirements;
        this.specialRequirements = project.specialRequirements;
        this.projectAccessType = project.projectAccessType;
        this.professionLevel = project.professionLevel;
        this.sector = project.sector;
        this.degree = project.degree;
        this.projectLevel = project.projectLevel;
        this.interviewType = project.interviewType;
        this.feedbackTimeRange = project.feedbackTimeRange;
        this.startDate = project.startDate;
        this.tags = project.tags;
    }
}