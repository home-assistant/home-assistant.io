---
title: "Entities and domains"
description: "Describes what entities and domains are in Home Assistant."
related:
  - docs: /docs/configuration/state_object/
    title: State object, entity state
---

Your {% term devices %} are represented in Home Assistant as entities. Entities are the basic building blocks to hold data in Home Assistant. An entity represents a {% term sensor %}, actor, or function in Home Assistant. Entities are used to monitor physical properties or to control other entities. An term entity is usually part of a {% term device %} or a {% term service %}. Entities have [states](/docs/configuration/state_object/) and [attributes](#entity-attributes).

All your entities are listed in the entities table, under {% my entities title="**Settings** > **Devices & services** > **Entities**" %}.

<p class='img'><img src='/images/getting-started/entities.png' style='border: 0;box-shadow: none;' alt="Screenshot showing the Entities table">Screenshot of the Entities table. Each line represents an entity.</p>

## Entity attributes

Many entities have attributes. There are a few attributes that are used by Home Assistant for representing the entity in a specific way. Each integration will also have its own attributes to represent extra state data about the entity. For example, the light integration has attributes for the current brightness and color of the light. When an attribute is not available, Home Assistant will not write it to the state. The list of available attributes depends on the {% term device %}.

<p class='img'>
  <img src='/images/integrations/light/state_light.png' alt='Screenshot showing three lights with different states and attributes'>
  Example showing three lights with differents states and different attributes.
</p>

For more information on entity attributes, refer to the [attributes](/docs/configuration/state_object/#attributes) section on the state objects page.

## Domains

Each integration in Home Assistant has a unique identifier: a domain. All of the entities and actions available in Home Assistant are provided by integrations and thus belong to such a domain. The first part of the entity or action, before the . shows the domain they belong to. For example `light.bed_light` is an entity in the light domain. `bed_light` is the name of the entity.

The domain provides entities, services, and other functionality that other integrations can use. For example, IKEA and Philips Hue both use the light integration. This is why the look and feel and behavior is similar in Home Assistant.

The following integrations are used as domains. The list is not complete, but these are the most common ones. The integrations listed below are also referred to as *building block integrations* or *entity integrations*:

<ul>
{%- for integration in site.integrations %}

    {%- if integration.ha_integration_type == "entity" %}
        {%- assign name = integration.title -%}
        {%- assign target = integration.ha_domain | prepend: "/integrations/" -%}

        <li><a href="{{target}}">{{name}}</a></li>

    {%- endif -%}
{%- endfor %}

</ul>
