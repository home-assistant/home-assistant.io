---
title: "RFLink Switch"
description: "Instructions on how to integrate RFLink switches into Home Assistant."
logo: rflink.png
ha_category:
  - Switch
ha_iot_class: Assumed State
ha_release: 0.38
ha_domain: rflink
---

The `rflink` integration supports devices that use [RFLink gateway firmware](https://www.rflink.nl/download.php), for example, the [Nodo RFLink Gateway](https://www.nodo-shop.nl/en/21-rflink-). RFLink gateway is an Arduino firmware that allows two-way communication with a multitude of RF wireless devices using cheap hardware (Arduino + transceiver).

First, you have to set up your [RFLink hub](/integrations/rflink/).

The RFLink integration does not know the difference between a `switch`, a `binary_sensor` and a `light`. Therefore all switchable devices are automatically added as `light` by default.

RFLink binary_sensor/switch/light ID's are composed of: protocol, id, switch/channel. For example: `newkaku_0000c6c2_1`.

Once the ID of a switch is known, it can be used to configure it as a switch type in HA and, for example, to add it to a different group or configure a nice name.

Configuring devices as switch :

```yaml
# Example configuration.yaml entry
switch:
  - platform: rflink
    devices:
      newkaku_0000c6c2_1: {}
      conrad_00785c_0a: {}
```

{% configuration %}
device_defaults:
  description: The defaults for the devices.
  required: false
  type: map
  keys:
    fire_event:
      description: Set default `fire_event` for RFLink switch devices (see below).
      required: false
      default: False
      type: boolean
    signal_repetitions:
      description: Set default `signal_repetitions` for RFLink switch devices (see below).
      required: false
      default: 1
      type: integer
devices:
  description: A list of switches.
  required: false
  type: list
  keys:
    rflink_ids:
      description: RFLink ID of the device
      required: true
      type: map
      keys:
        name:
          description: Name for the device.
          required: false
          default: RFLink ID
          type: string
        aliases:
          description: Alternative RFLink ID's this device is known by.
          required: false
          type: [list, string]
        group_aliases:
          description: "`aliases` which only respond to group commands."
          required: false
          type: [list, string]
        no_group_aliases:
          description: "`aliases` which do not respond to group commands."
          required: false
          type: [list, string]
        fire_event:
          description: Fire a `button_pressed` event if this device is turned on or off.
          required: false
          default: false
          type: boolean
        signal_repetitions:
          description: Set default `signal_repetitions` for RFLink switch devices (see below).
          required: false
          default: 1
          type: integer
        group:
          description: Allow switch to respond to group commands (ALLON/ALLOFF).
          required: false
          default: true
          type: boolean
        aliases:
          description: Alternative RFLink ID's this device is known by.
          required: false
          type: [list, string]
        group_aliases:
          description: "`aliases` which only respond to group commands."
          required: false
          type: [list, string]
        no_group_aliases:
          description: "`aliases` which do not respond to group commands."
          required: false
          type: [list, string]
{% endconfiguration %}

## Switch state

Initially, the state of a switch is unknown. When the switch is turned on or off (via frontend or wireless remote) the state is known and will be shown in the frontend.

Sometimes a switch is controlled by multiple wireless remotes, each remote has its own code programmed in the switch. To allow tracking of the state when switched via other remotes add the corresponding remote codes as aliases:

```yaml
# Example configuration.yaml entry
switch:
  - platform: rflink
    devices:
      newkaku_0000c6c2_1:
        name: Ceiling fan
        aliases:
          - newkaku_000000001_2
          - kaku_000001_a
```

Any on/off command from any alias ID updates the current state of the switch. However, when sending a command through the frontend only the primary ID is used.

## Device support

See [device support](/integrations/rflink/#device-support)

### Additional configuration examples

Multiple switches with signal repetitions and custom names

```yaml
# Example configuration.yaml entry
switch:
  - platform: rflink
    device_defaults:
      fire_event: true
      signal_repetitions: 2
    devices:
      newkaku_0000c6c2_1:
        name: Ceiling fan
      conrad_00785c_0a:
        name: Motion sensor kitchen
```
