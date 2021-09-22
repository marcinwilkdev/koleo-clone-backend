import { ITicketService } from "../../database/TicketService";

import Ticket, {
    ISavedTicket,
    ITicket,
    ITicketDocument,
} from "../../../models/ticket";

export default class MongooseTicketService implements ITicketService {
    async save(ticket: ITicket) {
        const mongooseTicket = new Ticket({ ...ticket });

        const savedTicket = await mongooseTicket.save();

        const formattedTicket = this.formatTicket(savedTicket);

        return formattedTicket;
    }

    async countAllByOwnerId(ownerId: string) {
        const count = await Ticket.find({ ownerId }).countDocuments();

        return count;
    }

    async findAllByOwnerIdPaged(
        ownerId: string,
        perPage: number,
        pageNumber: number
    ) {
        const tickets = await Ticket.find({ ownerId })
            .sort({ date: -1 })
            .limit(perPage)
            .skip((pageNumber - 1) * perPage);

        const formattedTickets = tickets.map(this.formatTicket);

        return formattedTickets;
    }

    private formatTicket(ticket: ITicketDocument): ISavedTicket {
        return {
            id: ticket._id.toString(),
            date: ticket.date,
            arrivalCity: ticket.arrivalCity,
            departureCity: ticket.departureCity,
            ownerId: ticket.ownerId,
            price: ticket.price,
            ticketType: ticket.ticketType,
            trainType: ticket.trainType,
        };
    }
}
