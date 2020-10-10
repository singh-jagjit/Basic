

import Agenda from 'agenda';
import { url_config } from '../config';
import Data from '../models/dataSchema';

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