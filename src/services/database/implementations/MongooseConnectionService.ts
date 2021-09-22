import {
    IConnection,
    IConnectionDocument,
    ISavedConnection,
} from "../../../models/connection";

import Connection from "../../../models/connection";

import { IConnectionService } from "../ConnectionService";

export default class MongooseConnectionService implements IConnectionService {
    async save(connection: IConnection) {
        const mongooseConnection = new Connection({ ...connection });

        const formattedConnection = this.formatConnection(mongooseConnection);

        return formattedConnection;
    }

    private formatConnection(connection: IConnectionDocument) {
        const formattedConnection: ISavedConnection = {
            id: connection._id.toString(),
            trainType: connection.trainType,
            cities: connection.cities,
        };

        return formattedConnection;
    }
}
