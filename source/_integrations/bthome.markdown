---
description: Instructions on how to integrate BTHome BLE devices into Home Assistant.
ha_release: 2022.9
ha_domain: bthome
---

Integrates [BTHome](https://bthome.io/) BLE devices into Home Assistant.

{% include integrations/config_flow.md %}

The BTHome BLE integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

BTHome is an energy effective but flexible BLE format to broadcast data with Bluetooth and allows you to create your own DIY BLE sensors. More information about the BTHome BLE format and projects that use the format can be found on the [BTHome website](https://bthome.io/).

## Bindkey

When using encryption for your BTHome sensor, you will be prompted to enter your 32 character hexadecimal (16 bytes) encryption key. This key is called the bindkey. More information about the bindkey can be found in the [specifications](https://bthome.io/encryption).
