import express from 'express';
import mongoose from 'mongoose';
import dataRouter from './routes/dataRouter';

const url = 'mongodb+srv://Jaggu:Jaggu@cluster0.7ugka.mongodb.net/Access?retryWrites=true&w=majority';

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true } , (err: any) => {
    if(err) { console.log(err.message); }
    else { console.log("Successfully Connected to Database:)"); }
});

const app: express.Application = express();
app.use('/',dataRouter);

app.listen(3000, () => console.log('Server runing!'));