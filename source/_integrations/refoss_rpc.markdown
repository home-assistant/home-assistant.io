---
title: Refoss RPC
description: Integrate Refoss devices that support `RPC` protocol.
ha_category:
  - Binary sensor
  - Energy
  - Switch
  - Sensor
  - Event
  - Update
  - Cover
ha_release: 2025.10
ha_codeowners:
  - '@ashionky'
ha_iot_class: Local Push
ha_domain: refoss_rpc
ha_config_flow: true
ha_zeroconf: true
ha_platforms:
  - binary_sensor
  - switch
  - sensor
  - event
  - update
  - button
  - cover
ha_integration_type: device
---

Integrate Refoss devices that support `RPC` protocol into Home Assistant.

{% include integrations/config_flow.md %}

## Supported device models

| Model                               | Version            |             
|-------------------------------------|--------------------|
| `Refoss Smart Wi-Fi Switch, R11`    | `all`              |
| `Refoss Smart Wi-Fi Plug, P11S`     | `all`              |
| `Refoss Smart Wi-Fi Switch, R21`    | `all`              |
| `Refoss Smart Energy Monito, EM06P` | `all`              |
| `Refoss Smart Energy Monito, EM16P` | `all`              |


## Entity naming

The integration uses the following strategy to name its entity:

- If `Channel Name` is set in the device, the integration will use it to generate the entity name, e.g. `Kitchen Switch`
- If `Channel Name` is set to the default value, the integration will use the `Device Name` and default channel name to generate the entity name, e.g. `r11 Switch 1`.

## Binary input sensors

It's possible to select if a device's input is connected to a button or a switch. Binary sensors are created only if the input mode is set to `switch`. When the input mode is set to `button` you can use events for your automations.

## Events

If device's input mode is set to `button`, integration fires events under the type `refoss.click` when the switch is used. You can use these events in your automations.

### Automations

The simplest way to create automations is to use the Home Assistant automation editor. For example, to set an automation triggered by a double press of a particular R11 Button1:

1. In the Triggers section of the automation, set Trigger Type to `Device`.
2. In the Device dropdown menu. find the R11.
3. In the Trigger dropdown menu, select `Button1 double push`.
4. Set any conditions and actions to complete your automation.

### Possible values for `click_type`

Devices use the values `btn_down`, `btn_up`, `single_push`, `double_push`, `triple_push` and `long_push` as `click_type`.

## Device actions

The integration offers device actions which can be triggered by a configuration button.

### Firmware update

Trigger device firmware update.

### Check latest firmware

Trigger check latest firmware of device.

### Reboot

Trigger reboot of device.

