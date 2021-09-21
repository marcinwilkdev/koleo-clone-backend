import { Document, model, Schema } from "mongoose";

interface IUser extends Document {
    email: string;
    password: string;
    discount?: boolean;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    discount: Boolean,
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
});

export default model<IUser>("User", userSchema);
