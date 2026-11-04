---
title: Acaia
description: Instructions on how to integrate your Acaia smart coffee scale with Home Assistant.
ha_release: 2024.12
ha_category:
  - Binary sensor
  - Button
  - Sensor
ha_iot_class: Local Push
ha_config_flow: true
ha_domain: acaia
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - sensor
ha_bluetooth: true
ha_codeowners:
  - '@zweckj'
ha_integration_type: device
ha_quality_scale: platinum
---

The **Acaia** {% term integration %} allows you to control [Acaia](https://acaia.co/) scales through Home Assistant.

If your machine is within Bluetooth range to your Home Assistant host and the [Bluetooth](/integrations/bluetooth) integration is fully loaded, the scale should be discovered automatically. If you are configuring the device manually, your scale needs to be turned on during setup.

Once the integration is set up, Home Assistant will try to connect to your scale every 15 seconds. This means there is sometimes a small delay between you turning the scale on and Home Assistant connecting to it. Because the scale only runs its own auto-off timer while nothing is connected to it, a permanent connection keeps it from turning off by itself. Use the **Idle disconnect timeout** option to change this.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Device:
  description: "The Bluetooth device that is your scale."
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
Idle disconnect timeout:
  description: "Minutes without a weight change after which Home Assistant disconnects from the scale, so the scale can turn itself off. Set to `0` (the default) to stay connected."
{% endconfiguration_basic %}

## Available platforms & entities

### Binary sensors

- **Timer running**: Whether the timer is currently running on the scale

### Buttons

- **Tare**: Tares the scale.
- **Reset timer**: Resets the timer. If the timer is running, it will continue to run.
- **Start/stop timer**: Starts or stops the timer, depending on whether the timer is currently running. Does not reset, but continue the timer.

### Sensors

- **Battery**: Current battery level of the scale.
- **Volume flow rate**: Calculates the current flow rate (in mL/s) while brewing.
- **Weight**: The weight currently shown on the scale.

## Supported devices

The following devices have been tested successfully with this integration:

- Lunar
- Pyxis
- Pearl
- Pearl S

If you have successfully tested this integration with another Acaia model, please let us know by enhancing this documentation, or by opening an issue in GitHub.

## Possible use-cases

This integration can be used in combination with integrations for smart coffee machines, such as the [La Marzocco integration](/integrations/lamarzocco/) integration.
It could also be used to display the weight on secondary displays when brewing on a Pyxis or Lunar where you cannot see the display.

## Automations

Get started with these automation examples.

### Tare & start timer when brew starts

{% details "Example YAML configuration" %}


```yaml
alias: "Start timer on scale"
description: "When a brew starts on the machine, the following actions are started: tare, reset the timer, and start the timer on the scale."
triggers:
  - trigger: state
    entity_id:
      - binary_sensor.lm001234_brewing_active
    to: "on"
    from: "off"
actions:
  - action: button.press
    target:
      entity_id: button.lunar_tare
  - action: button.press
    target:
      entity_id:
        - button.lunar_reset_timer
  - action: button.press
    target:
      entity_id:
        - button.lunar_start_stop_timer
```

{% enddetails %}

## Letting the scale turn off automatically

Acaia scales only run their auto-off timer while no device is connected to them over Bluetooth. By default, Home Assistant stays connected at all times, so the scale never turns itself off and its battery drains even when it is not in use.

To change this, set the **Idle disconnect timeout** option to a number of minutes. Once the weight hasn't changed for that long, Home Assistant disconnects and leaves the scale alone until it turns itself off. It reconnects within about 15 seconds of the scale being turned on again.

If you want to use the scale again before it has turned itself off, turn it off for more than 30 seconds and then back on. Saving the integration options also reconnects it.

## Known limitations

- While this integration is configured for your device, you won't be able to use the official app, as only one connection at a time is supported.

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}

## Troubleshooting

{% details "Device not discovered or found" %}

Make sure your scale is turned on and in Bluetooth range to your Home Assistant instance. [ESPHome Bluetooth Proxies](https://esphome.io/components/bluetooth_proxy/) are a great way to increase the range if your instance is too far away. Turn on debug settings in the acaia integration and check your logs.
{% enddetails %}
