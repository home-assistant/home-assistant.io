---
title: OhmConnect
description: Documentation about the OhmConnect sensor.
ha_category:
  - Energy
ha_iot_class: Cloud Polling
ha_release: 0.26
ha_codeowners:
  - '@robbiet480'
ha_domain: ohmconnect
ha_platforms:
  - sensor
---

The `ohmconnect` sensor will show you the current [OhmConnect](https://www.ohmconnect.com/) status for the given OhmConnect ID.

OhmConnect monitors real-time conditions on the electricity grid. When dirty and unsustainable power plants turn on, our users receive a notification to save energy. By saving energy at that time, California does not have to turn on additional power plants and California's energy authorities pay you for that.

## Configuration

You can find your OhmConnect ID under "Open Source Projects" on the [settings page](https://login.ohmconnect.com/settings). It's the string after the last `/` in the URL, e.g., for the URL `https://login.ohmconnect.com/verify-ohm-hour/AbCd1e` your ID is `AbCd1e`.

To enable the OhMConnect sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: ohmconnect
    id: YOUR_OHMCONNECT_ID
```

{% configuration %}
id:
  description: Your OhmConnect ID.
  required: true
  type: string
name:
  description: A name to display on the sensor.
  required: false
  default: OhmConnect Status
  type: string
{% endconfiguration %}
