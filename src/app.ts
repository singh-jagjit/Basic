import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import Data from './dataSchema';

const url = 'mongodb+srv://Jaggu:Jaggu@cluster0.7ugka.mongodb.net/Access?retryWrites=true&w=majority';

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true } , (err: any) => {
    if(err) {
        console.log(err.message);
    }
    else {
        console.log("Success");
    }

})

const app: express.Application = express();
app.use(bodyParser.json())

app.get('/',(req: express.Request ,res: express.Response) => {
    res.send('Hello!');
    res.statusCode = 200;
});

app.get('/get', (req, res: express.Response , next) => {
    Data.find() 
    .then((datas) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(datas);
        console.log(datas);
        }, (err) => next(err))
    .catch((err) => next(err));
  });
  
app.post('/add', (req ,res)=>{
    var userData = req.body;
    console.log("\n\n\n"+userData+"\n\n\n");
    var data = new Data(userData);
    data.save((err , sendData) =>{
    if(err){
        console.log(err);
    }
    else{
        res.status(200).send(sendData);
    }
    })
});

app.put('/update/:ID',(req,res,next)=> {
    Data.findByIdAndUpdate(req.params.ID, {
        $set: req.body
    },{ new: true })
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => console.log(err));  
})

app.delete('/del', (req,res,next) => {
    Data.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => console.log(err));  

})

app.listen(3000, () => console.log('Server runing!'));