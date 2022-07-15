import express from 'express';
const api = express.Router();
import v1Route from './v1/init';

api.use('/v1', v1Route);

export default api;
