---
title: Nexia
description: Instructions on how to integrate Nexia Thermostats (Trane/American Standard) into Home Assistant.
ha_category:
  - Binary Sensor
  - Sensor
  - Climate
ha_release: 0.108
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bdraco'
  - '@ryannazaretian'
ha_domain: nexia
---

The `nexia` integration allows you to integrate your [Nexia](https://mynexia.com/) thermostats into Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](#binary-sensor)
- [Climate](#climate)
- [Sensor](#sensor)

## Configuration

You will need your mynexia.com username and password to use this module.

To add `Nexia` to your installation, go to **Configuration** >> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **Nexia**.

Alternatively, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
nexia:
  username: YOUR_NEXIA_USERNAME
  password: YOUR_NEXIA_PASSWORD
```

{% configuration %}
username:
  description: The username for accessing your Nexia account.
  required: true
  type: string
password:
  description: The password for accessing your Nexia account.
  required: true
  type: string
{% endconfiguration %}

### Binary Sensor

The following binary sensors are added for each thermostat:

- Blower Active

### Sensor

The following binary sensors are added for each thermostat:

- Air Cleaner Mode
- Current Compressor Speed
- Requested Compressor Speed
- Outdoor Temperature
- Relative Humidity
- System Status

The following binary sensors are added for each thermostat zone:

- Zone Temperature
- Zone Setpoint Status
- Zone Status

### Climate

The `nexia` climate platform lets you control a thermostat.

### Service `set_aircleaner_mode`

Part of the `nexia.` services. Sets the air cleaner mode. Options include 'auto', 'quick', and 
'allergy'. This setting will affect all zones on the same thermostat.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets `nexia` thermostats.
| `aircleaner_mode` | no | 'AUTO', 'QUICK', or 'ALLERGY'

### Service `set_humidify_setpoint`

Part of the `nexia.` services. Sets the humidify setpoint. This setting will affect all zones on the same thermostat.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets `nexia` thermostats.
| `humidity` | no | Humidify setpoint level, from 35 to 65. 
