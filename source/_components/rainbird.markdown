---
title: "Rain Bird"
description: "Instructions on how to integrate your Rain Bird LNK WiFi Module within Home Assistant."
logo: rainbird.png
ha_category:
  - Irrigation
  - Sensor
  - Switch
ha_release: 0.61
ha_iot_class: Local Polling
redirect_from:
  - /components/sensor.rainbird/
  - /components/switch.rainbird/
---

This `rainbird` integration allows interacting with [LNK WiFi](http://www.rainbird.com/landscape/products/controllers/LNK-WiFi.htm) module of the Rain Bird Irrigation system in Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Sensor](#sensor)
- [Switch](#switch)

## Configuration

To enable it, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
rainbird:
  host: IP_ADDRESS_OF_MODULE
  password: YOUR_PASSWORD
```

{% configuration %}
host:
  description: IP Address of the Module
  required: true
  type: string
password:
  description: The password for accessing the module.
  required: true
  type: string
{% endconfiguration %}

<div class='note'>
Please note that due to the implementation of the API within the LNK Module, there is a concurrency issue. For example, the Rain Bird app will give connection issues (like already a connection active).
</div>

## Sensor

This `rainbird` sensor allows interacting with [LNK WiFi](http://www.rainbird.com/landscape/products/controllers/LNK-WiFi.htm) module of the Rain Bird Irrigation system in Home Assistant.

Add the following to your `configuration.yaml` file to enable the rain sensor:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rainbird
    monitored_conditions:
      - rainsensor
```

{% configuration %}
monitored_conditions:
  description: Conditions to be monitored.
  type: list
  keys:
    rainsensor:
      description: Returns the sensor level.
{% endconfiguration %}

## Switch

This `rainbird` switch platform allows interacting with [LNK WiFi](http://www.rainbird.com/landscape/products/controllers/LNK-WiFi.htm) module of the Rain Bird Irrigation system in Home Assistant.

Add the following to your `configuration.yaml` file to use the switch platform:

```yaml
switch:
  - platform: rainbird
    switches:
      sprinkler_1:
        zone: 1
        friendly_name: "Front sprinklers"
        trigger_time: 10
        scan_interval: 10
      sprinkler_2:
        friendly_name: "Back sprinklers"
        zone: 2
        trigger_time: 20
        scan_interval: 10
```

{% configuration %}
zone:
  description: Station zone identifier.
  required: true
  type: string
friendly_name:
  description: Just a friendly name for the station.
  required: false
  type: string
trigger_time:
  description: The default duration to sprinkle the zone in minutes.
  required: true
  type: integer
scan_interval:
  description: How fast to refresh the switch in minutes.
  required: false
  type: integer
{% endconfiguration %}
