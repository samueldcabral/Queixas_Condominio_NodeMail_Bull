import 'dotenv/config';
import express from 'express';
import UserController from './app/controllers/UserController';
import TestController from './app/controllers/TestController';
import BullBoard from 'bull-board';
import Queue from './app/lib/Queue';

const app = express();
BullBoard.setQueues(Queue.queues.map(queue => queue.bull));

app.use(express.json());
app.post('/users', UserController.store);
app.post('/test', TestController.test)

app.use('/admin/queues', BullBoard.UI);

Queue.process(); 

app.listen(3333, () => {
  console.log('Server running on localhost:3333');
});