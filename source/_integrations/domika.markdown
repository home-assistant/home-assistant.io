---
title: Domika
description: Domika integration allows Domika mobile apps to communicate with your Home Assistance.
ha_category:
  - Other
ha_release: 2024.9.1
ha_config_flow: true
ha_quality_scale: "No score"
ha_codeowners:
  - "@bealex"
  - "@bmikle"
ha_domain: domika
ha_iot_class: "Local Push"
ha_integration_type: integration
---

Domika integration allows Domika mobile apps to communicate with your Home Assistance and is required for Domika mobile applications to work.

{% include integrations/config_flow.md %}

{% include integrations/option_flow.md %}

## Understanding Critical Push Notifications

Domika can send critical push notifications to any mobile device that has the Domika app installed and connected to your home. These notifications can bypass Sleep and Do Not Disturb modes, so they can be disruptive. By default, Domika doesn’t send any critical notifications — you’ll need to enable them in Domika configuration. You can choose to activate critical notifications for all binary sensors of specific types (Smoke, Moisture, CO, or Gas), or you can manually add other binary sensors. Keep in mind, all users with the Domika app installed and connected to your home will receive these critical notifications unless they’ve disabled them in their phone’s system settings.

## Domika Documentation

- [FAQ and Contacts](https://domika.app/help/)
