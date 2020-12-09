const Queue = require('bull') ;
const jobs = require('../jobs/RegistrationMail');
const redis = require('redis');

// import Queue from 'bull';
// import * as jobs from '../jobs';
// import redis from "redis";


const client = redis.createClient({url:'redis://redis-15503.c14.us-east-1-2.ec2.cloud.redislabs.com:15503', password: "im0oHZIPUwR40GjJKssptkVSFb2tXMNm"});


// const queues = Object.values(jobs).map(job => ({
//   bull: new Queue(job.key, {
//     redis: {
//       host: client.connection_options.host,
//       port: client.connection_options.port,
//       password: "im0oHZIPUwR40GjJKssptkVSFb2tXMNm"
//     }
//   }),
//   name: job.key,
//   handle: job.handle,

// }))

const queues = [
  {
    bull: new Queue(jobs.key, {
      redis: {
        host: client.connection_options.host,
        port: client.connection_options.port,
        password: "im0oHZIPUwR40GjJKssptkVSFb2tXMNm"
      }
    }),
    name: jobs.key,
    handle: jobs.handle
  }
]
console.log("LALALA")
console.log(queues)

const QueueEx =  {
  queues,
  add(name, data) {
    const queue = this.queues.find(queue => queue.name === name);
    return queue.bull.add(data, queue.options);
  },
  process() {
    return this.queues.forEach(queue => {

      console.log("samuelf")
      console.log(queue)
      
      queue.bull.process(queue.handle);


      queue.bull.on('failed', (job, err) => {
     
        console.log('Job failed', queue.key, job.data);
        console.log(err);
      });
    })
  }
};

module.exports = QueueEx;