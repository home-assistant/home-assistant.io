---
title: Anova
description: Instructions on how to integrate Anova Wi-Fi Sous Vide into home assistant.
ha_category:
  - Sensor
ha_iot_class: Cloud Push
ha_config_flow: true
ha_release: 2023.5
ha_codeowners:
  - '@Lash-L'
ha_domain: anova
ha_integration_type: integration
ha_platforms:
  - sensor
---

The Anova sensor platform allows you to control [Anova](https://anovaculinary.com/pages/find-your-anova-precision-cooker) sous vides with Wi-Fi capability.

Supported devices (tested):
- AN500-10 (Anova Precision Cooker)
- AN500-US00 (Anova Precision Cooker)
- AN600-10 (Anova Precision Cooker Pro)


The 'nano' versions of the sous vide are not supported, but as long as your app is connected to the sous vide, the data should update. They would be better served using BLE instead of API calls.

To add this platform to your installation, You will need your Anova username and password, and you need to have at least one sous vide connected to your account.

{% include integrations/config_flow.md %}

## Sensor

- Cook Time - How long the sous vide has been cooking in seconds
- Mode - The current mode of the sous vide ("Idle", "Cook", "Low water").
- State - The current state of the sous vide ("Preheating", "Cooking", "Maintaining").
- Target Temperature - The temperature the sous vide is set to heat to.
- Cook Time Remaining - How long is left in the cook in seconds.
- Heater Temperature - The current temperature of the heater.
- Triac Temperature - The current temperature of the triac.
- Water Temperature - The current temperature of the water.
