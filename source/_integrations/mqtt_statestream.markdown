---
title: MQTT Statestream
description: Instructions on how to setup MQTT Statestream within Home Assistant.
ha_category:
  - Other
ha_release: 0.54
ha_iot_class: Configurable
ha_domain: mqtt_statestream
---

The `mqtt_statestream` integration publishes state changes in Home Assistant to individual MQTT topics.

## Configuration

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
  description: Configure which integrations should be excluded from recordings. ([Configure Filter](#configure-filter))
  required: false
  type: list
  keys:
    entities:
      description: The list of entity ids to be excluded from recordings.
      required: false
      type: list
    entity_globs:
      description: Exclude all entities matching a listed pattern from recordings (e.g., `sensor.weather_*`).
      required: false
      type: list
    domains:
      description: The list of domains to be excluded from recordings.
      required: false
      type: list
include:
  description: Configure which integrations should be included in recordings. If set, all other entities will not be recorded. ([Configure Filter](#configure-filter))
  required: false
  type: list
  keys:
    entities:
      description: The list of entity ids to be included from recordings.
      required: false
      type: list
    entity_globs:
      description: Include all entities matching a listed pattern in recordings (e.g., `sensor.weather_*`).
      required: false
      type: list
    domains:
      description: The list of domains to be included from recordings.
      required: false
      type: list
{% endconfiguration %}

### Configure Filter

By default, no entity will be excluded. To limit which entities are being exposed to `MQTT Statestream`, you can use the `include` and `exclude` parameters.

```yaml
# Example filter to include specified domains and exclude specified entities
mqtt_statestream:
  base_topic: homeassistant
  include:
    domains:
      - alarm_control_panel
      - light
    entity_globs:
      - binary_sensor.*_occupancy
  exclude:
    entities:
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

### Common filtering examples

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

## Operation

When any Home Assistant entity changes, this integration will publish that change to MQTT.

The topic for each entity is different, so you can easily subscribe other systems to just the entities you are interested in.
The topic will be in the form `base_topic/domain/entity/state`.

For example, with the example configuration above, if an entity called 'light.master_bedroom_dimmer' is turned on, this integration will publish `on` to `homeassistant/light/master_bedroom_dimmer/state`.

If that entity also has an attribute called `brightness`, the integration will also publish the value of that attribute to `homeassistant/light/master_bedroom_dimmer/brightness`.

All states and attributes are passed through JSON serialization before publishing. **Please note** that this causes strings to be quoted (e.g., the string 'on' will be published as '"on"'). You can access the JSON deserialized values (as well as unquoted strings) at many places by using `value_json` instead of `value`.

The last_updated and last_changed values for the entity will be published to `homeassistant/light/master_bedroom_dimmer/last_updated` and `homeassistant/light/master_bedroom_dimmer/last_changed`, respectively. The timestamps are in ISO 8601 format - for example, `2017-10-01T23:20:30.920969+00:00`.
