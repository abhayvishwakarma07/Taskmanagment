import express from 'express';

const todoRouter=express.Router();

import *as todocantollar from '../controllar/todocantollar.js';

todoRouter.post('/save',todocantollar.save);

todoRouter.get('/fetch',todocantollar.fetch);

todoRouter.post('/delete',todocantollar.deletetodo);

export default todoRouter;