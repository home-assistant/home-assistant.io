---
title: "RFLink Light"
description: "Instructions on how to integrate RFLink lights into Home Assistant."
logo: rflink.png
ha_category:
  - Light
ha_iot_class: Assumed State
ha_release: 0.38
ha_domain: rflink
---

The `rflink` integration supports devices that use [RFLink gateway firmware](https://www.rflink.nl/download.php), for example the [Nodo RFLink Gateway](https://www.nodo-shop.nl/en/21-rflink-). RFLink gateway is an Arduino firmware that allows two-way communication with a multitude of RF wireless devices using cheap hardware (Arduino + transceiver).

First, you have to set up your [RFLink hub](/integrations/rflink/).

After configuring the RFLink hub, lights will be automatically discovered and added.

RFLink binary_sensor/switch/light ID's are composed of: protocol, id, switch/channel. For example: `newkaku_0000c6c2_1`.

Once the ID of a light is known, it can be used to configure the light in HA, for example to add it to a different group or configure a nice name.

Configuring devices as a light:

```yaml
# Example configuration.yaml entry
light:
  - platform: rflink
    devices:
      NewKaku_02a48800_0: {}
      newkaku_0000c6c2_1: {}
      Ansluta_ce30_0: {}
      Maclean_0d82_01: {}
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
automatic_add:
  description: Automatically add new/unconfigured devices to Home Assistant if detected.
  required: false
  default: true
  type: boolean
devices:
  description: A list of lights.
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
        type:
          description: "Override automatically detected type of the light device, can be: switchable, dimmable, hybrid or toggle. See [Light Types](/integrations/light.rflink/#light-types) below."
          required: false
          default: switchable
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
          description: Repeat every RFLink command this number of times.
          required: false
          default: 1
          type: integer
        group:
          description: Allow light to respond to group commands (ALLON/ALLOFF).
          required: false
          default: true
          type: boolean
{% endconfiguration %}

### Light state

Initially the state of a light is unknown. When the light is turned on or off (via frontend or remote) the state is known and will be shown in the frontend.

Sometimes a light is controlled by multiple remotes, each remote has its own code programmed in the light. To allow tracking of the state when switched via other remotes add the corresponding remote codes as aliases:

```yaml
# Example configuration.yaml entry
light:
  - platform: rflink
    devices:
      newkaku_0000c6c2_1:
        aliases:
          - newkaku_000000001_2
          - kaku_000001_a
```

Any on/off command from any alias ID updates the current state of the light. However when sending a command through the frontend only the primary ID is used.

### Light types

Light devices can come in different forms. Some only switch on and off, other support dimming. Dimmable devices might not always respond nicely to repeated `on` command as they turn into a pulsating state until `on` is pressed again (for example KlikAanKlikUit). The RFLink integration support three types of lights to make things work in every situation:

- *Hybrid*: This type sends a `dim` followed by an an `on` command; and `off` commands. This will make dimmable devices turn on at the requested dim level and on/off devices on. One caveat is this type is not compatible with signal repetition as multiple `on` signals will cause dimmers to go into disco mode.
- *Switchable*: Device type that sends only `on` and `off` commands. It work for both on/off and dimmable type switches. However dimmables might have issues with signal repetition (see above).
- *Dimmable*: Sends only `dim` and `off` commands. This does not work on on/off type devices as they don't understand the `dim` command. For dimmers this does not cause issues with signal repetitions.
- *Toggle*: Device type that sends only `on` commands to turn on or off the device. Some switches like for example Livolo light switches use the same 'on' command to switch on and switch off the lights. If the light is on and 'on' gets sent, the light will turn off and if the light is off and 'on' gets sent, the light will turn on. If the device has an unknown state, it will assume it is off by default.

By default new lights are assigned the `switchable` type. Protocol supporting dimming are assigned the `hybrid` type. Currently only `newkaku` protocol is detected as dimmable. Please refer to Device Support to get your dimmers supported.

### Hiding/ignoring lights

Lights are added automatically when the RFLink gateway intercepts a wireless command in the ether. To prevent cluttering the frontend use any of these methods:

- Disable automatically adding of unconfigured new sensors (set `automatic_add` to `false`).
- Hide unwanted devices using [customizations](/getting-started/customizing-devices/)
- [Ignore devices on a platform level](/integrations/rflink/#ignoring-devices)

### Device support

See [device support](/integrations/rflink/#device-support)

### Additional configuration examples

Multiple lights with `signal_repetitions` and custom names

```yaml
# Example configuration.yaml entry
light:
  - platform: rflink
    device_defaults:
      fire_event: true
      signal_repetitions: 2
    automatic_add: true
    devices:
      NewKaku_02a48800_0:
        name: Kitchen
        type: hybrid
      newkaku_0000c6c2_1:
        name: Living room
        aliases:
          - newkaku_000000001_2
          - kaku_000001_a
      Ansluta_ce30_0:
        name: Kitchen Under Counter Lights
      Maclean_0d82_01:
        name: Bedroom Lamp
```
