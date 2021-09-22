export interface CreateTicketRequestBody {
    date: Date;
    departureCity: string;
    arrivalCity: string;
    ticketType: string;
    trainType: string;
    price: number;
}

export interface CreateTicketResponseBody {
    message: string;
}

export interface GetTicketsResponseBody {
    message: string;
    tickets: ISavedTicket[];
}

export interface GetTicketsCountResponseBody {
    message: string;
    ticketsCount: number;
}
