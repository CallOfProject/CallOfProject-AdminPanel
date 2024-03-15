import {PREFIX} from "../util/ConnectionUtil";
import axios from "axios";
import {TicketAnswerDTO, TicketDTO} from "../dto/Models";

export const findAllOpenTicketsByPage = async (page: number) => {
    try {
        const LOGIN_URL = `${PREFIX}/api/ticket/find/all?page=${page}`
        //const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(LOGIN_URL);
        return response.data.object.map((ticket: any) => {
            return new TicketDTO(ticket.id, ticket.user_id, ticket.admin_id, ticket.admin_username, ticket.username, ticket.user_email, ticket.title, ticket.feedback_deadline, ticket.answered_date, ticket.created_date, ticket.status, ticket.description)
        })
    } catch (error) {
        console.log(error)
    }
}


export const giveFeedbackForTicket = async (answerDTO: TicketAnswerDTO) => {
    try {
        const LOGIN_URL = `${PREFIX}/api/ticket/response`
        //const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.post(LOGIN_URL, answerDTO);
        const ticket = response.data.object
        return new TicketDTO(ticket.id, ticket.user_id, ticket.admin_id, ticket.admin_username, ticket.username, ticket.user_email, ticket.title, ticket.feedback_deadline, ticket.answered_date, ticket.created_date, ticket.status, ticket.description)
    } catch (error) {
        console.log(error)
    }
}


export const findOpenTicketCount = async () => {
    try {
        const LOGIN_URL = `${PREFIX}/api/ticket/find/open-count`
        //const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(LOGIN_URL);
        return response.data.object
    } catch (error) {
        console.log(error)
    }
}