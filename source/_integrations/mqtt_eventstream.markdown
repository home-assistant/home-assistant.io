---
title: MQTT Eventstream
description: Instructions on how to setup MQTT eventstream within Home Assistant.
ha_category:
  - Other
ha_release: 0.11
ha_iot_class: Configurable
ha_domain: mqtt_eventstream
---

The `mqtt_eventstream` integration connects two Home Assistant instances via MQTT.

## Configuration

To integrate MQTT Eventstream into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
mqtt_eventstream:
  publish_topic: MyServerName
  subscribe_topic: OtherHaServerName
```

{% configuration %}
publish_topic:
  description: Topic for publishing local events.
  required: false
  type: string
subscribe_topic:
  description: Topic to receive events from the remote server.
  required: false
  type: string
ignore_event:
  description: List of [events](/docs/configuration/events/) which will not be sent over mqtt.
  required: false
  type: list
{% endconfiguration %}

## Multiple Instances

Events from multiple instances can be aggregated to a single master instance by subscribing to a wildcard topic from the master instance.

```yaml
# Example master instance configuration.yaml entry
mqtt_eventstream:
  publish_topic: master/topic
  subscribe_topic: slaves/#
  ignore_event:
    - call_service
    - state_changed
```

For a multiple instance setup, each slave would publish to their own topic.

```yaml
# Example slave instance configuration.yaml entry
mqtt_eventstream:
  publish_topic: slaves/upstairs
  subscribe_topic: master/topic
```

```yaml
# Example slave instance configuration.yaml entry
mqtt_eventstream:
  publish_topic: slaves/downstairs
  subscribe_topic: master/topic
```
