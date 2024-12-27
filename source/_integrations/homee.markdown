---
title: Homee
description: Instructions on how to setup Homee devices in Home Assistant.
ha_category:
  - Cover
ha_config_flow: true
ha_release: 2025.2
ha_iot_class: Local Push
ha_codeowners:
  - '@Taraman17'
ha_domain: homee
ha_platforms:
  - cover
ha_integration_type: hub
---

[Homee](https://hom.ee) is a smart home system, able to integrate various protocols such as Z-Wave, Zigbee, EnOcean, and more. The Homee {% term integration %} will let you use the {% term device devices %} from your Homee in Home Assistant.

There is currently support for the following device types in Home Assistant:

- cover

More {% term platform platforms %} will follow soon, as integration moves to core step by step.

## Prerequisites

You need to create a new user in your Homee that is only used by Home Assistant. For security reasons, it's recommended to:

- Use a strong, unique password.
- Limit the user's permissions to only what's necessary for Home Assistant.
- Do not use this account for any other purpose.

1. In your Homee app tap the menu button in the top-left corner.
2. Tap the gear wheel icon on the top right of the opening menu.
3. Choose "Manage users".
4. Choose "Add user" and configure the desired values.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The IP Address of your Homee.
User:
  description: The username you chose in the prerequisites.
Password:
  description: The password for that user.
{% endconfiguration_basic %}

Available devices will automatically show up in your Home Assistant installation.
New devices added to Homee will be automatically discovered after a restart of Home Assistant. This restart is only required when adding new devices, not for state updates of existing devices.

## Limitations

Changed values are reported from Homee in defined time intervals and not always in realtime. For example, while a cover moves, the position is updated only every few seconds and intermediate states may be missed by Home Assistant.

## Removing the integration

This integration follows standard integration removal, and once the integration is removed, you can also remove the dedicated user from your Homee.

{% include integrations/remove_device_service.md %}
