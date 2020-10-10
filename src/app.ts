import express from 'express';
import mongoose from 'mongoose';
import dataRouter from './routes/dataRouter';
import logger from 'morgan';
import { url_config } from './config'
import Data from './models/dataSchema';

mongoose.connect(url_config.url, { useUnifiedTopology: true, useNewUrlParser: true } , (err: any) => {
    if(err) { console.log(err.message); }
    else { console.log("Successfully Connected to Database:)"); }
});

const app: express.Application = express();
app.use(logger('dev'));
app.use('/',dataRouter);



import Agenda from 'agenda';

var ct: number = 0;

const agenda = new Agenda({
    db: { address: url_config.url, collection: 'datas' },
    processEvery: '30 seconds'
});

agenda.define('updatedata',(job,done) => {
    ct +=  1;
    Data.update({ data: "testupdatetwo" },{
        $set: { data: "testeachsec"+String(ct) }
    });
    console.log("Data Updated!");
});
(async function() {
    await agenda.start();
    await agenda.schedule('in 2 minutes', 'updatedata', {to: 'admin@example.com'});
})();


app.listen(3000, () => console.log('Server runing!'));