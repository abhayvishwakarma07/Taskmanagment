import express from 'express';

const EmployeeRouter=express.Router();

import *as EmployeeControllar from '../controllar/EmpoloyeControllar.js';

EmployeeRouter.post('/save',EmployeeControllar.save);

EmployeeRouter.get('/fetch',EmployeeControllar.fetch);

EmployeeRouter.patch('/edit',EmployeeControllar.edit);

EmployeeRouter.delete('/delete',EmployeeControllar.deleteemp);



export default EmployeeRouter;