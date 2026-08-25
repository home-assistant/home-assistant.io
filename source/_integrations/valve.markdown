---
title: Valve
description: Instructions on how to integrate valves into Home Assistant.
ha_category:
  - Valve
ha_release: 2024.1
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: valve
ha_integration_type: entity
related:
  - docs: /docs/configuration/customizing-devices/
    title: Customizing devices
  - docs: /dashboards/
    title: Dashboard
---

The **Valve** entity in Home Assistant provides an interface to control valves such as water, gas, or air valves.

{% include integrations/building_block_integration.md %}

## The state of a valve entity

The valve {% term entity %} can have the following states:

- **Open**: The valve is fully open.
- **Opening**: The valve is in the process of opening.
- **Closed**: The valve is fully closed.
- **Closing**: The valve is in the process of closing.
- **Stopped**: The valve has stopped moving before reaching a fully open or closed position.
- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

## Device class

{% include integrations/device_class_intro.md %}

The following device classes are supported for valves:

- **None**: Generic valve. This is the default and doesn't need to be set.
- **water**: Valve that controls the flow of water through a system.
- **gas**: Valve that controls the flow of gas through a system.

{% include integrations/triggers.md %}

{% include integrations/conditions.md %}

{% include integrations/actions.md %}
