---
title: "Headers & Footers for dashboard cards"
description: "Decorate your dashboard cards with header and footer widgets."
related:
  - docs: /integrations/entity/
    title: Entity
  - docs: /integrations/entities/
    title: Entities
  - docs: /integrations/statistics/
    title: Statistics
  - docs: /integrations/actions/
    title: Card actions
---

Some dashboard cards have support for header and footer widgets. These widgets fill up the whole available space in a card.

<p class='img'><img src='/images/dashboards/header-footer/screenshot-picture-buttons.png' alt="Screenshot of an entities card with a picture header.">
Screenshot of an entities card with a picture header and buttons footer.
</p>

Header and footer can be used on the following cards:

- [Entity](/dashboards/entity/)
- [Entities](/dashboards/entities/)
- [Statistic](/dashboards/statistic/)

## Picture header & footer

Widget to show a picture as a header or a footer. A picture can have touch actions associated with it.

```yaml
header:
  type: picture
  image: "https://www.home-assistant.io/images/dashboards/header-footer/balloons-header.png"
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
alt_text:
  required: false
  description: Alternative text for the image. This is necessary for users of assistive technology. The [W3C images tutorial](https://www.w3.org/WAI/tutorials/images/) provides simple guidance for writing alternative text.
  type: string  
tap_action:
  required: false
  description: Action taken on card tap. See [action documentation](/dashboards/actions/#tap-action).
  type: map
hold_action:
  required: false
  description: Action taken on tap-and-hold. See [action documentation](/dashboards/actions/#hold-action).
  type: map
double_tap_action:
  required: false
  description: Action taken on double tap. See [action documentation](/dashboards/actions/#double-tap-action).
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
      description: Override the entity icon. You can use any icon from [Material Design Icons](https://pictogrammers.com/library/mdi/). Prefix the icon name with `mdi:`, ie `mdi:home`.
      type: string
    image:
      required: false
      description: Override the entity image.
      type: string
    name:
      required: false
      description: Label for the button.
      type: string
    show_icon:
      required: false
      description: Show entity icon.
      type: boolean
      default: "true"  
    show_name:
      required: false
      description: Show entity name.
      type: boolean
      default: "false"
    tap_action:
      required: false
      description: Action taken on button tap. See [action documentation](/dashboards/actions/#tap-action).
      type: map
    hold_action:
      required: false
      description: Action taken on tap-and-hold. See [action documentation](/dashboards/actions/#hold-action).
      type: map
    double_tap_action:
      required: false
      description: Action taken on double tap. See [action documentation](/dashboards/actions/#double-tap-action).
      type: map
    
{% endconfiguration %}

## Graph header & footer

Widget to show an entity in the sensor domain as a graph in the header or footer.

<p class='img'><img src='/images/dashboards/header-footer/graph.png' alt="Screenshot of an entities card with a graph footer.">
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
  description: Hours to show in graph. Minimum is 1 hour. Big values can result in delayed rendering, especially if the selected entities have a lot of state changes.
  type: integer
  default: 24
{% endconfiguration %}
