import { ISavedTicket, ITicket } from "../../models/ticket";

export interface ITicketService {
    save: (ticket: ITicket) => Promise<ISavedTicket>;
    findAllByOwnerIdPaged: (
        ownerId: string,
        perPage: number,
        pageNumber: number
    ) => Promise<ISavedTicket[]>;
    countAllByOwnerId: (ownerId: string) => Promise<number>;
}

export default abstract class TicketService {
    static instance: ITicketService;

    static init(instance: ITicketService) {
        this.instance = instance;
    }

    static getInstance() {
        return this.instance;
    }
}