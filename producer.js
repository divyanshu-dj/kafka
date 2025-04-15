const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-producer',
  brokers: ['localhost:9092'],
})

const producer = kafka.producer()

const runProducer = async() => {
    await producer.connect()
    for ( let i = 1; i <= 10; i++) {
        await producer.send({
            topic: 'trial-events',
            keys: `key-${i}`,
            messages: [
            { value: `Hello KafkaJS user! ${i}` },
            ],
        })
    }
    
    await producer.disconnect()
}

runProducer().catch(console.error)
