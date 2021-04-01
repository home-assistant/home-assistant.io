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
header:
  type: picture
  image: "https://www.home-assistant.io/images/lovelace/header-footer/balloons-header.png"
```

{% configuration header-footer %}
type:
  required: true
  description: "`picture`"
  type: string
image:
  required: true
  description: The URL of an image.
  type: string
tap_action:
  required: false
  description: Action taken on card tap. See [action documentation](/lovelace/actions/#tap-action).
  type: map
hold_action:
  required: false
  description: Action to take on tap-and-hold. See [action documentation](/lovelace/actions/#hold-action).
  type: map
double_tap_action:
  required: false
  description: Action to take on double tap. See [action documentation](/lovelace/actions/#double-tap-action).
  type: map
{% endconfiguration %}

## Buttons header & footer

Widget to show entities as buttons in the header or footer.

```yaml
footer:
  type: buttons
  entities:
    - script.launch_confetti
    - entity: script.swirl_lights
      icon: "mdi:track-light"
    - entity: script.run_siren
      icon: "mdi:alarm-light"
```

{% configuration header-footer %}
entities:
  required: true
  description: A list of entities to show. Each entry is either an entity ID or a map.
  type: list
  keys:
    entity:
      required: true
      description: The entity ID to render.
      type: string
    icon:
      required: false
      description: Override the entity icon. You can use any icon from [MaterialDesignIcons.com](http://materialdesignicons.com). Prefix the icon name with `mdi:`, ie `mdi:home`.
      type: string
    show_icon:
      required: false
      description: If false, the icon is not shown.
      type: boolean
      default: "true"
    image:
      required: false
      description: Override the entity image.
      type: string
    name:
      required: false
      description: Label for the button.
      type: string
{% endconfiguration %}

## Graph header & footer

Widget to show an entity in the sensor domain as a graph in the header or footer.

<p class='img'><img src='/images/lovelace/header-footer/graph.png' alt="Screenshot of an entities card with a graph footer.">
Screenshot of an entities card with a graph footer.
</p>

```yaml
footer:
  type: graph
  entity: sensor.outside_temperature
  hours_to_show: 24
  detail: 1
```

{% configuration header-footer %}
entity:
  required: true
  description: Entity ID of `sensor` domain.
  type: string
detail:
  required: false
  description: "Detail level of the graph: `1` or `2` (`1` = one point/hour, `2` = six points/hour)"
  type: integer
  default: 1
hours_to_show:
  required: false
  description: Hours to show in graph
  type: integer
  default: 24
{% endconfiguration %}
