---
layout: page
title: "Cloud"
description: "Enable the Home Assistant Cloud integration."
date: 2017-11-17 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_release: 0.60
ha_category: Voice
ha_iot_class: "Cloud Push"
---

The Home Assistant Cloud allows you to quickly integrate your local instance with various cloud services. Any processing of services from other cloud services is handled by your local instance.

To get started, create an account and log in via the configuration panel in your Home Assistant instance. There is no need to configure your router or expose your instance to the internet in any other way.

### {% linkable_title Amazon Alexa %}

The Alexa integration allows users to control the entities via the [Home Assistant Smart Home skill for Alexa][alexa skill]. This means that you can say things like "Alexa, turn on the kitchen light" to control your local instance.

```yaml
# Example configuration.yaml entry configuring Alexa
cloud:
  alexa:
    filter:
      include_entities:
        - light.kitchen
      include_domains:
        - switch
      exclude_entities:
        - light.living_room
      exclude_domains:
        - script
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
{% endconfiguration %}

### {% linkable_title Possible values for customize %}

| Attribute | Description |
| --------- | ----------- |
| `alexa_hidden` | Hide the entity from the Alexa smart home devices.
| `alexa_name` | Defines name of the entity for a Alexa smart home device. Useful if you have an entity with a friendly name in a local language that you want to access using an English sounding name.
| `alexa_description` | The description of the device in the Alexa smart home device list.
| `alexa_display_categories` | Set displayCategories, useful for things like media_player (TV/SPEAKERS) or scene (ACTIVITY_TRIGGER/SCENE_TRIGGER). More info can be found [here](https://developer.amazon.com/docs/device-apis/alexa-discovery.html#display-categories).

### {% linkable_title Available domains %}
Currently, the following domains are available to be used with Alexa:
- alert
- automation
- cover
- light
- fan (supports on/off and set speed)
- group
- lock (lock and unlock, but unlock is untested as Amazon has disabled unlock for now)
- media_player (play, pause, stop, set volume, adjust volume, next track and previous track)
- scene
- switch

[alexa skill]: https://alexa.amazon.com/spa/index.html#skills/dp/B0772J1QKB/?ref=skill_dsk_skb_sr_2
