---
title: ThermoPro
description: Instructions on how to integrate ThermoPro devices into Home Assistant.
ha_category:
  - Sensor
ha_bluetooth: true
ha_release: 2022.9
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
  - '@h3ss'
ha_domain: thermopro
ha_config_flow: true
ha_platforms:
  - button
  - sensor
ha_integration_type: integration
---

Integrates [ThermoPro](https://buythermopro.com/) devices into Home Assistant.

## Supported devices

- [TP357 Bluetooth Indoor Thermometer Hygrometer](https://buythermopro.com/products/tp357-bluetooth-hygrometer-thermometer)
- [TP358 Bluetooth Indoor Thermometer Hygrometer](https://buythermopro.com/products/tp358-bluetooth-indoor-thermometer-hygrometer)
- [TP359 Bluetooth Indoor Thermometer Hygrometer](https://buythermopro.com/products/tp359-bluetooth-indoor-hygrometer-thermometer)
- [TP393 Bluetooth Indoor Thermometer Hygrometer](https://device.report/manual/3622300)
- [TP960 TempSpike Bluetooth Meat Thermometer](https://buythermopro.com/products/tp960-tempspike-bluetooth-meat-thermometer)
- [TP962 Twin TempSpike Bluetooth Meat Thermometer](https://buythermopro.com/products/tp962-twin-tempspike-bluetooth-meat-thermometer)
- [TP970 TempSpike Plus Bluetooth Meat Thermometer](https://buythermopro.com/products/tp970-tempspike-plus-bluetooth-meat-thermometer)

The ThermoPro integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

{% include integrations/config_flow.md %}

## Buttons

These {% term actions %} allow one to set the time on supported devices (TP358, TP393) via Home Assistant.

### Button `Set Date&Time`

Sets the date & time on target devices to the system time in 24-hour notation.
The device is capable of showing 12-hour notation (AM/PM) but setting this is currently not implemented.

For example, the following automation sets the datetime of the thermometer each day.

{% raw %}

```yaml
mode: single
triggers:
  - trigger: time
    at: "03:03:03"
conditions: []
actions:
  - action: button.press
    target:
      entity_id: button.tp_358_xxxx_your_device_set_date_time
    data: {}
```

{% endraw %}
