import { ISavedUser, IUser } from "../../models/user";

export default interface UserService {
    findById: (id: string) => Promise<ISavedUser | null>;
    findByEmail: (email: string) => Promise<ISavedUser | null>;
    save: (user: IUser) => Promise<ISavedUser>;
}