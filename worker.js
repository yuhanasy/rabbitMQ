require('dotenv').config()
const amqp = require('amqplib')

const amqpUrl = process.env.amqpUrl
const queue = "task_queue"

consume()

function simulateProcessTime(secs) {
  if (secs % 2 === 0) {
    return secs * 1000
  } else {
    return secs * 3000
  }
}

async function consume(message) {
  try {
    const connection = await amqp.connect(amqpUrl)
    const channel = await connection.createChannel()

    await channel.assertQueue(queue, {
      durable: true // it will make sure that queue won't be lost when rabbitMQ restart
    })
    channel.prefetch(1) // This tells RabbitMQ not to give more than one message to a worker at a time.
    console.log(` [*] Waiting for message in ${queue}`)

    await channel.consume(queue, msg => {
      const secs = msg.content.toString().split('.').length - 1
      const processTime = simulateProcessTime(secs)

      console.log(` [x] Received ${msg.content.toString()}`)
      setTimeout(() => {
        console.log(` [x] Done processing ${msg.content.toString()} in ${processTime}`)
        channel.ack(msg) // manually acknowledge message
      }, processTime);
    }, {
      noAck: false // this will ensure that message will be re-queued if a consumer dies, of redilever it to other consumer
    })
  } catch (error) {
    console.log(error)
  }
}