import {
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

    async findById(id: string) {
        const foundConnection = await Connection.findById(id);

        if(!foundConnection) return null;

        const formattedConnection = this.formatConnection(foundConnection);

        return formattedConnection;
    }

    async getConnectionsByCities(from: string, to: string) {
        const connections = await Connection.find({
            "cities.city.name": from,
        }).find({ "cities.city.name": to });

        const filteredConnections = connections.filter((connection) => {
            const departureCity = connection.cities.find(
                (city) => city.city.name === from
            );
            const arrivalCity = connection.cities.find(
                (city) => city.city.name === to
            );

            if (!departureCity || !arrivalCity) return false;

            return departureCity.date < arrivalCity.date;
        });

        const formattedConnections = filteredConnections.map(
            this.formatConnection
        );

        const preparedConnections: ISavedConnection[] =
            formattedConnections.map((connection) => {
                const departureCityIndex = connection.cities.findIndex(
                    (city) => city.city.name === from
                );
                const arrivalCityIndex = connection.cities.findIndex(
                    (city) => city.city.name === to
                );

                const preparedCities = connection.cities.slice(
                    departureCityIndex,
                    arrivalCityIndex + 1
                );

                return {
                    ...connection,
                    cities: preparedCities,
                };
            });

        return preparedConnections;
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
