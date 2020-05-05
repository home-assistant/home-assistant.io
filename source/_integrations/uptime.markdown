---
title: Uptime
description: Instructions on how to integrate an uptime sensor into Home Assistant.
ha_category:
  - Utility
ha_iot_class: Local Push
ha_release: 0.56
ha_quality_scale: internal
ha_domain: uptime
---

The `uptime` sensor platform displays the time since the last Home Assistant restart.

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: uptime
```

{% configuration %}
name:
  description: Name to use in the frontend.
  required: false
  type: string
  default: Uptime
unit_of_measurement:
  description: "Units for uptime measurement in either `days`, `hours` or `minutes`."
  required: false
  type: string
  default: days
{% endconfiguration %}

## Example

```yaml
# Example with configuration variables
sensor:
  - platform: uptime
    name: Time Online
    unit_of_measurement: hours
````
