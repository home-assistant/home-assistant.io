---
title: Apache Kafka
description: Send data and events to Apache Kafka.
ha_category:
  - History
ha_release: 0.97
ha_codeowners:
  - '@bachya'
ha_domain: apache_kafka
ha_iot_class: Local Push
ha_integration_type: integration
ha_quality_scale: legacy
---

The **Apache Kafka** {% term integration %} sends all state changes to a
[Apache Kafka](https://kafka.apache.org/) topic.

Apache Kafka is a real-time data pipeline that can read and write streams of data. It
stores its data safely in a distributed, replicated, fault-tolerant cluster.

To use the **Apache Kafka** {% term integration %} in your installation, add the following to your
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
username:
  description: The username of Apache Kafka cluster for SASL authentication. Required with `SASL_SSL` security protocol only.
  required: false
  type: string
password:
  description: The password of Apache Kafka cluster for SASL authentication. Required with `SASL_SSL` security protocol only.
  required: false
  type: string
security_protocol:
  description: The security protocol used to communicate with brokers. Use `SSL` for secure or `SASL_SSL` for secure with SASL authentication. (only `SASL_PLAINTEXT` SASL mechanism is supported)
  required: false
  default: PLAINTEXT
  type: string
topic:
  description: The Kafka topic to send data to.
  required: true
  type: string
filter:
  description: Filters for entities to be included/excluded. ([Configure Filter](#configure-filter))
  required: false
  type: map
  keys:
    include_domains:
      description: Domains to be included.
      required: false
      type: list
    include_entity_globs:
      description: Include all entities matching a listed pattern.
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
    exclude_entity_globs:
      description: Exclude all entities matching a listed pattern.
      required: false
      type: list
    exclude_entities:
      description: Entities to be excluded.
      required: false
      type: list
{% endconfiguration %}

## Configure filter

By default, no entity will be excluded. To limit which entities are being exposed to `Apache Kafka`, you can use the `filter` parameter.

```yaml
# Example filter to include specified domains and exclude specified entities
apache_kafka:
  ip_address: localhost
  port: 9092
  topic: home_assistant_1
  filter:
    include_domains:
      - alarm_control_panel
      - light
    include_entity_globs:
      - binary_sensor.*_occupancy
    exclude_entities:
      - light.kitchen_light
```

{% include common-tasks/filters.md %}
