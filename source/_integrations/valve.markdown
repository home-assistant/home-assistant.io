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

The device class tells Home Assistant what flows through a valve, such as water or gas.

The device class makes a difference in the following places:

- Icon: A gas valve shows {% icon "mdi:meter-gas" %} in every state. Other valves show {% icon "mdi:valve-open" %} when open and {% icon "mdi:valve-closed" %} when closed.
- History and Activity: If you have valves with different device classes, the **Type** filter in the [History](/dashboards/dashboards/#history-dashboard) and [Activity](/dashboards/dashboards/#activity-dashboard) dashboards lists each device class separately.

The integration that provides the valve sets the device class.

### List of available device classes

Each item shows the name you see in the Home Assistant interface, followed by the device class as Home Assistant stores it.

- {% icon "mdi:valve-open" %} No device class: A generic valve.
- {% icon "mdi:valve-open" %} **Water** (`water`): A valve that controls the flow of water through a system.
- {% icon "mdi:meter-gas" %} **Gas** (`gas`): A valve that controls the flow of gas through a system.

In templates, the device class is the `device_class` attribute of the entity. Use the stored value, such as `gas`. For example, you can [find entities by device class](/docs/templating/patterns/#finding-entities-by-device-class).

{% include integrations/triggers.md %}

{% include integrations/conditions.md %}

{% include integrations/actions.md %}
