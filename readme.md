# 1. Start Kafka
docker run -d --name=kafka -p 9092:9092 apache/kafka

# 2. Check cluster ID
docker exec -it kafka /opt/kafka/bin/kafka-cluster.sh cluster-id --bootstrap-server :9092

# 3. Create topic
docker exec -it kafka /opt/kafka/bin/kafka-topics.sh --create --topic trial-events --bootstrap-server :9092

# 4. Increase partitions
docker exec -it kafka /opt/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --alter --topic trial-events --partitions 5

# 5. View messages
docker exec -it kafka /opt/kafka/bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic trial-events --from-beginning
