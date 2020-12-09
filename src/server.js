require('dotenv').config();
const express = require('express');
const MailController = require('./app/controllers/MailController');
const BullBoard = require('bull-board');
const QueueEx = require('./app/lib/Queue');
const cors = require("cors");
const PORT = process.env.PORT || '3333'
const app = express();

BullBoard.setQueues(QueueEx.queues.map(queue => queue.bull));

app.use(cors());
app.use(express.json());
app.post('/mail', MailController.store);

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