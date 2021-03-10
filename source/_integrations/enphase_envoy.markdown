---
title: Enphase Envoy
description: Instructions on how to setup Enphase Envoy with Home Assistant.
ha_category:
  - Energy
ha_release: 0.76
ha_iot_class: Local Polling
ha_domain: enphase_envoy
ha_codeowners:
  - '@gtdiehl'
ha_platforms:
  - sensor
---

A sensor platform for the [Enphase Envoy](https://enphase.com/en-us/products-and-services/envoy-and-combiner) solar energy gateway. Works with older models that only have production metrics (ie. Envoy-C) and newer models that offer both production and consumption metrics (ie. Envoy-S).

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: enphase_envoy
```

{% configuration %}
name:
  required: false
  type: string
  description: An optional name that will be prepended to the sensor type
ip_address:
  description: The local IP address of your Envoy. Leave blank to use the default host name 'envoy', but this may not always be reliable. You should be able to just browse to this IP address.
  required: false
  type: string
username:
  description: Access more information beyond the basics, such as Inverter data.  Some Envoy devices do not use the standard username which is used by the API.  This lets the user use a different username than the default of 'envoy'.
  required: false
  type: string
password:
  description: Password to be used with the username configuration variable.
  required: false
  type: string
monitored_conditions:
  description: The list of conditions to monitor. If you have an Envoy that doesn't support consumption metrics (ie. Envoy-C), it's best only configure the production metrics.
  required: false
  type: list
  keys:
    production:
      description: The power in W being produced by the solar panels.
    daily_production:
      description: The energy in Wh produced that day.
    seven_days_production:
      description: The energy in Wh produced the last 7 days.
    lifetime_production:
      description: The energy in Wh produced in the lifetime of the Envoy.
    consumption:
      description: The power in W being consumed in the whole house.
    daily_consumption:
      description: The energy in Wh consumed that day.
    seven_days_consumption:
      description: The energy in Wh consumed the last 7 days.
    lifetime_consumption:
      description: The energy in Wh consumed in the lifetime of the Envoy.
    inverters:
      description: The power in W being produced by each micro-inverter. This will create a separate sensor for each micro-inverter you have installed. These sensors will only update about every 15 minutes, this is a limitation of the Enphase Envoy API.
{% endconfiguration %}

### Full example

```yaml
# Example configuration.yaml entry, limiting the metrics to production only
sensor:
  - platform: enphase_envoy
    name: Optional_name
    ip_address: LOCAL_IP_FOR_ENVOY
    monitored_conditions:
      - production
      - daily_production
      - seven_days_production
      - lifetime_production
```
