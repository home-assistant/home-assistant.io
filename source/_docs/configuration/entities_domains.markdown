---
title: "Entities and domains"
description: "Describes what entities and domains are in Home Assistant."
related:
  - docs: /docs/configuration/state_object/
    title: State object, entity state and attributes
---

Your devices are represented in Home Assistant as entities. Entities are the basic building blocks to hold data in Home Assistant. An entity represents a {% term sensor %}, actor, or function in Home Assistant. Entities are used to monitor physical properties or to control other entities. An entity is usually part of a {% term device %} or a {% term service %}. Entities have [states](/docs/configuration/state_object/) and [state attributes](/docs/configuration/state_object/#about-entity-state-attributes).

All your entities are listed in the entities table, under {% my entities title="**Settings** > **Devices & services** > **Entities**" %}.

<p class='img'><img src='/images/getting-started/entities.png' style='border: 0;box-shadow: none;' alt="Screenshot showing the Entities table">Screenshot of the Entities table. Each line represents an entity.</p>

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
