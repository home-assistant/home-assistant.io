---
title: Homee
description: Instructions on how to setup Homee devices in Home Assistant.
ha_category:
  - Alarm
  - Binary sensor
  - Button
  - Climate
  - Cover
  - Event
  - Fan
  - Light
  - Lock
  - Number
  - Select
  - Sensor
  - Switch
  - Valve
ha_config_flow: true
ha_zeroconf: true
ha_release: 2025.2
ha_iot_class: Local Push
ha_codeowners:
  - '@Taraman17'
ha_domain: homee
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - button
  - climate
  - cover
  - diagnostics
  - event
  - fan
  - light
  - lock
  - number
  - select
  - sensor
  - siren
  - switch
  - valve
ha_integration_type: hub
ha_quality_scale: silver
---

[Homee](https://hom.ee) is a smart home system, able to integrate various protocols such as Z-Wave, Zigbee, EnOcean, and more. The Homee {% term integration %} will let you use the {% term devices %} from your Homee in Home Assistant.

## Prerequisites

You need to create a new user in your Homee app. Create a user that is only used by Home Assistant. For security reasons, it's recommended to:

- Use a strong, unique password.
- Restrict the user's permissions for what you want to do from Home Assistant.
- Do not use this account for any other purpose.

1. In your Homee app, in the top-left corner, tap the menu button.
2. On the top right of the opening menu, tap the gear {% icon "mdi:gear-outline" %} icon.
3. Choose **Manage users**.
4. Choose **Add user** and configure the desired values.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The IP Address of your Homee.
User:
  description: The username you chose in the Prerequisites.
Password:
  description: The password for that user.
{% endconfiguration_basic %}

Available devices will automatically show up in your Home Assistant installation.
New devices added to Homee will be automatically discovered after a restart of Home Assistant. This restart is only required when adding new devices, not for state updates of existing devices.

## Limitations

Changed values are reported from Homee in defined time intervals and not always in realtime. For example, while a cover moves, the position is updated only every few seconds and intermediate states may be missed by Home Assistant.

## Troubleshooting

First, see the general [Home Assistant troubleshooting guide](/docs/configuration/troubleshooting/).

The **homee** integration supports [debug logs and diagnostics](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics).

### Homee device not working as expected

Make sure, the {% term device %} works as expected in homee.
If a homee device shows up in Home Assistant, but does not work as expected or is missing {% term entities %}, open a [report](https://github.com/home-assistant/core/issues) and attach error logs and the device's {% term diagnostics %} data.

### Integration not loading or homee device not showing up in HA

Check that the homee-user, used for Home Assistant, is allowed to see the device.
If that is the case, open a [report](https://github.com/home-assistant/core/issues) and attach error logs and the diagnostic data of the {% term integration %}.

## Reconfiguration

This integration supports reconfiguration, allowing you to change the IP address, even after a device has already been set up.

### To start the reconfiguration

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the homee integration card.
2. From the list of hubs, select the one you want to reconfigure.
3. Next to the entry, select the three dots {% icon "mdi:dots-vertical" %} menu. Then, select **Reconfigure**.

## Removing the integration

This integration follows standard integration removal, and once the integration is removed, you can also remove the dedicated user from your Homee.

{% include integrations/remove_device_service.md %}
