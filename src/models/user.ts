import { Document, model, Schema } from "mongoose";

export interface IUser {
    email: string;
    password: string;
    discount?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    isAdmin?: boolean;
}

export interface ISavedUser extends IUser {
    id: string;
}

export interface IUserDocument extends Document, IUser {}

const userSchema = new Schema<IUserDocument>({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    discount: String,
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    isAdmin: Boolean,
});

export default model<IUserDocument>("User", userSchema);
