---
title: SleepIQ
description: Instructions for how to integrate SleepIQ beds within Home Assistant.
ha_category:
  - Health
  - Sensor
  - Binary Sensor
ha_release: 0.29
ha_iot_class: Cloud Polling
ha_domain: sleepiq
ha_platforms:
  - binary_sensor
  - sensor
---

The SleepIQ integration lets you view sensor data from [SleepIQ by SleepNumber](https://www.sleepnumber.com/sleepiq-sleep-tracker). In particular, it lets you see the occupancy and current SleepNumber (ie current firmness) of each side of a SleepNumber bed.

You will need an account on [SleepIQ](https://sleepiq.sleepnumber.com/) to use this integration.

{% include integrations/config_flow.md %}

## Manual Configuration

If you prefer to set up the integration in `configuration.yaml`, add your username and password as follows:

```yaml
# Example configuration.yaml entry
sleepiq:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
  scan_interval: 60
```

{% configuration %}
username:
  description: Your SleepIQ username (usually an e-mail address).
  required: true
  type: string
password:
  description: Your SleepIQ password.
  required: true
  type: string
scan_interval:
  description: Frequency to update sensor data.
  required: false
  type: integer
{% endconfiguration %}
