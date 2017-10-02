---
layout: page
title: "MQTT Statestream"
description: "Instructions how to setup MQTT Statestream within Home Assistant."
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

To enable MQTT Statestream in Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
mqtt_statestream:
  base_topic: homeassistant
  publish_attributes: true
  publish_timestamps: true
```

Configuration variables:

- **base_topic** (*Required*): Base topic used to generate the actual topic used to publish.
- **publish_attributes** (*Optional*): Publish attributes of the entity as well as the state.
Default is false.
- **publish_timestamps** (*Optional*): Publish the last_changed and last_updated timestamps for the entity.
Default is false.

## Operation

When any Home Assistant entity changes, this component will publish that change to MQTT.

The topic for each entity is different, so you can easily subscribe other systems to just the entities you are interested in.
The topic will be in the form `base_topic/domain/entity/state`.

For example, with the example configuration above, if an entity called 'light.master_bedroom_dimmer' is turned on, this component will publish `on` to `homeassistant/light/master_bedroom_dimmer/state`.  

If that entity also has an attribute called `brightness`, the component will also publish the value of that attribute to `homeassistant/light/master_bedroom_dimmer/brightness`.  

The last_updated and last_changed values for the entity will be published to `homeassistant/light/master_bedroom_dimmer/last_updated` and `homeassistant/light/master_bedroom_dimmer/last_changed`, respectively.  The timestamps are in ISO 8601 format - for example, `2017-10-01T23:20:30.920969+00:00`.
