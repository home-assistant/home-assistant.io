---
title: Emoncms
description: Instructions on how to integrate Emoncms feeds as sensors into Home Assistant.
ha_category:
  - Sensor
ha_release: 0.29
ha_iot_class: Local Polling
ha_domain: emoncms
ha_codeowners:
  - '@borpin'
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `emoncms` sensor platform creates sensors for the feeds available in your local or cloud based version of [Emoncms](https://emoncms.org).

To enable this sensor, add the following lines to your `configuration.yaml`, it will list all feeds as a sensor:

```yaml
# Example configuration.yaml entry using cloud based Emoncms
sensor:
  platform: emoncms
  api_key: API_KEY
  url: https://emoncms.org
  id: 1
```

As of Feb 2020, the integration will discover all sensors from Emoncms and will use the unit of measurement specified in the Feed from Emoncms, in preference to the one set in the configuration. Tested with [Emoncms](https://github.com/emoncms/emoncms) V10.1.13 - `unit` was added to the API around version V9.9.1.

## Configuration variables

{% configuration %}
api_key:
  description: The read API key for your Emoncms user.
  required: true
  type: string
url:
  description: "The base URL of Emoncms, use <https://emoncms.org> for the cloud-based version. For self-hosted Emoncms or EmonPi you may need a URL of `http://x.x.x.x/emoncms`."
  required: true
  type: string
id:
  description: Positive integer identifier for the sensor. Must be unique if you specify multiple Emoncms sensors.
  required: true
  type: integer
include_only_feed_id:
  description: Positive integer list of Emoncms feed IDs. Only the feeds with feed IDs specified here will be displayed. Can not be specified if `exclude_feed_id` is specified.
  required: false
  type: list
exclude_feed_id:
  description: Positive integer list of Emoncms feed IDs. All the feeds will be displayed as sensors except the ones listed here. Can not be specified if `include_only_feed_id` is specified.
  required: false
  type: list
sensor_names:
  description: "Dictionary of names for the sensors created that are created based on feed ID. The dictionary consists of `feedid: name` pairs. Sensors for feeds with their feed ID mentioned here will get the chosen name instead of the default name."
  required: false
  type: [integer, list]
value_template:
  description: Defines a [template](/docs/configuration/templating/#processing-incoming-data) to alter the feed value.
  required: false
  type: template
scan_interval:
  description: Defines the update interval of the sensor in seconds.
  required: false
  type: integer
unit_of_measurement:
  description: Defines the unit of measurement to be used for any sensor where the unit is *not* set in Emoncms. If no unit is set in Emoncms or in the configuration, the default (W) will be used.
  required: false
  default: W
  type: string
{% endconfiguration %}

## Default naming scheme

The names of the sensors created by this integration will use the feed names defined in Emoncms if available,
or the feed ID otherwise, and will be prefixed with "Emoncms", e.g., "Emoncms Total Power" or "Emoncms Feed 5".
If the `id` property is anything but `1`, the ID will be shown as well, e.g., "Emoncms 2 Feed 5".

If `sensor_names` is used, any feeds with defined names will get those names exactly, with no prefix.

### Examples

In this section you find some more examples of how this sensor can be used.

Minimal configuration. All Feeds are added as sensors with the unit of measurement being set by the Emoncms Feed or the default unit.

```yaml
sensor:
  - platform: emoncms
    api_key: API_KEY
    url: https://emoncms.org
    id: 1
```

Display only feeds with their feed IDs specified in `include_only_feed_id`.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: emoncms
    api_key: API_KEY
    url: https://emoncms.org
    id: 1
    unit_of_measurement: "W"
    include_only_feed_id:
      - 107
      - 105
```

Display all feeds except feeds with their feed id specified in `exclude_feed_id`.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: emoncms
    api_key: API_KEY
    url: https://emoncms.org
    id: 1
    unit_of_measurement: "kWh"
    exclude_feed_id:
      - 107
      - 105
```

Display only feeds with their feed id's specified in `include_only_feed_id` and give the feed sensors a name using "sensor_names". You don't have to specify all feeds names in "sensor_names", the remaining sensor names will be chosen based on "id" and the Emoncms `feedid`.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: emoncms
    api_key: API_KEY
    url: https://emoncms.org
    id: 1
    unit_of_measurement: "kW"
    include_only_feed_id:
      - 5
      - 120
    sensor_names:
      5: "feed 1"
      48: "kWh feed"
      61: "amp feed"
      110: "watt feed"
```

Use a `value_template` to add 1500 to the feed value for all specified feed IDs in `include_feed_id`.

{% raw %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: emoncms
    api_key: API_KEY
    url: https://emoncms.org
    scan_interval: 15
    id: 1
    value_template: "{{ value | float + 1500 }}"
    include_only_feed_id:
      - 107
      - 106
```

{% endraw %}

Display feeds from the same Emoncms instance with 2 groups of feeds, different `scan_interval` and a different `unit_of_measurement`.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: emoncms
    api_key: API_KEY
    url: https://emoncms.org
    scan_interval: 30
    id: 1
    unit_of_measurement: "W"
    include_only_feed_id:
      - 107
      - 106
  - platform: emoncms
    api_key:  API_KEY
    url: https://emoncms.org
    id: 2
    scan_interval: 60
    unit_of_measurement: "A"
    include_only_feed_id:
      - 108
      - 61
```
