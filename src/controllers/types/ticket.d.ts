export interface CreateTicketRequestBody {
    id: string;
    departureCity: string;
    arrivalCity: string;
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
