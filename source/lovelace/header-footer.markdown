---
title: "Headers & Footers for Lovelace cards"
description: "Decorate your Lovelace cards with header and footer widgets."
---

Some Lovelace cards have support for header and footer widgets. These widgets fill up the whole available space in a card.

<p class='img'><img src='/images/lovelace/header-footer/screenshot-picture-buttons.png' alt="Screenshot of an entities card with a picture header.">
Screenshot of an entities card with a picture header and buttons footer.
</p>

## Picture header & footer

Widget to show a picture as a header or a footer. A picture can have touch actions associated with it.

```yaml
type: picture
image: 'https://www.home-assistant.io/images/lovelace/header-footer/balloons-header.png'
```

{% configuration header-footer %}
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
  description: Action to take on tap.
  type: map
hold_action:
  required: false
  description: Action to take on tap-and-hold
  type: map
double_tap_action:
  required: false
  description: Action to take on double tap
  type: map
{% endconfiguration %}

## Buttons header & footer

Widget to show entities as buttons in the header or footer.

```yaml
type: buttons
entities:
  - script.launch_confetti
  - entity: script.swirl_lights
    icon: 'mdi:track-light'
  - entity: script.run_siren
    icon: 'mdi:alarm-light'
```

{% configuration header-footer %}
entities:
  required: true
  description: A list of entities to show. Each entry is either an entity ID or a map.
  type: list
  keys:
    entity:
      required: true
      description: The entity to render.
      type: string
    icon:
      required: false
      description: Override the entity icon.
      type: string
    image:
      required: false
      description: Override the entity image.
      type: string
{% endconfiguration %}
