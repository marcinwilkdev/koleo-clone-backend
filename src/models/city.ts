import { Document, model, Schema } from "mongoose";

export interface ICity {
    name: string;
}

export interface ISavedCity extends ICity {
    id: string;
}

export interface ICityDocument extends Document, ICity {}

const citySchema = new Schema<ICityDocument>({
    name: {
        type: Schema.Types.String,
        required: true,
    },
});

export default model<ICityDocument>("City", citySchema);
