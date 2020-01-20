---
title: "Headers & Footers for Lovelace cards"
description: "Decorate your Lovelace cards with header and footer widgets."
---

Some Lovelace cards have support for header and footer widgets. These widgets fill up the whole available space in a card.

## Picture header & footer

Show a picture as a header or a footer. Picture can have touch actions assocated with it.

```yaml
type: picture
image: 'https://le-reve.com/wp-content/uploads/Balloons_Banner.png'
```

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
      description: "Action to perform (`more-info`, `toggle`, `call-service`, `navigate`, `url`, `none`)"
      type: string
      default: "`toggle`"
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
double_tap_action:
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
