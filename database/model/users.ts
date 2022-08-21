import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false,
    },
    watchlist: {
        type: Array,
        required: false,
    }
});

mongoose.model("Users", usersSchema);

export default usersSchema;
