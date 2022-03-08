const amqp = require('amqplib/callback_api');
const fs = require('fs');

// Step 1: Create Connection
amqp.connect('amqp://localhost', (connError, connection) => {
    if (connError) {
        throw connError;
    }
    // Step 2: Create Channel
    connection.createChannel((channelError, channel) => {
        if (channelError) {
            throw channelError;
        }
        // Step 3: Assert Queue
        const QUEUE = 'Vikrant'
        channel.assertQueue(QUEUE);
        const data = fs.readFileSync('bhaiya.txt',(err)=>{
            if(err) throw(err)
            console.log("Read SuccessFully.....");
        })
        // Step 4: Send message to queue
        channel.sendToQueue(QUEUE, Buffer.from(data));
        console.log(`Message send ${QUEUE}`);
    })
})