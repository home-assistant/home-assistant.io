---
title: Duke Energy
description: Instructions on how to set Duke Energy smart meter sensors within Home Assistant.
logo: duke_energy.png
ha_category:
  - Energy
ha_release: 0.74
ha_iot_class: Cloud Polling
---

The `duke_energy` sensor platform allows you get the previous days usage for all of your Duke Energy smart meters.

## Setup

You will only have access to meters listed in your account at [Duke Energy Usage](https://www.duke-energy.com/my-account/usage-analysis).

This supports both electric and gas meters. Along with previous days usage, each sensor will have attributes for the previous bills total usage and average usage.

## Configuration

To enable the sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: duke_energy
    username: YOUR_DUKE_USERNAME
    password: YOUR_DUKE_PASSWORD
```

{% configuration %}
username:
  description: Your Duke Energy username
  required: true
  type: string
password:
  description: Your Duke Energy password
  required: true
  type: string
{% endconfiguration %}

<div class='note'>
Meter usage isn't updated until mid-morning. Prior to updating your meter will report 0 for usage starting at midnight. The API is only called to update every 2 hours from startup time.
</div>
