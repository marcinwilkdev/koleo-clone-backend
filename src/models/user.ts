import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
    email: string;
    password: string;
    discount?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    tickets: Schema.Types.ObjectId[];
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
    discount: String,
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    tickets: [
        {
            type: Schema.Types.ObjectId,
            required: true,
        },
    ],
});

export default model<IUser>("User", userSchema);
