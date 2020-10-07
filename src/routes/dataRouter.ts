import express from 'express';
import bodyParser from 'body-parser';

import Data from '../models/dataSchema';

var dataRouter = express.Router();
dataRouter.use(bodyParser.json());

dataRouter.route('/')
.get((req, res: express.Response , next) => {
    Data.find() 
    .then((data) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
        console.log(data);
        }, (err) => next(err))
    .catch((err) => next(err));
})  
.post((req: express.Request ,res: express.Response, next)=>{
    Data.create(req.body)
    .then((data) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.delete((req,res: express.Response ,next) => {
    Data.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));  
})

dataRouter.route('/:ID')
.put((req: express.Request,res: express.Response ,next)=> {
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

export default dataRouter;