import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
    data: {
        type: String,
        required: true
    }
});

const Data = mongoose.model('Data',dataSchema);
export default Data;