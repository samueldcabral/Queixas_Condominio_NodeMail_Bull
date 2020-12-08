import Queue from 'bull';
import redis from "redis";
const client = redis.createClient({url:'redis://redis-15503.c14.us-east-1-2.ec2.cloud.redislabs.com:15503', password: "im0oHZIPUwR40GjJKssptkVSFb2tXMNm"});

const redisConfig = {
  // host: client.connection_options.host,
  // port: client.connection_options.port,
  url: client.connection_options.url
}

// console.log(client)

export default {
  async test(req, res) {
    const { name, email, password } = req.body;

    const user = {
      name,
      email,
      password,
    };

    console.log(user)

    var imageQueue = new Queue('image transcoding', {
      redis: {
        host: client.connection_options.host,
        port: client.connection_options.port,
        password: "im0oHZIPUwR40GjJKssptkVSFb2tXMNm"
      }
    });

    console.log(imageQueue)

    imageQueue.process(function(job, done){
      console.log("aheuwhiuewhieuwheiwu")
      // transcode image asynchronously and report progress
      job.progress(42);

      // call done when finished
      done();

      // or give a error if error
      done(new Error('error transcoding'));

      // or pass it a result
      done(null, { width: 1280, height: 720 /* etc... */ });

      // If the job throws an unhandled exception it is also handled correctly
      throw new Error('some unexpected error');
    });
  }
}
