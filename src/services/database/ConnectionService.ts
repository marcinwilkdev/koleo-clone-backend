import { IConnection, ISavedConnection } from "../../models/connection";

export interface IConnectionService {
    save: (connection: IConnection) => Promise<ISavedConnection>;
    findById: (id: string) => Promise<ISavedConnection | null>;
    getConnectionsByCities: (from: string, to: string) => Promise<ISavedConnection[]>;
}

export default class ConnectionService {
    static instance: IConnectionService;

    static init(instance: IConnectionService) {
        this.instance = instance;
    }

    static getInstance() {
        return this.instance;
    }
}
