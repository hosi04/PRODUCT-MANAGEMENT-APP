FROM debezium/connect:2.6

USER root

ENV KAFKA_CONNECT_PLUGINS_DIR=/kafka/connect

RUN microdnf install -y wget unzip && microdnf clean all

# Cài Elasticsearch Sink Connector bản mới
RUN wget https://api.hub.confluent.io/api/plugins/confluentinc/kafka-connect-elasticsearch/versions/14.0.9/archive -O confluentinc-kafka-connect-elasticsearch.zip && \
    unzip confluentinc-kafka-connect-elasticsearch.zip -d /kafka/connect/ && \
    rm confluentinc-kafka-connect-elasticsearch.zip

RUN chown -R kafka:kafka /kafka/connect/

USER kafka