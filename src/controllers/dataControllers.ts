//Controller 
import express from 'express';
import Data from '../models/dataSchema';
import dataValidate from '../models/dataJoi';

export function getdata(req: express.Request, res: express.Response , next: express.NextFunction) {
    Data.find() 
    .then((data) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
        console.log(data);
        }, (err) => next(err))
    .catch((err) => next(err));
}

export function postdata(req: express.Request ,res: express.Response, next: express.NextFunction){
    let data = dataValidate.validate(req.body);
    
    if(data.error){
        res.statusCode = 400;
        res.send(data.error.details[0].message);
        return ;
    }

    Data.create(req.body)
    .then((data) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    }, (err) => next(err))
    .catch((err) => next(err));

}

export function deletedata(req: express.Request ,res: express.Response ,next: express.NextFunction) {
    Data.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));  
}

export function putdata(req: express.Request, res: express.Response ,next: express.NextFunction) {
    Data.findByIdAndUpdate(req.params.ID, {
        $set: req.body
    },{ new: true })
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => console.log(err));  
}

