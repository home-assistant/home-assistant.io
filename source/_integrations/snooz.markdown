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
- [SNOOZ Pro](https://getsnooz.com/products/snooz-pro-white-noise-machine)
- [SNOOZ Breez](https://getsnooz.com/products/snooz-breez-smart-bedroom-fan-sound-machine)


## Setup

Once a device is discovered, it needs to be put into pairing mode to complete setup.

### Entering pairing mode

1. Ensure the device is not connected to a mobile app or any other Bluetooth controller.
2. Hold your finger on the power button until all buttons begin pulsing on and off (~ 5 seconds).

<p class='img'>
  <img src='/images/integrations/snooz/pairing_mode.jpg' alt='Top down view of a SNOOZ White Noise Machine, highlighting the power button.'>
</p>

## Supported functionality

The **Snooz** integration provides the following entities.

### Fan

Devices are exposed as Fan entities with a persistent connection to the device.

Fan speed percentage is mapped to the device volume level.

{% note %}
Speed percentages less than 10 have no effect - they all map to a value of 1 on the device.
{% endnote %}

{% include integrations/actions.md %}

## Known limitations

- On all models, the integration controls only the sound (on/off and volume). The sound is exposed as a fan entity, where the fan speed sets the volume.
- On the SNOOZ Breez, the cooling fan and the night light are not supported yet.
