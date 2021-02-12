---
title: Uptime
description: Instructions on how to integrate an uptime sensor into Home Assistant.
ha_category:
  - Utility
  - Sensor
ha_iot_class: Local Push
ha_release: 0.56
ha_quality_scale: internal
ha_domain: uptime
ha_platforms:
  - sensor
---

The `uptime` sensor stores the timestamp (date and time) when Home Assistant was last started.

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
{% endconfiguration %}

## Example

```yaml
# Example with configuration variables
sensor:
  - platform: uptime
    name: Time Online
````
