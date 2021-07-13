require('dotenv').config();
const amqp = require('amqplib')

const amqpUrl = process.env.amqpUrl
console.log(amqpUrl)
const queue = "jobs"
const msg = "not important secret message"

publish();

async function publish(message) {
  try {
    const connection = await amqp.connect(amqpUrl)
    const channel = await connection.createChannel()

    // mengirim message langsung ke queue
    // 1. declare queue
    // 2. send to queue
    await channel.assertQueue(queue, {
      durable: false
    })
    await channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)))
    console.log(`Job sent successfully ${msg}`)

    setTimeout(async function () {
      await channel.close()
      await connection.close()
      process.exit(0)
    }, 500)

  } catch (error) {
    console.log(error)
  }
}