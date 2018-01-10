---
layout: page
title: "Google Assistant via Home Assistant Cloud"
description: "Enable the Google Assistant via Home Assistant Cloud integration."
date: 2017-11-17 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_release: 0.61
ha_category: Cloud
ha_iot_class: "Cloud Push"
published: true
---

The Google Assistant integration allows users to control the entities via the Home Assistant Smart Home skill for Google Assistant. This means that you can say things like "Ok Google, turn on the kitchen light" to control your local Home Assistant.

To use this integration you need to have:

 - The cloud component set up. [Learn more](/components/cloud/)
 - A Google Assistant enabled device like the Google Home
 - Activated the Home Assistant Smart Home skill for Google Assistant

You can use `configuration.yaml` to configure the entities that are being shown to Google Assistant and how they are exposed.

```yaml
# Example configuration.yaml entry configuring Google Assistant
cloud:
  google_actions:
    filter:
      include_entities:
        - light.kitchen
        - light.kitchen_left
      include_domains:
        - switch
      exclude_entities:
        - switch.outside
    entity_config:
      switch.kitchen:
        name: Custom Name for Alexa
        aliases:
         - bright lights
         - entry lights
        type: 'action.devices.types.LIGHT'
```

{% configuration %}
google_actions:
  description: Configuration options for the Google Assistant integration.
  required: false
  type: map
  keys:
    filter:
      description: Filters for entities to include/exclude from Alexa.
      required: false
      type: map
      keys:
        include_entities:
          description: Entity IDs to include.
          required: false
          type: list
        include_domains:
          description: Domains to include.
          required: false
          type: list
        exclude_entities:
          description: Entity IDs to exclude.
          required: false
          type: list
        exclude_domains:
          description: Domains to exclude.
          required: false
          type: list
    entity_config:
      description: Entity specific configuration for Google Assistant
      required: false
      type: map
      keys:
        '`<ENTITY_ID>`':
          description: Entity to configure
          required: false
          type: map
          keys:
            name:
              description: Name of entity to show in Google Assistant
              required: false
              type: string
            aliases:
              description: Aliases that can also be used to refer to this entity
              required: false
              type: list
            type:
              description: Override the type of the entity in Google Assistant. [List of available types](https://developers.google.com/actions/smarthome/guides/)
              required: false
              type: string
{% endconfiguration %}

