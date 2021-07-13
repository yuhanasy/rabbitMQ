# I am Learning RabbitMQ

In this project, I am following official RabbitMQ [tutorials](https://www.rabbitmq.com/getstarted.html) to understand how rabbitMQ works.

Instead of installing rabbitMQ locally on my machine, I use cloud rabbitMQ with [cloudamqp](https://customer.cloudamqp.com/instance/). We can signup for free account and free plan, and then create an instance. The process is easy.

From my rabbitMQ instances console, I copy the amqp url. This url is like my rabbitMQ server url. From the tutorial, replace the `amqp://localhost` with that url. We can open rabbitMQ manager by clicking the button on the right of our instance.

To get a better understanding, I keep switching between my terminal and rabbitMQ manager, and watching what happened under the hood.

### simple message
in terminal 1
```
node consumer.js
```

in terminal 2
```
node publisher.js
```

it doesnt matter whether we run publisher or consumer first, because in we declare the same queue in both to make sure we have at least a queue. It prevents error.

### task queue
in terminal 1
```
node worker.js
```

in terminal 2
```
node worker.js
```

in terminal 3
```
node new_task.js First message.
node new_task.js Second message..
node new_task.js Third message...
node new_task.js Fourth message....
node new_task.js Fifth message.....
```

this simulates how round-robin dispatching works. RabbitMQ distributes messages to next messages, in sequence.