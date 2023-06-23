---
title: Integration - Battery Sim
description: Instructions on how to integrate Battery Sim into Home Assistant.
ha_category:
  - Energy
  - Sensor
  - Utility
ha_release: 2023.1.4
ha_iot_class: Local Push
ha_codeowners:
  - '@hif2k1'
ha_domain: battery_sim
ha_config_flow: true
ha_platforms:
  - sensor
  - button
ha_integration_type: entity
---

This integration provides a realtime simulation of a home enrgy solution such as a home battery. 
This is most useful for homes with solar panels where a battery can increase the amount of energy saved and used locally.
However, home batteries are also increasingly useful as energy companies develop tarrifs that vary through the day depending on the predicted demand. 
Home batteries are expensive so it is important to assess if it will be worth it and this integration extimates how much money and energy can be saved.


To use the integration you will need an energy meter that monitors energy enterning (import) and leaving (export) the home. 
The integration sensors are updated when your energy meter readings update. 

You can create multiple batteries to simulate different options. You can also integrate the battery into the home energy dashboard, 
but only one battery can readily be added in this way.

{% include integrations/config_flow.md %}
{% configuration_basic %}
Battery Model:
  description: There are many options for home batteries - select the one you want to try or create a custom battery.
Custom settings:
  description: If you do make a custom battery you can add the name the battery should have, the size, efficiency and the maximum charging and discharging rates.
Import Meter:
  description: The entity showing the energy entering (imported) to the home.
Export Meter:
  description: The entity showing the energy leaving (exported) to the home.
Tariff:
  description: The simulation can accept either fixed tariffs or an entity that updates to track a real time tariff.
{% endconfiguration_basic %}
