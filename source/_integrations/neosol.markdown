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
ha_quality_scale: bronze
---

The **Profalux Neosol** {% term integration %} lets you control Profalux Neosol roller shutters from Home Assistant. It talks to the shutters through the 868 MHz USB dongle sold for them, plugged directly into the machine that runs Home Assistant.

Everything stays in your home: the dongle transmits over radio to the motors, so no Calyps'HOME box, manufacturer account, or cloud service is involved. Once set up, you can open, close, and stop each paired shutter, put them in scenes and scripts, and automate them alongside the rest of your home.

This is an independent integration. It isn't affiliated with, endorsed by, or supported by Profalux or Stella Advanced Technology.

## Supported devices

The following device is known to be supported by the integration:

- The `MAI-DONGLE868-1A` USB dongle, which identifies itself as `PFX KEELOQ` and reports software revision `Rev10`.

Through that dongle, the integration controls Profalux Neosol roller shutter motors that are already paired with one of its channels.

Other dongle references from the same family may work, but none has been tested.

## Prerequisites

1. Make sure each shutter you want to control is already paired with a channel of the dongle using your Calyps'HOME box. Pairing isn't done from Home Assistant.
2. Plug the dongle into a USB port of the machine that runs Home Assistant.
3. Place the dongle within radio range of the shutters. It transmits at 868 MHz, so thick walls and metal shutter boxes reduce the range.

{% include integrations/config_flow.md %}

Home Assistant discovers the dongle when you plug it in, and offers to set it up.

{% configuration_basic %}
Serial port:
    description: "The serial port the dongle is plugged into. For example, `/dev/ttyACM0`. The port is checked before the setup completes. When your system provides a `/dev/serial/by-id/` path for the dongle, Home Assistant stores that stable path instead, so the dongle keeps working after a reboot even if the port number changes."
{% endconfiguration_basic %}

## Supported functionality

The integration adds a device for the dongle itself, plus one device per channel the dongle has already transmitted on, each with a single [cover](/integrations/cover/) {% term entity %}. In practice, those are the channels your shutters are paired with. A channel whose pairing failed, or that was unpaired, also shows up, because the dongle can't tell them apart.

### Covers

For each paired shutter, you can use Home Assistant to:

- Open the shutter. The motor runs until its end stop.
- Close the shutter. The motor runs until its end stop.
- Stop the shutter where it is.

The shutters report no state. The radio link only goes one way: the dongle transmits and the motors never answer, so Home Assistant can't know whether a shutter is open or closed. It could guess from the last command it sent, but any use of the original remote would make that guess wrong. It therefore reports the state as unknown, and the open, close, and stop buttons stay available at all times.

The position is unknown for the same reason, so the shutters have no position slider.

## Known limitations

- The shutters send no feedback. The dongle only transmits, so a successful command means a radio frame was sent, never that a shutter moved. If a shutter is out of range or its motor is unpowered, Home Assistant still reports the command as done.
- The shutters have no state, so you can't base an automation or a condition on whether a shutter is open or closed.
- The shutters have no position control. The motors can't be sent to a given position over this protocol, so the shutters have no position slider and report no percentage.
- The favorite position isn't exposed. Neosol motors can store a favorite position, but the integration doesn't offer it.
- Pairing and unpairing aren't done from Home Assistant. The integration only drives shutters that are already paired with a channel of the dongle.

## Troubleshooting

### Can't set up the dongle

#### Symptom: "Failed to connect"

When trying to set up the integration, the form shows the message "Failed to connect".

#### Description

Home Assistant couldn't open the serial port, or the dongle didn't answer.

#### Resolution

To resolve this issue, try the following steps:

1. Make sure the dongle is plugged in.
2. Confirm the correct serial port was selected.
3. Make sure no other program is using the port. The dongle accepts a single connection at a time, so close any tool you used to configure it.
4. Unplug the dongle, plug it back in, and try again.

#### Symptom: "The device on this serial port did not identify itself as a Neosol dongle"

When trying to set up the integration, the form shows the message "The device on this serial port did not identify itself as a Neosol dongle".

#### Description

Something answered on that serial port, but it isn't a compatible dongle. The USB vendor ID of the dongle belongs to Silicon Labs and is shared by many unrelated serial adapters, so Home Assistant confirms the device by asking it to identify itself.

#### Resolution

Select the serial port that belongs to the dongle. If you have several serial devices, unplug the dongle, note which port disappears, and plug it back in.

### A shutter is missing

Home Assistant only creates a device for channels the dongle has already transmitted on, when the integration starts. If a shutter is missing, it's either not paired with a channel of this dongle, or it was paired after the integration was set up:

- If it was paired after the setup, reload the integration: go to {% my integration domain="neosol" title="**Settings** > **Devices & services** > **Profalux Neosol**" %}, open the three dots menu {% icon "mdi:dots-vertical" %}, then select **Reload**.
- If it isn't paired, disable the integration first from the same menu, because Home Assistant keeps the dongle's serial port open and the dongle accepts a single connection at a time. Pair the shutter outside Home Assistant with the Calyps'HOME box, then enable the integration again.

### A shutter doesn't move

The shutters never report back, so Home Assistant can't tell a command that arrived from one that didn't. If a shutter ignores Home Assistant but still obeys its own remote:

1. Move the dongle closer to the shutter, or away from metal enclosures and other 868 MHz transmitters.
2. Check that the shutter is powered.
3. Make sure the shutter is paired with the dongle channel using your Calyps'HOME box. A channel whose pairing failed still shows up as a shutter, because the dongle can't tell the difference.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

Removing the integration doesn't unpair the shutters from the dongle. They keep working with their own remotes, and setting the integration up again brings them all back.
