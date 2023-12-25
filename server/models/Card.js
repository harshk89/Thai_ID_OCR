import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    id_num: String,
    dob: String,    //date of birth
    doi: String,    //date of issue
    doe: String,    //date of expiry
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Card = mongoose.model('Card', cardSchema);

export default Card;