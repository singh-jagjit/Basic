import express from 'express';
import bodyParser from 'body-parser';

import { getdata, postdata, deletedata, putdata } from '../controllers/dataControllers';

var dataRouter = express.Router();
dataRouter.use(bodyParser.json());

dataRouter.route('/')
.get(getdata)  
.post(postdata)
.delete(deletedata)

dataRouter.route('/:ID')
.put(putdata);

export default dataRouter;