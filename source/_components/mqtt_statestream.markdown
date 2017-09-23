---
layout: page
title: "MQTT Statestream"
description: "Instructions how to setup MQTT Statestream within Home Assistant."
date: 2017-09-11 08:00
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
```

Configuration variables:

- **base_topic** (*Required*): Base topic used to generate the actual topic used to publish.

## Operation

When any Home Assistant entity changes, this component will publish that change to MQTT.

The topic for each entity is different, so you can easily subscribe other systems to just the entities you are interested in.
The topic will be in the form `base_topic/domain/entity/state`.

For example, with the example configuration above, if an entity called 'light.master_bedroom_dimmer' is turned on, this component will publish `on` to `homeassistant/light/master_bedroom_dimmer/state`.
