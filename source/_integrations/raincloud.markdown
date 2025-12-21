---
title: Melnor RainCloud
description: Instructions on how to integrate your Melnor Raincloud sprinkler system within Home Assistant.
ha_category:
  - Binary sensor
  - Irrigation
  - Sensor
  - Switch
ha_release: 0.55
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@vanstinator'
ha_domain: raincloud
ha_platforms:
  - binary_sensor
  - sensor
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `raincloud` {% term integration %} allows you to integrate your [Melnor RainCloud](https://wifiaquatimer.com) sprinkler system in Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Binary sensor](#binary-sensor)
- [Sensor](#sensor)
- [Switch](#switch)

## Configuration

To enable it, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
raincloud:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: The username for accessing your Melnor RainCloud account.
  required: true
  type: string
password:
  description: The password for accessing your Melnor RainCloud account.
  required: true
  type: string
{% endconfiguration %}

## Binary sensor

Once you have enabled the [Raincloud integration](#configuration), add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: raincloud
```

{% configuration %}
monitored_conditions:
  description: Conditions to display in the frontend. The following conditions can be monitored.
  required: false
  type: list
  default: If not specified, all conditions below will be enabled.
  keys:
    is_watering:
      description: Return if is currently watering per zone.
    status:
      description: Return status from the Melnor RainCloud Controller and Melnor RainCloud Faucet.
{% endconfiguration %}

## Sensor

Once you have enabled the [Raincloud integration](#configuration), add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: raincloud
```

{% configuration %}
monitored_conditions:
  description: Conditions to display in the frontend. The following conditions can be monitored.
  required: false
  default: If not specified, all conditions below will be enabled.
  type: list
  keys:
    battery:
      description: Return the battery level the Melnor RainCloud faucet.
    next_cycle:
      description: Return the next schedulle watering cycle per zone.
    rain_delay:
      description: Return the number of days the automatic watering will be delayed due to raining per zone.
    watering_time:
      description: Return the watering remaining minutes per zone.
{% endconfiguration %}

## Switch

Once you have enabled the [Raincloud integration](#configuration), add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: raincloud
```

{% configuration %}
watering_minutes:
  description: "Value in minutes to watering your garden via frontend. The values allowed are: 5, 10, 15, 30, 45, 60."
  required: false
  default: 15
  type: integer
monitored_conditions:
  description: Conditions to display in the frontend. If not specified, all conditions below will be enabled by default.
  required: false
  type: list
  keys:
    auto_watering:
      description: Toggle the watering scheduled per zone.
    manual_watering:
      description: Toggle manually the watering per zone. It will inherent the value in minutes specified on the RainCloud hub integration.
{% endconfiguration %}
