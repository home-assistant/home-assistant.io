---
title: SNOOZ
description: Instructions on how to integrate SNOOZ devices into Home Assistant.
ha_category:
  - Sensor
  - Fan
ha_bluetooth: true
ha_release: 2022.10
ha_iot_class: Local Push
ha_codeowners:
  - '@AustinBrunkhorst'
ha_domain: snooz
ha_config_flow: true
ha_platforms:
  - fan
  - sensor
ha_integration_type: integration
---

Integrates [SNOOZ](https://getsnooz.com/) devices into Home Assistant.

{% include integrations/config_flow.md %}

The SNOOZ integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

## Supported devices

- [SNOOZ White Noise Machine](https://getsnooz.com/products/snooz-white-noise-machine)

## Setup

Once a device is discovered, it needs to be put into pairing mode to complete setup.

### Entering pairing mode

1. Ensure the device is not connected to a mobile app or any other bluetooth controller.
2. Hold your finger on the power button until all buttons begin pulsing on and off (~ 5 seconds).

<p class='img'>
  <img src='/images/integrations/snooz/pairing_mode.jpg' alt='Top down view of a SNOOZ White Noise Machine, highlighting the power button.'>
</p>

## Services

### Service `snooz.turn_on`

Turn on the device (just like `fan.turn_on`), but with the option to transition the volume over time.

{% my developer_call_service badge service="snooz.turn_on" %}

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that define the entity ID(s) of SNOOZ fan entities(s) to control.
| `transition` | yes | Number of seconds to transition to target volume.
| `volume` | yes | Percentage volume level. If not specified, the volume on the device is used.

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "04:20:00"
  action:
    - service: snooz.turn_on
      target:
        entity_id: fan.snooz_abcd
      data:
        volume: 33
        transition: 120
```

### Service `snooz.turn_off`

Turn off the device (just like `fan.turn_off`), but with the option to transition the volume over time.

<div class='note'>
Once the transition completes and the device is turned off, the volume is restored to the value before the transition started. This affords the ability to repeatedly call turn_off / turn_on with transitions without specifying a volume.
</div>

{% my developer_call_service badge service="snooz.turn_off" %}

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that define the entity ID(s) of SNOOZ fan entities(s) to control.
| `transition` | yes | Number of seconds to transition device volume and power state off.

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "16:20:00"
  action:
    - service: snooz.turn_off
      target:
        entity_id: fan.snooz_abcd
      data:
        transition: 120
```

### Service `snooz.disconnect`

Disconnect the underlying bluetooth connection for a device. This does nothing when the device isn't connected.

{% my developer_call_service badge service="snooz.disconnect" %}

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that define the entity ID(s) of SNOOZ fan entities(s) to disconnect.

## Platforms

### Fan

Devices are exposed as Fan entities. Fan speed percentage is mapped to volume level on the device.

<div class='note'>
Speed percentages less than 10 have no effect - they all map to a value of 1 on the device.
</div>

### Sensor

Diagnostic sensors are available but disabled by default. Enable these sensors in the device settings UI.

#### Signal strength

The Bluetooth Received Signal Strength Indication (RSSI).

#### Connection status

The last known connection status of the device.

- `disconnected`
- `connecting`
- `connected`
