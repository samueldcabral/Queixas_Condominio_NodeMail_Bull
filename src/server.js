require('dotenv').config();
const express = require('express');
const UserController = require('./app/controllers/UserController');
// const TestController = require('/app/controllers/TestController');
const BullBoard = require('bull-board');
const QueueEx = require('./app/lib/Queue');

const PORT = process.env.PORT || '3333'
const app = express();
BullBoard.setQueues(QueueEx.queues.map(queue => queue.bull));

app.use(express.json());
app.post('/users', UserController.store);

app.get("/test", (req, res) => {
  res.json({
    message: "It worked."
  })
})

app.use('/admin/queues', BullBoard.UI);

QueueEx.process(); 

app.listen(PORT, () => {
  console.log('Server running on localhost:' + PORT);
});