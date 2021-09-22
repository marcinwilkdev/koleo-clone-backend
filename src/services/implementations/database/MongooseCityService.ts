import CityService from "../../database/CityService";

import City, { ICity, ICityDocument, ISavedCity } from "../../../models/city";

export default class MongooseCityService implements CityService {
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

    private formatCity(city: ICityDocument): ISavedCity {
        return {
            id: city._id.toString(),
            name: city.name,
        };
    }
}
