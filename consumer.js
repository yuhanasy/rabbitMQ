require('dotenv').config()
const amqp = require('amqplib')

const amqpUrl = process.env.amqpUrl
const queue = "jobs"

consume()

async function consume(message) {
  try {
    const connection = await amqp.connect(amqpUrl)
    const channel = await connection.createChannel()

    // mendapatkan message dari queue
    // 1. declare queue
    // 2. consume dari queue, kasih callback untuk mengolah message
    // 3. tanpa mengirim ack
    await channel.assertQueue(queue, {
      durable: false
    })
    console.log(` [*] Waiting for message in ${queue}`)

    await channel.consume(queue, msg => {
      console.log(` [x] Received ${msg.content.toString()}`)
    }, {
      noAck: true
    })
  } catch (error) {
    console.log(error)
  }
}