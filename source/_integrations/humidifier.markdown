---
title: Humidifier
description: Instructions on how to set up humidity control devices within Home Assistant.
ha_category:
  - Humidifier
ha_release: '0.112'
ha_domain: humidifier
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
  - '@Shulyaka'
ha_integration_type: entity
related:
  - docs: /docs/configuration/customizing-devices/
    title: Customizing devices
  - docs: /dashboards/
    title: Dashboard
---

The **Humidifier** {% term integration %} is built for the controlling and monitoring of humidifiers, dehumidifiers, and hygrostat devices.

{% include integrations/building_block_integration.md %}

## The state of a humidifier entity

The state of a humidifier entity can be either **On** or **Off**.

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

## Device class

{% include integrations/device_class_intro.md %}

The screenshot shows different text and UI for different device classes for humidifiers:

<p class='img'>
<img src='/images/screenshots/humidifier_device_class.png' />
Humidifier device classes.
</p>

The following device classes are supported for humidifiers:

- **Humidifier**: Adds humidity to the air around it.
- **Dehumidifier**: Removes humidity from the air around it.

{% include integrations/actions.md %}

{% include integrations/triggers.md %}

{% include integrations/conditions.md %}
