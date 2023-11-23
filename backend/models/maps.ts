import mongoose, {Schema, Document} from "mongoose";

export interface Imap extends Document {
    lat: Number,
    lng: Number
}

const mapSchema: Schema = new Schema({
    lat: {type: Number, required: true},
    lng: {type: Number, required: true}
})

export default mongoose.model<Imap>("Map", mapSchema)