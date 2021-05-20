---
title: OpenZWave (beta)
description: Instructions on how to integrate OpenZWave with Home Assistant.
ha_category:
  - Switch
ha_release: '0.110'
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@cgarwood'
  - '@marcelveldt'
  - '@MartinHjelmare'
ha_domain: ozw
ha_platforms:
  - binary_sensor
  - climate
  - cover
  - fan
  - light
  - lock
  - sensor
  - switch
---

This integration allows you to utilize OpenZWave's ozwdaemon to control a Z-Wave network over MQTT. If you're starting out with Z-Wave in Home Assistant, we recommend that you use [the Z-Wave JS integration](/integrations/zwave_js).

## Requirements

### Supervisor managed installation

- The official OpenZWave add-on installed available from the add-on store.

### Core installation

- MQTT server and the [MQTT integration](/integrations/mqtt/) set up in Home Assistant.
- The [ozwdaemon](https://github.com/OpenZWave/qt-openzwave) installed and running in your network.

### Hardware requirements

- Supported Z-Wave dongle compatible with OpenZWave 1.6. See this [list](/docs/z-wave/controllers/#supported-z-wave-usb-sticks--hardware-modules) of controllers. The Z-Wave controller dongle should be connected to the same host as where the ozwdaemon is running.

{% include integrations/config_flow.md %}

### Secure network key

The secure network key is set in the settings for the ozwdaemon and
not in the integration configuration.

## Migrate from Z-Wave integration

To migrate to the OpenZWave integration from the Z-Wave integration there's a
wizard in the frontend configuration panel of the Z-Wave integration. The wizard
will try to migrate the entity IDs, names, icons and areas of the entities and
devices of your Z-Wave integration to your OpenZWave integration. At the end of
the migration, the Z-Wave integration configuration entry will be removed.

Make sure you take necessary backups, eg a Supervisor snapshot, before migrating
to be able to restore the Z-Wave integration. The wizard may not be able to
migrate all entity and device information. It will show you what entity and
device information failed to migrate.

## Services

### Service `ozw.add_node`

This service will set the controller into inclusion mode and should be used to
add a device (node) to the Z-Wave network. Call the service and then perform
the device-specific procedure, according to the device manual, to add your
device to the network. Make sure the controller is connected to the host where
the ozwdaemon is running, when performing this operation.

| Service Data Attribute | Required | Description                                                                                                                                                                                                                                      |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `secure`               | no       | Add the new node with secure communications. [Secure network key must be set](#secure-network-key). This process will fallback to add_node (unsecure) for unsupported devices. Note that insecure devices can't directly talk to secure devices. |
| `instance_id`          | no       | The OZW Instance/Controller to use, defaults to 1.                                                                                                                                                                                               |

### Service `ozw.remove_node`

This service will set the controller into exclusion mode and should be used to
remove a device (node) from the Z-Wave network. Call the service and then
perform the device-specific procedure, according to the device manual,
to remove your device from the network. Make sure the controller is connected
to the host where the ozwdaemon is running, when performing
this operation.

| Service Data Attribute | Required | Description                                        |
| ---------------------- | -------- | -------------------------------------------------- |
| `instance_id`          | no       | The OZW Instance/Controller to use, defaults to 1. |

### Service `ozw.cancel_command`

This service will cancel a pending command. Typically used if the add or remove node
services have been called but no node was added or removed.

| Service Data Attribute | Required | Description                                        |
| ---------------------- | -------- | -------------------------------------------------- |
| `instance_id`          | no       | The OZW Instance/Controller to use, defaults to 1. |

### Service `ozw.set_usercode`

This service will set the usercode to X at code slot Y.
Valid usercodes are at least 4 digits.

| Service Data Attribute | Required | Description                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            | no       | Lock entity or list of entities to set the usercode. |
| `code_slot`            | yes      | The code slot to set the usercode into.              |
| `usercode`             | yes      | The code to set in the slot.                         |

### Service `ozw.clear_usercode`

This service will clear the usercode in code slot X.
Valid code slots are between 1-254.

| Service Data Attribute | Required | Description                                            |
| ---------------------- | -------- | ------------------------------------------------------ |
| `entity_id`            | no       | Lock entity or list of entities to clear the usercode. |
| `code_slot`            | yes      | The code slot to clear the usercode from.              |

### Service `ozw.set_config_parameter`

This service will set the specified configuration parameter to the value specified to
allow device-specific configurations. Example of this would be setting notification
LED colors on switches.

| Service Data Attribute | Required | Description                                                                                                     |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| `instance_id`          | no       | The OZW Instance/Controller to use, defaults to 1.                                                              |
| `node_id`              | yes      | Node id of the device to set configuration parameter to (integer).                                              |
| `parameter`            | yes      | Parameter number to set (integer).                                                                              |
| `value`                | yes      | Value to set for parameter. (String or integer value for list, string or boolean for bool parameters, list of dicts for bitset parameters (see example below), integer for others). |


#### Example BitSet service call

Here is an example of what to send to the service for a BitSet parameter:

```yaml
node_id: 4
parameter: 5
value:
  - position: 1
    value: true
  - label: Humidity
    value: false
  - position: 3
    value: false
```

## Events

### Event `ozw.scene_activated`

This event is fired upon scene activation. The data in the event will vary depending on your particular Z-Wave device, however, here is an example from a Zooz ZEN27 Dimmer when the down button is pressed 3 times.

````json
{
    "event_type": "ozw.scene_activated",
    "data": {
        "instance_id": 1,
        "node_id": 9,
        "scene_id": 1,
        "scene_label": "Scene 1",
        "scene_value_id": 5,
        "scene_value_label": "Pressed 3 Times"
    },
    "origin": "LOCAL",
    "time_fired": "2020-08-16T12:49:50.409702+00:00",
    "context": {
        "id": "f917f078dfbe11ea8c0e374c447f29eb",
        "parent_id": null,
        "user_id": null
    }
}
````
