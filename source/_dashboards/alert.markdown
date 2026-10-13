---
type: card
title: "Alert card"
sidebar_label: Alert
description: "The alert card highlights an entity that needs attention, with an optional color and pulsing background."
related:
  - docs: /dashboards/tile/
    title: Tile card
  - docs: /dashboards/cards/
    title: Dashboard cards
---

The alert card highlights an {% term entity %} that needs attention, such as a door left open, detected motion, or an armed alarm. It looks like a [tile card](/dashboards/tile/) with a colored background that can pulse to draw the eye. Below the name, it shows the state, when it last changed, and the entity's area. Select the card to open the **More info** dialog.

To show the card only when something needs attention, add a [visibility condition](/dashboards/cards/#showing-or-hiding-a-card-or-badge-conditionally) on the entity's state.

<p class='img'>
  <img src='/images/dashboards/alert_card.png' alt='Screenshot of alert cards'>
  Alert cards with red, orange, amber, and no color.
</p>

{% include dashboard/edit_dashboard.md %}

## Card settings

{% configuration_basic %}
Entity:
  description: The entity to show.
Color:
  description: The color of the icon and background. Accepts a [color token](/dashboards/tile/#available-colors) or a hex color code. With no color, the background isn't colored and the icon is gray.
Pulse:
  description: Animates the colored background. When reduced motion is turned on in your system settings, the background stays tinted instead.
{% endconfiguration_basic %}

## YAML configuration

The following YAML options are available when you use YAML mode or prefer to use YAML in the code editor in the UI.

{% configuration %}
type:
  required: true
  description: "`alert`"
  type: string
entity:
  required: true
  description: Entity ID.
  type: string
color:
  required: false
  description: The color of the icon and background. Accepts a [color token](/dashboards/tile/#available-colors) or hex color code. Set to `none`, or leave it out, for no color.
  type: string
  default: none
pulse:
  required: false
  description: Animates the colored background.
  type: boolean
  default: false
{% endconfiguration %}

## Examples

A red alert for motion in the garden:

```yaml
type: alert
entity: binary_sensor.garden_motion
color: red
```

A pulsing alert, shown only while the front door is open:

```yaml
type: alert
entity: binary_sensor.front_door
color: deep-orange
pulse: true
visibility:
  - condition: state
    entity: binary_sensor.front_door
    state: "on"
```
