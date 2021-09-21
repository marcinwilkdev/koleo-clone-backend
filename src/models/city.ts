import { Document, model, Schema } from "mongoose";

interface ICity extends Document {
    name: string;
}

const citySchema = new Schema<ICity>({
    name: {
        type: Schema.Types.String,
        required: true,
    },
});

export default model<ICity>("City", citySchema);
