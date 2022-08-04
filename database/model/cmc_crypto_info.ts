
import mongoose from 'mongoose';

const cmc_crypto_infoSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true,
    },
});

mongoose.model("cmc_crypto_info", cmc_crypto_infoSchema);

export default cmc_crypto_infoSchema;

