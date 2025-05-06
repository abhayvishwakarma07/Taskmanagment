import express from 'express';

const Router=express.Router();

import *as userDetails from '../controllar/Usercontollar.js';

Router.post('/save',userDetails.save);

Router.post('/login',userDetails.login);

Router.get('/fetch',userDetails.fetch);

export default Router;