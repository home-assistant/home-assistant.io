---
title: Profalux Neosol
description: Instructions on how to control Profalux Neosol roller shutters with their 868 MHz USB dongle in Home Assistant.
ha_category:
  - Cover
ha_iot_class: Assumed State
ha_release: 2026.11
ha_codeowners:
  - '@bbayszczak'
ha_config_flow: true
ha_domain: neosol
ha_platforms:
  - cover
ha_integration_type: hub
ha_quality_scale: silver
---

The **Profalux Neosol** {% term integration %} lets you control Profalux Neosol roller shutters from Home Assistant. It talks to the shutters through the 868&nbsp;MHz USB dongle sold for them, plugged directly into the machine that runs Home Assistant.

Everything stays in your home: the dongle transmits over radio to the motors, so no Calyps'HOME box, manufacturer account, or cloud service is involved. Once set up, you can open, close, and stop each paired shutter, put them in scenes and scripts, and automate them alongside the rest of your home. For example, you can close every shutter at sunset, or open the bedroom shutter when your alarm goes off.

This is an independent integration. It is not affiliated with, endorsed by, or supported by Profalux or Stella Advanced Technology.

## Supported devices

The following device is known to be supported by the integration:

- The `MAI-DONGLE868-1A` USB dongle, which identifies itself as `PFX KEELOQ` and reports software revision `Rev10`.

Through that dongle, the integration controls Profalux Neosol roller shutter motors that are already paired with one of its channels.

Other dongle references from the same family may work, but none has been tested.

## Unsupported devices

- The Calyps'HOME box and any shutter reached through it. The integration only talks to the USB dongle.
- Shutters that are not paired with a channel of your dongle. Home Assistant only sees channels the dongle has already transmitted on.

## Prerequisites

1. Make sure each shutter you want to control is already paired with a channel of the dongle, for example because you used the dongle with a Calyps'HOME box. Pairing is not done from Home Assistant.
2. Plug the dongle into a USB port of the machine that runs Home Assistant.
3. Place the dongle within radio range of the shutters. It transmits at 868&nbsp;MHz, so thick walls and metal shutter boxes reduce the range.

{% include integrations/config_flow.md %}

Home Assistant discovers the dongle when you plug it in, and offers to set it up. You can also add it manually, in which case you are asked for the serial port.

{% configuration_basic %}
Serial port:
    description: "The serial port the dongle is plugged into. For example, `/dev/ttyACM0`. The port is checked before the setup completes. When your system provides a `/dev/serial/by-id/` path for the dongle, Home Assistant stores that stable path instead, so the dongle keeps working after a reboot even if the port number changes."
{% endconfiguration_basic %}

A `/dev/serial/by-id/` path follows the dongle rather than the USB port, so you can plug the dongle into another port and Home Assistant reconnects to it on its own. On a system without such paths, if the port changes, remove the integration and add it again.

## Supported functionality

The integration adds a device for the dongle itself, plus one device per channel the dongle has already transmitted on, each with a single cover {% term entity %}. In practice, those are the channels your shutters are paired with. A channel whose pairing failed, or that was unpaired, also shows up, because the dongle cannot tell them apart.

### Cover

For each paired shutter, you can use Home Assistant to:

- Open the shutter. The motor runs until its end stop.
- Close the shutter. The motor runs until its end stop.
- Stop the shutter where it is.

The shutters report no state. The radio link only goes one way: the dongle transmits and the motors never answer, so Home Assistant cannot know whether a shutter is open or closed. It could guess from the last command it sent, but any use of the original remote would make that guess wrong. It therefore reports the state as unknown, and the open, close, and stop buttons stay available at all times.

The position is unknown for the same reason, so the shutters have no position slider.

## Data updates

The shutters themselves send nothing back, so there is nothing to poll on them.

Home Assistant {% term polling polls %} the dongle every 5 minutes for its channel list, to confirm the dongle is still reachable. Shutters are only created when the integration starts: a shutter paired after the setup appears once you reload the integration.

If the dongle stops answering, for example because it was unplugged, the shutters become unavailable at the next poll, so within 5 minutes. Until then, commands sent to them fail with an error. Home Assistant reconnects on its own once the dongle is plugged back in.

## Profalux Neosol automation examples

Here are a few ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Close every shutter at sunset

- **Trigger**: Sun: after sunset
- **Action**: Close cover

{% details "YAML example for closing the shutters at sunset" %}

{% example %}
automation: |
  alias: "Close the shutters at sunset"
  triggers:
    - trigger: sun
      event: sunset
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.shutter_0
{% endexample %}

{% enddetails %}

### Automation: Close the shutters when it gets too hot

- **Trigger**: Numeric state of a temperature sensor, above a threshold
- **Action**: Close cover

{% details "YAML example for closing the shutters on a hot day" %}

{% example %}
automation: |
  alias: "Close the living room shutter when it gets too hot"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.living_room_temperature
      above: 26
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.shutter_0
{% endexample %}

{% enddetails %}

## Known limitations

- The shutters send no feedback. The dongle only transmits, so a successful command means a radio frame was sent, never that a shutter moved. If a shutter is out of range or its motor is unpowered, Home Assistant still reports the command as done.
- The shutters have no state. A shutter is always reported as unknown, so you cannot base an automation or a condition on whether it is open or closed. Commands can be sent at any time, which is what matters in practice.
- The shutters have no position control. The motors cannot be sent to a given position over this protocol, so the shutters have no position slider and report no percentage.
- The favorite position is not exposed. Neosol motors can store a favorite position, but the integration does not offer it.
- Pairing is not done from Home Assistant. The integration only drives shutters that are already paired with a channel of the dongle.
- The integration supports one dongle per installation. It takes a single configuration entry, and a dongle only reaches the shutters paired with its own channels.
- Commands are sent one at a time. The dongle has a single serial link, so closing ten shutters at once sends ten frames in sequence rather than simultaneously.

## Troubleshooting

### Can't set up the dongle

#### Symptom: "Failed to connect"

When trying to set up the integration, the form shows the message "Failed to connect".

##### Description

Home Assistant could not open the serial port, or the dongle did not answer.

##### Resolution

To resolve this issue, try the following steps:

1. Make sure the dongle is plugged in, and that its LED behaves as usual.
2. Confirm the correct serial port was selected.
3. Make sure no other program is using the port. The dongle accepts a single connection at a time, so close any tool you used to configure it.
4. Unplug the dongle, plug it back in, and try again.

#### Symptom: "The device on this serial port did not identify itself as a Neosol dongle"

When trying to set up the integration, the form shows the message "The device on this serial port did not identify itself as a Neosol dongle".

##### Description

Something answered on that serial port, but it is not a compatible dongle. The USB vendor ID of the dongle belongs to Silicon Labs and is shared by many unrelated serial adapters, so Home Assistant confirms the device by asking it to identify itself.

##### Resolution

Select the serial port that belongs to the dongle. If you have several serial devices, unplug the dongle, note which port disappears, and plug it back in.

### A shutter is missing

Home Assistant only creates a device for channels the dongle has already transmitted on, when the integration starts. If a shutter is missing, it is either not paired with a channel of this dongle, or it was paired after the integration was set up:

- If it was paired after the setup, reload the integration.
- If it is not paired, disable the integration first, because Home Assistant keeps the dongle's serial port open and the dongle accepts a single connection at a time. Pair the shutter outside Home Assistant, then enable the integration again.

### A shutter does not move

The shutters never report back, so Home Assistant cannot tell a command that arrived from one that did not. If a shutter ignores Home Assistant but still obeys its own remote:

1. Move the dongle closer to the shutter, or away from metal enclosures and other 868&nbsp;MHz transmitters.
2. Check that the shutter is powered.
3. Make sure the shutter is paired with the dongle channel. A channel whose pairing failed still shows up as a shutter, because the dongle cannot tell the difference.

### The shutters are unavailable

The dongle stopped answering. Check that it is still plugged in, and that no other program took over the serial port. Home Assistant reconnects on its own once the dongle answers again.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

Removing the integration does not unpair the shutters from the dongle. They keep working with their own remotes, and setting the integration up again brings them all back.
