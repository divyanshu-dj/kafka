const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-consumer',
  brokers: ['localhost:9092'],
});

const createConsumer = async (id) => {
  const consumer = kafka.consumer({ groupId: 'test-group-1' });
  await consumer.connect();
  await consumer.subscribe({ topic: 'trial-events', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`[Consumer-1 ${id}]`, {
        partition,
        value: message.value.toString(),
      });
    },
  });
};

const createConsumerDiff = async (id) => {

    const consumer = kafka.consumer({ groupId: 'test-group-2' });
    await consumer.connect();
    await consumer.subscribe({ topic: 'trial-events', fromBeginning: true });
  
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(`[Consumer-2 ${id}]`, {
          partition,
          value: message.value.toString(),
        });
      },
    });
  };

// Start 3 consumers in the same group
for (let i = 1; i <= 5; i++) {
  createConsumer(i).catch(console.error);
}
// Start 3 consumers in different groups
for (let i = 1; i <= 3; i++) {
    createConsumerDiff(i).catch(console.error);
}
