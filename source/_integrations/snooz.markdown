---
description: Instructions on how to integrate SNOOZ devices into Home Assistant.
ha_release: '2022.11'
ha_domain: snooz
---

Integrates [SNOOZ](https://getsnooz.com/) devices into Home Assistant.

{% include integrations/config_flow.md %}

The SNOOZ integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

## Supported devices

- [SNOOZ White Noise Machine](https://getsnooz.com/products/snooz-white-noise-machine)

## Setup

Once a device is discovered, it needs to be put into pairing mode to complete setup.

### Entering pairing mode

1. Ensure the device is not connected to a mobile app or any other Bluetooth controller.
2. Hold your finger on the power button until all buttons begin pulsing on and off (~ 5 seconds).

<p class='img'>
  <img src='/images/integrations/snooz/pairing_mode.jpg' alt='Top down view of a SNOOZ White Noise Machine, highlighting the power button.'>
</p>

## Platforms

### Fan

Devices are exposed as Fan entities with a persistent connection to the device.

Fan speed percentage is mapped to the device volume level.

{% note %}
Speed percentages less than 10 have no effect - they all map to a value of 1 on the device.
{% endnote %}

{% include integrations/actions.md %}
