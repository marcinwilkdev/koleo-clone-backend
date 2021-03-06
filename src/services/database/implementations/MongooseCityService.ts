import { ICityService } from "../CityService";

import City, { ICity, ICityDocument, ISavedCity } from "../../../models/city";

export default class MongooseCityService implements ICityService {
    async findAll() {
        const foundCities = await City.find();

        const formattedCities: ISavedCity[] = foundCities.map(this.formatCity);

        return formattedCities;
    }

    async save(city: ICity) {
        const mongooseCity = new City({ ...city });

        const savedCity = await mongooseCity.save();

        const formattedCity: ISavedCity = this.formatCity(savedCity);

        return formattedCity;
    }

    async deleteAll() {
        await City.deleteMany({});
    }

    private formatCity(city: ICityDocument): ISavedCity {
        return {
            id: city._id.toString(),
            name: city.name,
        };
    }
}
