---
title: Anova Sous Vide
description: Instructions on how to integrate Anova Wi-Fi Sous Vide into home assistant.
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_release: 2023.2
ha_codeowners:
  - '@Lash-L'
ha_domain: anova_sous_vide
ha_integration_type: integration
---

The Anova Sous Vide sensor platform allows you to control [Anova](https://anovaculinary.com/pages/find-your-anova-precision-cooker) sous vides with Wi-Fi capability.

Supported devices (tested):

- [Anova Precision Cooker](https://anovaculinary.com/products/anova-precision-cooker)

Supported devices (untested):

- [Anova Precision Cooker Pro](https://anovaculinary.com/products/anova-precision-cooker-pro)
- [(Anova)RED Precision Cooker](https://anovaculinary.com/products/anova-red-precision-cooker)
- [(Anova)RED Precision Cooker Pro](https://anovaculinary.com/products/anova-red-precision-cooker)

The 'nano' versions of the sous vide are not supported, but as long as your app is connected to the sous vide, the data should update. They would be better served using BLE instead of API calls.

To add this platform to your installation, You will need your device id.

You can find the Device id by connecting your sous vide to the app, Then going Profile -> Settings(Gear Icon) -> Connection -> Cooker Details.

{% include integrations/config_flow.md %}

## Sensor

- Cook Time - How long the sous vide has been cooking in seconds
- Mode - The current mode of the sous vide ("Idle", "Cook", "Low water").
- State - The current state of the sous vide ("Preheating", "Cooking", "Maintaining").
- Target Temperature - The temperature the sous vide is set to heat to.
- Cook Time Remaining - How long is left in the cook in seconds.
- Firmware Version - The firmware the sous vide is operating off of.
- Heater Temperature - The current temperature of the heater.
- Triac Temperature - The current temperature of the triac.
- Water Temperature - The current temperature of the water.
