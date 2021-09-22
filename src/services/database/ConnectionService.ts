import { IConnection, ISavedConnection } from "../../models/connection";

export interface IConnectionService {
    save: (connection: IConnection) => Promise<ISavedConnection>;
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
