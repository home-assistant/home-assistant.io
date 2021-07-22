---
title: Launch Library
description: Instructions on how to integrate space launch information within Home Assistant.
logo: rocket.png
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 0.83
ha_codeowners:
  - '@ludeeus'
ha_domain: launch_library
ha_platforms:
  - sensor
---

The `launch_library` sensor will provide you with information about the next planned space launch.

## Configuration

Add the data to your `configuration.yaml` file as shown in the example:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: launch_library
```

{% configuration %}
name:
  description: Name of the sensor.
  required: false
  type: string
{% endconfiguration %}

The data this platform presents comes from [launchlibrary.net][launchlibrary].

[launchlibrary]: https://launchlibrary.net/
