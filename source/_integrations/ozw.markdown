---
title: OpenZWave (beta)
description: Instructions on how to integrate OpenZWave with Home Assistant.
ha_category:
  - Switch
ha_release: "0.110"
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@cgarwood'
  - '@marcelveldt'
  - '@MartinHjelmare'
ha_domain: ozw
---

This integration allows you to utilize OpenZWave's ozwdaemon to control a Z-Wave network over MQTT.

## Requirements

- MQTT server and the [MQTT integration](/integrations/mqtt/) set up in Home Assistant.
- The [ozwdaemon](https://github.com/OpenZWave/qt-openzwave) installed and running in your network.
  For Home Assistant Supervisor there's a [custom add-on](https://github.com/marcelveldt/hassio-addons-repo/tree/master/ozwdaemon).
- Supported Z-Wave dongle compatible with OpenZWave 1.6. See this [list](/docs/z-wave/controllers/#supported-z-wave-usb-sticks--hardware-modules) of controllers.

## Configuration

This integration can be configured using the integrations in the
Home Assistant frontend.

Menu: **Configuration** -> **Integrations**.

Click on the `+` sign to add an integration and click on **OpenZWave (beta)**.
After completing the configuration flow, the OpenZWave integration will be
available.

### Secure network key

The secure network key is set in the settings for the ozwdaemon and
not in the integration configuration.

## Services

### Service `zwave_mqtt.add_node`

This service will set the controller into inclusion mode and should be used to
add a device (node) to the Z-Wave network. Call the service and then perform
the device-specific procedure, according to the device manual, to add your
device to the network. Make sure the controller is connected to the host where
the ozwdaemon is running, when performing this operation.

| Service Data Attribute | Required | Description                                                                                                                                                                                                                                      |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `secure`               | no       | Add the new node with secure communications. [Secure network key must be set](#secure-network-key). This process will fallback to add_node (unsecure) for unsupported devices. Note that insecure devices can't directly talk to secure devices. |
| `instance_id`          | no       | The OZW Instance/Controller to use, defaults to 1.                                                                                                                                                                                               |

### Service `zwave_mqtt.remove_node`

This service will set the controller into exclusion mode and should be used to
remove a device (node) from the Z-Wave network. Call the service and then
perform the device-specific procedure, according to the device manual,
to remove your device from the network. Make sure the controller is connected
to the host where the ozwdaemon is running, when performing
this operation.

| Service Data Attribute | Required | Description                                        |
| ---------------------- | -------- | -------------------------------------------------- |
| `instance_id`          | no       | The OZW Instance/Controller to use, defaults to 1. |
