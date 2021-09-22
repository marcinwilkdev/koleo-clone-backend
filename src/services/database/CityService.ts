import { ICity, ISavedCity } from "../../models/city";

export default interface CityService {
    findAll: () => Promise<ISavedCity[]>;
    save: (city: ICity) => Promise<ISavedCity>;
}