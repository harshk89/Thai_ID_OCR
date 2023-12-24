import mongoose from "mongoose";

const CardSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    id_num: String,
    dob: Date,    //date of birth
    doi: Date,    //date of issue
    doe: Date,    //date of expiry
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Card = mongoose.model('Card', CardSchema);

export default Card;