---
title: Mazda Connected Services
description: Instructions on how to integrate your Connected Services capable Mazda vehicle with Home Assistant.
ha_release: '2021.3'
ha_category:
  - Car
  - Sensor
ha_iot_class: Cloud Polling
ha_quality_scale: platinum
ha_config_flow: true
ha_codeowners:
  - '@bdr99'
ha_domain: mazda
ha_platforms:
  - sensor
---

The Mazda Connected Services integration allows you to retrieve data from a Mazda vehicle. In order to use this integration, you must first register your vehicle using the MyMazda app ([iOS](https://apps.apple.com/us/app/mymazda/id451886367)/[Android](https://play.google.com/store/apps/details?id=com.interrait.mymazda)).

This integration requires an active Mazda Connected Services subscription and a compatible vehicle. The following Mazda vehicles are Mazda Connected Services capable:

- Mazda3: 2019+
- CX-30: 2020+
- CX-9: 2021+
- CX-5: 2021+

Currently, this integration only provides the Sensor platform. The following sensors are supported:

- Fuel Percentage Remaining
- Fuel Distance Remaining
- Odometer
- Front Left Tire Pressure
- Front Right Tire Pressure
- Rear Left Tire Pressure
- Rear Right Tire Pressure

## Configuration

To enable the Mazda Connected Services integration, go to **Configuration** > **Integrations** > **Add Integration** > **Mazda Connected Services**.

Enter the same email address and password that you would use to sign into the MyMazda mobile app. Select your region, and click **Submit**.

<div class='note warning'>
    The MyMazda API only allows one active session at a time. Therefore, if you use the same account with both Home Assistant and the MyMazda mobile app, you may experience issues ("Multiple devices detected" notifications, session expired warnings, etc.) To fix this, you can create a secondary MyMazda account, and share your vehicle with the secondary account. Log in to the mobile app using the primary account and select Menu > MyMazda > My Vehicle > Drivers > Manage Drivers > Invite Driver. When finished, log into the secondary account with Home Assistant.
</div>
