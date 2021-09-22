import { ISavedTicket, ITicket } from "../../models/ticket";

export default interface TicketService {
    save: (ticket: ITicket) => Promise<ISavedTicket>;
    findAllByOwnerIdPaged: (
        ownerId: string,
        perPage: number,
        pageNumber: number
    ) => Promise<ISavedTicket[]>;
    countAllByOwnerId: (ownerId: string) => Promise<number>;
}
