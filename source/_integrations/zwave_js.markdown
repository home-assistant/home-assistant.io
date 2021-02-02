---
title: Z-Wave JS
description: Instructions on how to integrate Z-Wave with Home Assistant via Z-Wave JS.
ha_category:
  - Binary Sensor
  - Climate
  - Cover
  - Fan
  - Hub
  - Light
  - Lock
  - Sensor
  - Switch
ha_release: '2021.2'
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@home-assistant/z-wave'
ha_domain: zwave_js
---

This integration allows you to control a Z-Wave network via [Z-Wave JS](https://zwave-js.github.io/node-zwave-js/#/).

## Requirements

Controlling your Z-Wave network with the Z-Wave JS integration is split up into two parts:

1. The [Z-Wave JS Server](https://github.com/zwave-js/zwave-js-server) is the gateway between your Z-Wave USB stick and Home Assistant. You can run this server separately from Home Assistant so your Z-Wave mesh will keep running if you restart or stop Home Assistant. The Home Assistant Z-Wave JS integration connects to this server with a websocket connection.

2. The Z-Wave JS integration in Home Assistant. This integration connects to the Z-Wave JS Server to retrieve the info from your Z-Wave network.

### Core installation

- The Z-Wave JS Server installed and running in your network.
- We provide an official add-on which you can find in the Supervisor's add-on store.
- Not running the Supervisor? The [Z-Wave JS 2 MQTT project](https://zwave-js.github.io/zwavejs2mqtt/#/getting-started/quick-start) also includes the Z-Wave JS Server (you can enable it in the settings) and they provide a Docker image.

### Hardware requirements

- [Supported Z-Wave dongle](/docs/z-wave/controllers/#supported-z-wave-usb-sticks--hardware-modules). The Z-Wave controller dongle should be connected to the same host as where the Z-Wave JS server is running.

## Configuration

This integration can be configured using the integrations in the
Home Assistant frontend.

Menu: **Configuration** -> **Integrations**.

Click on the `+` sign to add an integration and click on **Z-Wave JS**.
After completing the configuration flow, the Z-Wave JS integration will be
available.

## Current Limitations

As this integration is still in the early stages there are some important limitations to be aware of.

- Garage door controllers (Barrier Operator CC) are not currently supported.
- Configuration of Z-Wave nodes and/or configuration with the Home Assistant UI is currently not yet implemented. You will need to use another tool, such as [zwavejs2mqtt](https://github.com/zwave-js/zwavejs2mqtt), to manage device configuration.
- Polling is currently not supported but may be added in a later release.
- Support for setting configuration parameters through service calls is currently not supported but may be added in a later release.
- Support for Node/Scene events is currently not supported but may be added in a later release.
- There currently is no migration path from any of the other Z-Wave implementations in Home Assistant. Your Z-Wave network is however stored on your stick so migrating will only require you to redo your device and entity naming.


## Services

### Service `zwave_js.set_lock_usercode`

This service will set the usercode of a lock to X at code slot Y.
Valid usercodes are at least 4 digits.

| Service Data Attribute | Required | Description                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            | no       | Lock entity or list of entities to set the usercode. |
| `code_slot`            | yes      | The code slot to set the usercode into.              |
| `usercode`             | yes      | The code to set in the slot.                         |

### Service `zwave_js.clear_lock_usercode`

This service will clear the usercode of a lock in code slot X.
Valid code slots are between 1-254.

| Service Data Attribute | Required | Description                                            |
| ---------------------- | -------- | ------------------------------------------------------ |
| `entity_id`            | no       | Lock entity or list of entities to clear the usercode. |
| `code_slot`            | yes      | The code slot to clear the usercode from.              |

## Events

### Event `zwave_js_event`

This event is fired whenever a [notification](https://zwave-js.github.io/node-zwave-js/#/api/node?id=quotnotificationquot) or [value notification](https://zwave-js.github.io/node-zwave-js/#/api/node?id=quotvalue-notificationquot) event is received. 

#### Notifications

Notifications are events sent using the Notification command class. The `parameters` attribute in the example below is optional, and when it is included, the keys in the attribute will vary depending on the event.

Notification exapmle:
```json
{
    "type": "notification",
    "domain": "zwave_js",
    "node_id": 1,
    "home_id": "974823419",
    "device_id": "ad8098fe80980974",
    "label": "Keypad lock operation",
    "parameters": {"userId": 1}
}
```

#### Value Notifications

Value Notifications are used for stateless values, like `Central Scenes`.

Value Notification example:
```json
{
    "type": "value_notification",
    "domain": "zwave_js",
    "node_id": 1,
    "home_id": "974823419",
    "endpoint": 0,
    "device_id": "ad8098fe80980974",
    "command_class": 32,
    "command_class_name": "Basic",
    "label": "Event value",
    "property_name": "event",
    "property_key_name": "some value",
    "value": 255,
}
```
