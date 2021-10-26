---
title: "RFLink Cover"
description: "Instructions on how to integrate RFLink Somfy RTS and KAKU ASUN-650 covers into Home Assistant."
logo: rflink.png
ha_category:
  - Cover
ha_iot_class: Assumed State
ha_release: 0.55
ha_domain: rflink
---

The `rflink` integration supports devices that use [RFLink gateway firmware](http://www.nemcon.nl/blog2/), for example the [Nodo RFLink Gateway](https://www.nodo-shop.nl/nl/21-rflink-gateway). RFLink gateway is an Arduino firmware that allows two-way communication with a multitude of RF wireless devices using cheap hardware (Arduino + transceiver).

First, you have to set up your [RFLink hub](/integrations/rflink/).

After configuring the RFLink hub, covers will be automatically discovered and added. Except the Somfy RTS devices.

### Setting up a Somfy RTS device

You have to add the Somfy RTS manually with the supplied RFlinkLoader (Windows only).

Press the Learn button on the original Somfy remote enter the following code within 3 seconds. Your blinds will go up and down shortly:

```text
10;RTS;02FFFF;0412;3;PAIR;
```

Your blinds will go up and down again. This means your RFLink is now paired with your RTS motor.
To check this enter the following code again and see if there is a record.

```text
10;RTSSHOW;
```

```text
RTS Record: 0 Address: FFFFFF RC: FFFF
RTS Record: 1 Address: FFFFFF RC: FFFF
RTS Record: 2 Address: FFFFFF RC: FFFF
RTS Record: 3 Address: 02FFFF RC: 0018
RTS Record: 4 Address: FFFFFF RC: FFFF
RTS Record: 5 Address: FFFFFF RC: FFFF
RTS Record: 6 Address: FFFFFF RC: FFFF
RTS Record: 7 Address: FFFFFF RC: FFFF
RTS Record: 8 Address: FFFFFF RC: FFFF
RTS Record: 9 Address: FFFFFF RC: FFFF
RTS Record: 10 Address: FFFFFF RC: FFFF
RTS Record: 11 Address: FFFFFF RC: FFFF
RTS Record: 12 Address: FFFFFF RC: FFFF
RTS Record: 13 Address: FFFFFF RC: FFFF
RTS Record: 14 Address: FFFFFF RC: FFFF
RTS Record: 15 Address: FFFFFF RC: FFFF
```

After configuring the RFLink Somfy RTS you have to add the cover to the `configuration.yaml` file like any other RFlink device.

RFLink cover ID's are composed of: protocol, id, and gateway. For example: `RTS_0100F2_0`. 

Once the ID of a cover is known, it can be used to configure the cover in Home Assistant, for example, to add it to a different group or set a nice name.

Configuring devices as a cover:

```yaml
# Example configuration.yaml entry
cover:
  - platform: rflink
    devices:
      RTS_0100F2_0: {}
      bofumotor_455201_0f: {}
```

{% configuration %}
device_defaults:
  description: The defaults for the devices.
  required: false
  type: map
  keys:
    fire_event:
      description: Set default `fire_event` for RFLink cover devices.
      required: false
      default: false
      type: boolean
    signal_repetitions:
      description: Set default `signal_repetitions` for RFLink cover devices.
      required: false
      default: 1
      type: integer
devices:
  description: A list of covers.
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
        fire_event:
          description: Fire a `button_pressed` event if this device is turned on or off.
          required: false
          default: False
          type: boolean
        signal_repetitions:
          description: The number of times every RFLink command should repeat.
          required: false
          type: integer
        group:
          description: Allow light to respond to group commands (ALLON/ALLOFF).
          required: false
          default: true
          type: boolean
        group_aliases:
          description: The `aliases` which only respond to group commands.
          required: false
          type: [list, string]
        no_group_aliases:
          description: The `aliases` which do not respond to group commands.
          required: false
          type: [list, string]
        type:
          description: The option to invert (`inverted`) on/off commands sent to the RFLink device or not (`standard`).
          required: false
          type: string
{% endconfiguration %}

### Setting up a KAKU ASUN-650 device

In RFLink, the ON and DOWN command are used to close the cover and the OFF and UP command are used to open the cover. The KAKU (COCO) ASUN-650 works the other way around, it uses the ON command to open the cover and the OFF command to close the cover.

The RFLink cover device has a property named `type` that takes 2 values:

- `standard`: Do not invert the on/off commands sent to the RFLink device.
- `inverted`: Invert the on/off commands sent to the RFLink device.

The following configuration example shows how to use the `type` property:

```yaml
# Example configuration.yaml entry that shows how to
# use the type property.
cover:
  - platform: rflink
    devices:
      newkaku_xxxxxxxx_x:
        name: kaku_inverted_by_type
        type: inverted
      newkaku_xxxxxxxx_y:
        name: kaku_not_inverted_by_type
        type: standard
      newkaku_xxxxxxxx_z:
        name: kaku_inverted_by_default
      nonkaku_yyyyyyyy_x:
        name: non_kaku_inverted_by_type
        type: inverted
      nonkaku_yyyyyyyy_y:
        name: non_kaku_not_inverted_by_type
        type: standard
      nonkaku_yyyyyyyy_z:
        name: non_kaku_not_inverted_by_default
```

The configuration above shows that the `type` property may be omitted. When the ID starts with `newkaku`, the component will make sure that the on and off commands are inverted. When the ID does not start with `newkaku`, the on and off commands are not inverted. 

### Device support

See [device support](/integrations/rflink/#device-support).

### Additional configuration examples

Multiple covers with custom names and aliases

```yaml
# Example configuration.yaml entry
cover:
  - platform: rflink
    devices:
      RTS_0A8720_0:
        name: enanos
        aliases:
          - rts_31e53f_01
          - rts_32e53f_01
      RTS_30E542_0:
        name: comedor
        aliases:
          - rts_33e53f_01
          - rts_fa872e_01
      RTS_33E542_0:
        name: dormitorio
        aliases:
          - rts_30e53f_01
          - rts_32e53f_01
      RTS_32E542_0:
        name: habitaciones
        fire_event: true
```
