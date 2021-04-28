import express from 'express';
import controller from '../controllers/transactionController.js';

const transactionRouter = express.Router();

transactionRouter.post('/create', controller.create);
transactionRouter.get('/findAll', controller.findAll);
transactionRouter.get('/findTP', controller.findTP);
transactionRouter.get('/findOne/:id', controller.findOne);
transactionRouter.put('/update/:id', controller.update);
transactionRouter.delete('/removeOne/:id', controller.remove);
transactionRouter.delete('/removeAll', controller.removeAll);

export default transactionRouter;
