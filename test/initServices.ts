import { ISavedCity } from "../src/models/city";
import { ISavedConnection } from "../src/models/connection";
import { ISavedTicket } from "../src/models/ticket";
import { ISavedUser } from "../src/models/user";
import CityService from "../src/services/database/CityService";
import ConnectionService from "../src/services/database/ConnectionService";
import TicketService from "../src/services/database/TicketService";
import UserService from "../src/services/database/UserService";
import EncryptionService from "../src/services/other/EncryptionService";
import WebTokenService from "../src/services/other/WebTokenService";

const savedUser: ISavedUser = {
    id: "",
    email: "",
    password: "",
    dateOfBirth: new Date(),
    discount: "",
    firstName: "",
    lastName: "",
};

const savedCity: ISavedCity = {
    id: "",
    name: "",
};

const savedConnection: ISavedConnection = {
    cities: [],
    trainType: "",
    id: "",
};

const savedTicket: ISavedTicket = {
    id: "",
    date: new Date(),
    arrivalCity: "",
    departureCity: "",
    price: 0,
    ticketType: "",
    trainType: "",
    ownerId: "",
};

export const initServices = () => {
    UserService.init({
        save: async () => savedUser,
        update: async () => savedUser,
        findByEmail: async () => null,
        findById: async () => null,
    });

    CityService.init({
        findAll: async () => [],
        save: async () => savedCity,
    });

    EncryptionService.init({
        compare: async () => false,
        hash: async () => "",
    });

    WebTokenService.init({
        secret: "",
        sign: () => "",
        verify: () => {},
    });

    ConnectionService.init({
        findById: async () => null,
        getConnectionsByCities: async () => [],
        save: async () => savedConnection,
    });

    TicketService.init({
        countAllByOwnerId: async () => 0,
        findAllByOwnerIdPaged: async () => [],
        save: async () => savedTicket,
    });
};