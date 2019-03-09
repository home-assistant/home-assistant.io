---
layout: page
title: "MQTT Statestream"
description: "Instructions on how to setup MQTT Statestream within Home Assistant."
date: 2017-10-01 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
ha_category: Other
ha_release: 0.54
ha_iot_class: depends
---

The `mqtt_statestream` component publishes state changes in Home Assistant to individual MQTT topics.

## {% linkable_title Configuration %}

To enable MQTT Statestream in Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
mqtt_statestream:
  base_topic: homeassistant
  publish_attributes: true
  publish_timestamps: true
```

{% configuration %}
base_topic:
  description: Base topic used to generate the actual topic used to publish.
  required: true
  type: string
publish_attributes:
  description: Publish attributes of the entity as well as the state.
  required: false
  default: false
  type: boolean
publish_timestamps:
  description: Publish the last_changed and last_updated timestamps for the entity.
  required: false
  default: false
  type: boolean
exclude:
  description: Configure which components should be excluded from recordings. See *Include/Exclude* section below for details.
  required: false
  type: list
  keys:
    entities:
      description: The list of entity ids to be excluded from recordings.
      required: false
      type: list
    domains:
      description: The list of domains to be excluded from recordings.
      required: false
      type: list
include:
  description: Configure which components should be included in recordings. If set, all other entities will not be recorded.
  required: false
  type: list
  keys:
    entities:
      description: The list of entity ids to be included from recordings.
      required: false
      type: list
    domains:
      description: The list of domains to be included from recordings.
      required: false
      type: list
{% endconfiguration %}

## {% linkable_title Operation %}

When any Home Assistant entity changes, this component will publish that change to MQTT.

The topic for each entity is different, so you can easily subscribe other systems to just the entities you are interested in.
The topic will be in the form `base_topic/domain/entity/state`.

For example, with the example configuration above, if an entity called 'light.master_bedroom_dimmer' is turned on, this component will publish `on` to `homeassistant/light/master_bedroom_dimmer/state`.

If that entity also has an attribute called `brightness`, the component will also publish the value of that attribute to `homeassistant/light/master_bedroom_dimmer/brightness`.

All states and attributes are passed through JSON serialization before publishing. **Please note** that this causes strings to be quoted (e.g., the string 'on' will be published as '"on"'). You can access the JSON deserialized values (as well as unquoted strings) at many places by using `value_json` instead of `value`.

The last_updated and last_changed values for the entity will be published to `homeassistant/light/master_bedroom_dimmer/last_updated` and `homeassistant/light/master_bedroom_dimmer/last_changed`, respectively. The timestamps are in ISO 8601 format - for example, `2017-10-01T23:20:30.920969+00:00`.

## {% linkable_title Include/exclude %}

The **exclude** and **include** configuration variables can be used to filter the items that are published to MQTT.

1\. If neither **exclude** or **include** are specified, all entities are published.

2\. If only **exclude** is specified, then all entities except the ones listed are published.

```yaml
# Example of excluding entities
mqtt_statestream:
  base_topic: homeassistant
  exclude:
    domains:
      - switch
    entities:
      - sensor.nopublish
```
In the above example, all entities except for *switch.x* and *sensor.nopublish* will be published to MQTT.

3\. If only **include** is specified, then only the specified entries are published.

```yaml
# Example of excluding entities
mqtt_statestream:
  base_topic: homeassistant
  include:
    domains:
      - sensor
    entities:
      - lock.important
```
In this example, only *sensor.x* and *lock.important* will be published.

4\. If both **include** and **exclude** are specified then all entities specified by **include** are published except for the ones
specified by **exclude**.

```yaml
# Example of excluding entities
mqtt_statestream:
  base_topic: homeassistant
  include:
    domains:
      - sensor
  exclude:
    entities:
      - sensor.noshow
```
In this example, all sensors except for *sensor.noshow* will be published.
