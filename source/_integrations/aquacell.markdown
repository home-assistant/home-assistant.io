---
title: AquaCell
description: Instructions on how to integrate AquaCell with Home Assistant.
ha_category:
  - Sensor
ha_release: 2024.8
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Jordi1990'
ha_domain: aquacell
ha_platforms:
  - sensor
ha_integration_type: device
---

AquaCell is a water softening device. The **AquaCell** integration allows you to monitor your AquaCell device in Home Assistant.
You will need your Aquacell account information as used in the **AquaCell** app.

{% include integrations/config_flow.md %}

<div class='note warning'>
This integration only works with <b>AquaCell</b> devices which have an <b>i-Lid</b> and are configured through the 'Mijn AquaCell' mobile app.
</div>

## Sensors

This integration provides {% term sensors %} for the following information from the AquaCell device:

- Percentage of salt remaining.
- Number of days until 0% salt level is reached.
- Firmware version.
- Device name.
- iLid battery level.
- Last update time.
- WiFi signal level.
- Lid presence.

<div class="note">
The device does not update frequently, the integration polls the information once a day from the cloud.
</div>