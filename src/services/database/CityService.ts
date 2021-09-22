import { ICity, ISavedCity } from "../../models/city";

export interface ICityService {
    findAll: () => Promise<ISavedCity[]>;
    save: (city: ICity) => Promise<ISavedCity>;
}

export default abstract class CityService{
    static instance: ICityService;

    static init(instance: ICityService) {
        this.instance = instance;
    }

    static getInstance() {
        return this.instance;
    }
}