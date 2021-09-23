import { ISavedConnection, ISavedConnectionWithPrice } from "../../models/connection";

export interface AddConnectionResponseBody {
    message: string;
}

export interface FindConnectionsResponseBody {
    message: string;
    connections: ISavedConnectionWithPrice[];
}