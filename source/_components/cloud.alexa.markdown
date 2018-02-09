---
layout: page
title: "Alexa via Home Assistant Cloud"
description: "Enable the Alexa integration via Home Assistant Cloud integration."
date: 2017-11-17 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_release: "0.60"
ha_category: Cloud
ha_iot_class: "Cloud Push"
---

The Alexa integration allows users to control the entities via the [Home Assistant Smart Home skill for Alexa][alexa skill]. This means that you can say things like "Alexa, turn on the kitchen light" to control your local Home Assistant.

To use this integration, you need to have:

 - The cloud component set up. [Learn more](/components/cloud/)
 - An Alexa enabled device like the Amazon Echo
 - Activated the [Home Assistant Smart Home skill for Alexa][alexa skill]

<p class='note warning'>Only Amazon US is currently supported. Other regions are being certified.</p>

You can use `configuration.yaml` to configure the entities that are being shown to Alexa and how they are exposed.

```yaml
# Example configuration.yaml entry configuring Alexa
cloud:
  alexa:
    filter:
      include_entities:
        - light.kitchen
        - light.kitchen_left
      include_domains:
        - switch
      exclude_entities:
        - switch.outside
    entity_config:
      light.kitchen:
        name: Custom Name for Alexa
        description: The light in the kitchen
      switch.stairs:
        display_categories: LIGHT
```

{% configuration %}
alexa:
  description: Configuration options for the Amazon Alexa integration.
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
      description: Entity specific configuration for Alexa
      required: false
      type: map
      keys:
        '`<ENTITY_ID>`':
          description: Entity to configure
          required: false
          type: map
          keys:
            name:
              description: Name of entity to show in Alexa
              required: false
              type: string
            description:
              description: Description of entity to show in Alexa
              required: false
              type: string
            display_categories:
              description: The display category to use in Alexa. [Available categories](https://developer.amazon.com/docs/device-apis/alexa-discovery.html#display-categories)
              required: false
              type: string
{% endconfiguration %}

### {% linkable_title Possible values for customizing %}

_Configuration via `customize:` is no longer available. Use the entity config as described above._

### {% linkable_title Available domains %}
Currently, the following domains are available to be used with Alexa:

- alert
- automation (enables/disables)
- cover
- fan (supports on/off and set speed)
- group
- input_boolean
- light
- lock (lock and unlock, but unlock is untested as Amazon has disabled unlock for now)
- media_player (play, pause, stop, set volume, adjust volume, next track, and previous track)
- scene
- script (enables/disables)
- switch

[alexa skill]: https://alexa.amazon.com/spa/index.html#skills/dp/B0772J1QKB/?ref=skill_dsk_skb_sr_2
