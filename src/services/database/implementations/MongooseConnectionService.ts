import connection, {
    IConnection,
    IConnectionDocument,
    ISavedConnection,
} from "../../../models/connection";

import Connection from "../../../models/connection";
import HttpException from "../../../util/HttpException";

import { IConnectionService } from "../ConnectionService";

export default class MongooseConnectionService implements IConnectionService {
    async save(connection: IConnection) {
        const mongooseConnection = new Connection({ ...connection });

        const savedConnection = await mongooseConnection.save();

        const formattedConnection = this.formatConnection(savedConnection);

        return formattedConnection;
    }

    async getConnectionsByCitiesAndDate(
        from: string,
        to: string,
        date: string
    ) {
        const connections = await Connection.find({ dateString: date })
            .find({
                "cities.city.name": from,
            })
            .find({ "cities.city.name": to });

        const filteredConnections = connections.filter((connection) => {
            const departureCity = connection.cities.find((city) => city.city.name === from);
            const arrivalCity = connection.cities.find((city) => city.city.name === to);

            if(!departureCity || !arrivalCity) return false;

            return departureCity.date < arrivalCity.date;
        })

        const formattedConnections = filteredConnections.map(this.formatConnection);

        return formattedConnections;
    }

    private formatConnection(connection: IConnectionDocument) {
        const formattedConnection: ISavedConnection = {
            id: connection._id.toString(),
            trainType: connection.trainType,
            cities: connection.cities,
            dateString: connection.dateString,
        };

        return formattedConnection;
    }
}
