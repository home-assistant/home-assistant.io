---
title: Keymitt MicroBot Push
description: Instructions on how to set up the MicroBot Push.
ha_category:
  - Switch
ha_release: '2022.10'
ha_iot_class: Assumed State
ha_codeowners:
  - '@spycle'
ha_domain: keymitt_ble
ha_bluetooth: true
ha_platforms:
  - switch
ha_config_flow: true
ha_integration_type: device
---

This {% term integration %} allows you to locally control a MicroBot Push (previously manufactured by Naran but now under the Keymitt brand).

### Prerequisites

To use this integration, it is required to have working [Bluetooth](/integrations/bluetooth) set up on the device running Home Assistant. A Naran/Keymitt hub is not required.

The device will need to be in pairing mode before adding to Home Assistant. To reset the MicroBot Push, turn it off, then back on, and immediately hold the push button while the LED is red. After approximately 5 seconds, the LED will flash rapidly, at which point release the button. The LED will blink blue if the pairing mode has been successfully activated.

If you have multiple devices, you will need to know the BTLE MAC address of your device to tell them apart.

The devices cannot remain paired to the MicroBot application for this integration to function. They will be paired to Home Assistant exclusively.

{% include integrations/config_flow.md %}

### Supported devices

This Integration is for the MicroBot Push only. The Keymitt lock is not supported.

{% include integrations/actions.md %}

### Error codes and troubleshooting

The integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

Due to the device going into deep sleep after extended periods of no activity, the response time can be up to a minute in extreme cases. On average it will be much quicker.

{% details "Failed to pair" %}
Make sure your devices are powered on, in range, and in pairing mode. Pressing the button on the MicroBot Push to take it out of deep sleep may also be beneficial.
{% enddetails %}

{% details "No unconfigured devices found" %}
Make sure your devices are powered on, in range, and in pairing mode. Pressing the button on the MicroBot Push to take it out of deep sleep may also be beneficial.
{% enddetails %}
