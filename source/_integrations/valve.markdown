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

## Valve states

A valve {% term entity %} can have the following states. Each item shows the label you see in the Home Assistant interface, followed by the state as Home Assistant stores it. If you write templates or edit automations in YAML, use the stored state.

- **Open** (`open`): The valve is open. A valve that reports its position is open at any position above 0.
- **Opening** (`opening`): The valve is in the process of opening.
- **Closed** (`closed`): The valve is fully closed.
- **Closing** (`closing`): The valve is in the process of closing.
- **Unavailable** (`unavailable`): The entity is currently unavailable.
- **Unknown** (`unknown`): The state is not yet known.

## Device class

{% include integrations/device_class_intro.md %}

The following device classes are supported for valves:

- **None**: Generic valve. This is the default and doesn't need to be set.
- **water**: Valve that controls the flow of water through a system.
- **gas**: Valve that controls the flow of gas through a system.

{% include integrations/triggers.md %}

{% include integrations/conditions.md %}

{% include integrations/actions.md %}
