---
title: "Entities and domains"
description: "Entities are the building blocks of Home Assistant: each device, sensor, or service appears as one or more entities, grouped by domain such as light, switch, or sensor."
related:
  - docs: /docs/configuration/state_object/
    title: State object, entity state and attributes
---

Your devices are represented in Home Assistant as entities. Entities are the basic building blocks to hold data in Home Assistant. An entity represents a {% term sensor %}, actor, or function in Home Assistant. Entities are used to monitor physical properties or to control other entities. An entity is usually part of a {% term device %} or a {% term service %}. Entities have [states](/docs/configuration/state_object/) and [state attributes](/docs/configuration/state_object/#attributes).

All your entities are listed in the entities table, under {% my entities title="**Settings** > **Devices & services** > **Entities**" %}.

<p class='img'><img src='/images/getting-started/entities.png' style='border: 0;box-shadow: none;' alt="Screenshot showing the Entities table">Screenshot of the Entities table. Each line represents an entity.</p>

## Recently removed devices and entities

When you delete a device or entity, Home Assistant remembers its settings. For a device, these are its name, area, and labels. For an entity, these are its name, area, labels, and entity ID. If the device or entity is found again, for example after pairing the device again, these settings come back.

To see what Home Assistant remembers, you need an administrator account:

1. Go to {% my devices title="**Settings** > **Devices & services** > **Devices**" %} or {% my entities title="**Entities**" %}.
2. In the top right corner, select the three dots {% icon "mdi:dots-vertical" %} menu, then select **Recently removed**.
3. To get a device or entity back, next to it, select the three dots {% icon "mdi:dots-vertical" %} menu:
   - If its integration is still installed, select **Reload integration** to look for it again.
   - If its integration was deleted, select **Add integration** to set it up again.
4. To start fresh instead, in the same menu, select **Forget**.
   - The next time the device or entity is added, it gets the default name and no area or labels. An entity also gets a new entity ID.
   - Forgetting a device also forgets its removed entities. Entities removed before the **Recently removed** list was added are not included. Forget them separately.

When you delete an integration, Home Assistant keeps the settings of its devices and entities for 30 days.

## Domains

Each integration in Home Assistant has a unique identifier: a domain. All entities and actions available in Home Assistant are provided by integrations and thus belong to such a domain. The first part of the entity or action, before the `.` shows the domain they belong to. For example, `light.bed_light` is an entity in the light domain. `bed_light` is the ID of the entity.

The domain provides entities, services, and other functionality that other integrations can use. For example, IKEA and Philips Hue both use functionalities provided by the light integration. This is why the look and feel and behavior is similar in Home Assistant.

There are different types of domains: integration domains and entity domains:

- Integration domains provide functionality primarily for itself: examples are Hue, Matter, or Zigbee.
- Entity domains don't use their own functionality as such. But they provide it for other integrations to use.

The integrations listed below are used as entity domains. They are also referred to as *building block integrations* or *entity integrations*:

<ul>
{%- for integration in site.integrations %}

    {%- if integration.ha_integration_type == "entity" %}
        {%- assign name = integration.title -%}
        {%- assign target = integration.ha_domain | prepend: "/integrations/" -%}

        <li><a href="{{target}}">{{name}}</a></li>

    {%- endif -%}
{%- endfor %}

</ul>
