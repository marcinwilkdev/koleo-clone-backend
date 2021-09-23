import { ISavedUser, IUser, IUserDocument } from "../../models/user";

export interface IUserService {
    findById: (id: string) => Promise<ISavedUser | null>;
    findByEmail: (email: string) => Promise<ISavedUser | null>;
    save: (user: IUser) => Promise<ISavedUser>;
    update: (user: ISavedUser) => Promise<ISavedUser>;
}

export default abstract class UserService {
    static instance: IUserService;

    static init(instance: IUserService) {
        this.instance = instance;
    }

    static getInstance() {
        return this.instance;
    }
}