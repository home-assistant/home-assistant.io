---
title: MQTT Eventstream
description: Instructions on how to setup MQTT eventstream within Home Assistant.
ha_category:
  - Other
ha_release: 0.11
ha_iot_class: Local Polling
ha_domain: mqtt_eventstream
ha_integration_type: integration
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

Events from multiple instances can be aggregated to a single parent instance by subscribing to a wildcard topic from the parent instance.

```yaml
# Example parent instance configuration.yaml entry
mqtt_eventstream:
  publish_topic: parent/topic
  subscribe_topic: child/#
  ignore_event:
    - call_service
    - state_changed
```

For a multiple instance setup, each child instance would publish to their own topic.

```yaml
# Example child instance configuration.yaml entry
mqtt_eventstream:
  publish_topic: child/upstairs
  subscribe_topic: parent/topic
```

```yaml
# Example child instance configuration.yaml entry
mqtt_eventstream:
  publish_topic: child/downstairs
  subscribe_topic: parent/topic
```
