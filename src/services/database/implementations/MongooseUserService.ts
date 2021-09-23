import { IUserService } from "../../database/UserService";

import User, { ISavedUser, IUser, IUserDocument } from "../../../models/user";

export default class MongooseUserService implements IUserService {
    async findById(id: string) {
        const foundUser = await User.findById(id);

        if (!foundUser) return null;

        const formattedUser = this.formatUser(foundUser);

        return formattedUser;
    }

    async findByEmail(email: string) {
        const foundUser = await User.findOne({ email });

        if (!foundUser) return null;

        const formattedUser = this.formatUser(foundUser);

        return formattedUser;
    }

    async save(user: IUser) {
        const mongooseUser = new User({ ...user });

        const savedUser = await mongooseUser.save();

        const formattedUser = this.formatUser(savedUser);

        return formattedUser;
    }

    async update(user: ISavedUser) {
        const savedUser = await User.findByIdAndUpdate(user.id, user, {
            new: true,
        });

        const formattedUser = this.formatUser(savedUser);

        return formattedUser;
    }

    private formatUser(user: IUserDocument): ISavedUser {
        return {
            id: user._id.toString(),
            email: user.email,
            password: user.password,
            dateOfBirth: user.dateOfBirth,
            discount: user.discount,
            firstName: user.firstName,
            lastName: user.lastName,
        };
    }
}
