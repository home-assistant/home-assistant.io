---
title: V2C
description: Instructions on how to integrate a Trydan Charger with Home Assistant.
ha_category:
  - Energy
ha_release: 2023.02
ha_iot_class: Local Push
ha_codeowners:
  - '@V2Charge'
  - '@jesusllorens79'
ha_domain: v2c
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

The [V2C](https://v2charge.com/es/) integration will allow you to monitor the [Trydan](https://v2charge.com/es/trydan/) data relayed from the charger via wifi.

## Configuration:

To enable this sensor in your installation, add this in your `configuration.yaml` file:

```yaml
# Example for the configuration.yaml entry
v2c:
  host: "xxx.xxx.xx.xxx"
```

In this integration is necessary to include the ip manually in the configuration.yaml, otherwise the integration does not work properly.
Once you add your ip, you will need to restart Home Assistant for the changes to take effect. After that, you will be able to add entities in the dashboard.

## Sensor:

The sensor adds the following entities :

- ADC PWM
- Charge Energy (kWh)
- Charge Power (W)
- Charge State
- Charge Time (seconds)
- Dynamic
- Contracted Power (W)
- House Power (W)
- Intensity
- Lock
- Maximum Intensity (A)
- Minimum Intensity (A)
- Ocpp
- Pause Dynamic state
- Pause State
- Payment
- Program
- PV Power (W)
- Slave Error
- Dynamic Power

## Important:

You need to be connected to the same wifi.

The `ip` you need to write is not the `wifi ip`, is the one the charging station has, the `trydan ip`.

For now, you will only be able to see the values of the Trydan, in the future we will add a function for also send values to the device.