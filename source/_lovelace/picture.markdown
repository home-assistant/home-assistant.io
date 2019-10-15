---
title: "Picture Card"
sidebar_label: Picture
description: "A very simple card that allows you to set an image to use for navigation to various paths in your interface or to call a service."
---

A very simple card that allows you to set an image to use for navigation to various paths in your interface or to call a service.

<p class='img'>
<img src='/images/lovelace/lovelace_picture.png' alt='Screenshot of the picture card'>
Screenshot of the picture card.
</p>

{% configuration %}
type:
  required: true
  description: picture
  type: string
image:
  required: true
  description: The URL of an image.
  type: string
tap_action:
  required: false
  description: Action to take on tap
  type: map
  keys:
    action:
      required: true
      description: "Action to perform (`call-service`, `navigate`, `url`, `none`)"
      type: string
      default: "`none`"
    navigation_path:
      required: false
      description: "Path to navigate to (e.g. `/lovelace/0/`) when `action` defined as `navigate`"
      type: string
      default: none
    url_path:
      required: false
      description: "Path to navigate to (e.g. `https://www.home-assistant.io`) when `action` defined as `url`"
      type: string
      default: none
    service:
      required: false
      description: "Service to call (e.g. `media_player.media_play_pause`) when `action` defined as `call-service`"
      type: string
      default: none
    service_data:
      required: false
      description: "Service data to include (e.g. `entity_id: media_player.bedroom`) when `action` defined as `call-service`"
      type: string
      default: none
hold_action:
  required: false
  description: Action to take on tap-and-hold
  type: map
  keys:
    action:
      required: true
      description: "Action to perform (`call-service`, `navigate`, `url`, `none`)"
      type: string
      default: "`none`"
    navigation_path:
      required: false
      description: "Path to navigate to (e.g. `/lovelace/0/`) when `action` defined as `navigate`"
      type: string
      default: none
    url_path:
      required: false
      description: "Path to navigate to (e.g. `https://www.home-assistant.io`) when `action` defined as `url`"
      type: string
      default: none
    service:
      required: false
      description: "Service to call (e.g. `media_player.media_play_pause`) when `action` defined as `call-service`"
      type: string
      default: none
    service_data:
      required: false
      description: "Service data to include (e.g. `entity_id: media_player.bedroom`) when `action` defined as `call-service`"
      type: string
      default: none
dbltap_action:
  required: false
  description: Action to take on double tap
  type: map
  keys:
    action:
      required: true
      description: "Action to perform (`more-info`, `toggle`, `call-service`, `navigate`, `url`, `none`)"
      type: string
      default: "`more-info`"
    navigation_path:
      required: false
      description: "Path to navigate to (e.g. `/lovelace/0/`) when `action` defined as `navigate`"
      type: string
      default: none
    url_path:
      required: false
      description: "Path to navigate to (e.g. `https://www.home-assistant.io`) when `action` defined as `url`"
      type: string
      default: none
    service:
      required: false
      description: "Service to call (e.g. `media_player.media_play_pause`) when `action` defined as `call-service`"
      type: string
      default: none
    service_data:
      required: false
      description: "Service data to include (e.g. `entity_id: media_player.bedroom`) when `action` defined as `call-service`"
      type: string
      default: none
{% endconfiguration %}

## Examples

Navigate to another view:

```yaml
type: picture
image: /local/home.jpg
tap_action:
  action: navigate
  navigation_path: /lovelace/home
```

Check the [views](/lovelace/views/) setup on how to setup custom IDs.

Toggle entity using a service:

```yaml
type: picture
image: /local/light.png
service: light.toggle
service_data:
  entity_id: light.ceiling_lights
```
