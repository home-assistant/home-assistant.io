---
title: Somfy RTS
description: Control Somfy RTS motorized covers via a 433.42 MHz radio frequency transmitter.
ha_release: 2026.7
ha_iot_class: Assumed State
ha_codeowners:
  - '@l-henke'
ha_domain: somfy_rts
ha_integration_type: device
ha_config_flow: true
ha_platforms:
  - cover
ha_category:
  - Cover
ha_quality_scale: bronze
related:
  - docs: /integrations/radio_frequency/
    title: Radio frequency integration
  - docs: /integrations/esphome/
    title: ESPHome integration
---

The **Somfy RTS** {% term integration %} lets you control Somfy RTS motorized covers, such as roller blinds and shutters, directly from Home Assistant. Commands are sent wirelessly over 433.42 MHz via a compatible radio-frequency transmitter. No cloud or internet connection required.

## Supported devices

Roller blinds and shutters with a Somfy RTS motor have been tested and are known to work.

Other Somfy RTS motorized covers—such as awnings, garage doors, and pergolas—may also work, as they all use the same Somfy RTS protocol. However, these have not been tested.

## Unsupported devices

Somfy *io* and Somfy *TaHoma* devices use different protocols and are not supported by this integration. For those, use the [Somfy](/integrations/somfy/) integration instead.

## Prerequisites

This integration requires a radio frequency transmitter that supports 433.42 MHz <abbr title="On-Off Keying">OOK</abbr> transmissions, made available to Home Assistant via the [radio frequency](/integrations/radio_frequency/) integration.

A Texas Instruments CC1101-based module connected via [ESPHome](/integrations/esphome/) has been tested and confirmed to work. Other transmitters compatible with the radio frequency integration may work as well.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Remote address:
  description: "A unique 24-bit hexadecimal address for this virtual remote, between `000001` and `FFFFFF`. You can choose any value freely. Make sure no other remote already paired to the same Somfy motor uses the same address. Each remote maintains its own rolling code counter, so two remotes sharing an address would quickly fall out of sync with the rolling code the motor expects, causing commands to be ignored."
Radio frequency transmitter:
  description: "The radio frequency transmitter to use for sending Somfy RTS commands. Only transmitters that support 433.42 MHz OOK transmissions appear in this list."
{% endconfiguration_basic %}

### Pairing with your Somfy motor

After entering the address and transmitter, the setup continues with a pairing step. This step is optional. You can skip it and pair later by reconfiguring the integration. However, it is required before Home Assistant can control the motor.

To pair the virtual remote with your Somfy motor:

1. Using a physical remote that is already paired to the motor, hold the **PROG** button until the motor jogs (makes a short up-and-down movement). The motor is now in pairing mode.
2. In the Home Assistant setup dialog, check the **Send PROG** box and select **Submit**.
3. The motor should jog again to confirm that the pairing was successful.

If you need to send PROG more than once, check the box and submit again. The step repeats until you leave **Send PROG** unchecked and submit to finish.

{% important %}
Each Somfy motor can only store a limited number of paired remotes; typically around 12. Once a remote is registered, it occupies a slot even if you do not finish the setup in Home Assistant. The only way to clear slots for addresses you no longer know is to factory reset the motor, which removes *all* paired remotes at once. Only send PROG when you are ready to complete and save the setup.
{% endimportant %}

## Supported functionality

### Covers

The integration provides a cover entity for each configured Somfy RTS remote address. The cover supports the following actions:

- **Open**: sends the Up command to the motor.
- **Close**: sends the Down command to the motor.
- **Stop**: sends the My command to the motor. Depending on your motor's settings, this either stops movement mid-way or moves the cover to a preset favorite position.

Because Somfy RTS is a one-way radio protocol, Home Assistant cannot receive any feedback from the motor. The cover state shown in Home Assistant is therefore *assumed*. It reflects the last command sent, not the motor's actual position.

## Known limitations

- **No position feedback**: The cover does not report its actual position. The state is an optimistic assumption based on the last command sent.
- **Pairing after setup**: Once the integration is set up, there is currently no way to send a PROG command from Home Assistant to pair or unpair this virtual remote from a motor. If you need to pair the remote after setup, you can do so by reconfiguring the integration entry. Full support for sending PROG at any time will be added in a future update.

## Troubleshooting

### Commands are not received by the motor

The motor does not respond to commands sent from Home Assistant. Because Somfy RTS is a one-way protocol, there is no error feedback. Commands are either received or silently ignored.

Things to check:

- Make sure the transmitter is powered and reachable from Home Assistant.
- Verify that the virtual remote is paired with the motor. If you skipped the PROG step during setup, reconfigure the integration entry to send the PROG command.
- Check that the transmitter is within range of the motor. Walls and other obstructions can reduce the effective range significantly.

### Broadlink RM4 Pro: commands may not reach the motor

The Broadlink RM4 Pro does not support the 433.42 MHz frequency that Somfy RTS requires. Commands may still reach the motor if you place the Broadlink device within 30–50 cm of the motor, but reliable operation at normal distances is not expected. For best results, use a transmitter that fully supports 433.42 MHz <abbr title="On-Off Keying">OOK</abbr> transmissions.

## Removing the integration

{% include integrations/remove_device_service.md %}

{% note %}
Removing the integration does not unpair the virtual remote from your Somfy motor. The remote slot on the motor remains occupied. If you want to free up that slot, you will need to factory reset the motor, which removes all paired remotes at once.
{% endnote %}

