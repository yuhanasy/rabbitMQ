require('dotenv').config();
const amqp = require('amqplib')

const amqpUrl = process.env.amqpUrl
console.log(amqpUrl)
const queue = "task_queue"
const msg = process.argv.slice(2).join(' ') || "not important secret message"

publish();

async function publish(message) {
  try {
    const connection = await amqp.connect(amqpUrl)
    const channel = await connection.createChannel()

    await channel.assertQueue(queue, {
      durable: true // it will make sure that queue won't be lost when rabbitMQ restart
    })
    await channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)), {
      persistent: true // this will stored in memory
    })
    console.log(` [x] Sent ${msg}`)

    setTimeout(async function () {
      await channel.close()
      await connection.close()
      process.exit(0)
    }, 500)

  } catch (error) {
    console.log(error)
  }
}