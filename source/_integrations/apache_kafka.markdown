---
title: Apache Kafka
description: Send data and events to Apache Kafka.
ha_category:
  - History
ha_release: 0.97
ha_codeowners:
  - '@bachya'
ha_domain: apache_kafka
---

The `apache_kafka` integration sends all state changes to a
[Apache Kafka](https://kafka.apache.org/) topic.

Apache Kafka is a real-time data pipeline that can read and write streams of data. It
stores its data safely in a distributed, replicated, fault-tolerant cluster.

To use the `apache_kafka` integration in your installation, add the following to your
`configuration.yaml` file:

```yaml
apache_kafka:
  ip_address: localhost
  port: 9092
  topic: home_assistant_1
```

{% configuration %}
ip_address:
  description: The IP address or hostname of an Apache Kafka cluster.
  required: true
  type: string
port:
  description: The port to use.
  required: true
  type: integer
topic:
  description: The Kafka topic to send data to.
  required: true
  type: string
filter:
  description: Filters for entities to be included/excluded.
  required: false
  type: map
  keys:
    include_domains:
      description: Domains to be included.
      required: false
      type: list
    include_entities:
      description: Entities to be included.
      required: false
      type: list
    exclude_domains:
      description: Domains to be excluded.
      required: false
      type: list
    exclude_entities:
      description: Entities to be excluded.
      required: false
      type: list
{% endconfiguration %}
