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
username:
  description: The username of Apache Kafka cluster for authentication.
  required: false
  type: string
password:
  description: The password of Apache Kafka cluster for authentication.
  required: false
  type: string
security_protocol:
  description: The protocol used to communicate with brokers. Use `SASL_SSL` for authentication.
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

## Configure Filter

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

Filters are applied as follows:

1. No includes or excludes - pass all entities
2. Includes, no excludes - only include specified entities
3. Excludes, no includes - only exclude specified entities
4. Both includes and excludes:
   - Include domain and/or glob patterns specified
      - If domain is included, and entity not excluded or match exclude glob pattern, pass
      - If entity matches include glob pattern, and entity does not match any exclude criteria (domain, glob pattern or listed), pass
      - If domain is not included, glob pattern does not match, and entity not included, fail
   - Exclude domain and/or glob patterns specified and include does not list domains or glob patterns
      - If domain is excluded and entity not included, fail
      - If entity matches exclude glob pattern and entity not included, fail
      - If entity does not match any exclude criteria (domain, glob pattern or listed), pass
   - Neither include or exclude specifies domains or glob patterns
      - If entity is included, pass (as #2 above)
      - If entity include and exclude, the entity exclude is ignored
