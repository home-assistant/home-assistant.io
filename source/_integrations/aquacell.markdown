---
title: AquaCell
description: Instructions on how to integrate AquaCell with Home Assistant.
ha_category:
  - Sensor
ha_release: 2024.7
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Jordi1990'
ha_domain: aquacell
ha_platforms:
  - sensor
ha_integration_type: device
---

AquaCell is a water-softening device. The **AquaCell** {% term integration %} allows you to monitor your AquaCell device in Home Assistant.
You will need your Aquacell account information as used in the **AquaCell** app.

This integration also supports **Harvey** softeners.

{% include integrations/config_flow.md %}

<div class='note warning'>
This integration only works with <b>AquaCell</b> or <b>Harvey</b> devices which have an <b>i-Lid</b> and are configured through the 'Mijn AquaCell' or 'My Harvey' mobile app.
</div>

## Sensors

This integration provides {% term sensors %} for the following information from the AquaCell device:

- Percentage of salt remaining.
- Time remaining until 0% salt level is reached.
- iLid battery level.
- Wi-Fi signal strength.

<div class="note">
The device does not update frequently, the integration polls the information once a day from the cloud.
</div>
