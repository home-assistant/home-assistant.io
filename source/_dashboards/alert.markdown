---
type: card
title: "Alert card"
sidebar_label: Alert
description: "The alert card highlights an entity that needs attention, with an optional color and pulsing background."
related:
  - docs: /dashboards/tile/
    title: Tile card
  - docs: /dashboards/badges/#alert-badge
    title: Alert badge
  - docs: /dashboards/cards/
    title: Dashboard cards
---

The alert card highlights an {% term entity %} that needs attention, such as a door left open, a leak, or a triggered alarm. It looks like a [tile card](/dashboards/tile/) with a colored background that can pulse to draw the eye. Below the name, it shows the state, when it last changed, and the entity's area, unless you hide the state. By default, selecting the card opens the **More info** dialog. This card supports [actions](/dashboards/actions/).

The card supports alarm control panel, binary sensor, cover, and lock entities. Its color and pulse only show while the entity is in an alert state:

- Alarm control panel: triggered
- Binary sensor: on
- Cover: open
- Lock: jammed, unlocked, or open

The rest of the time, the card uses the clear color, if you set one, and doesn't pulse. To hide the card when nothing needs attention, add a [visibility condition](/dashboards/cards/#showing-or-hiding-a-card-or-badge-conditionally) on the entity's state.

<p class='img'>
  <img src='/images/dashboards/alert_card.png' alt='Screenshot of alert cards'>
  Alert cards with red, orange, amber, and no color.
</p>

{% include dashboard/edit_dashboard.md %}

## Card settings

{% configuration_basic %}
Entity:
  description: The entity to show. Only alarm control panel, binary sensor, cover, and lock entities are supported.
Alert:
  description: The clear color while the entity isn't in an alert state, the alert color while it is (the state color by default), and whether the background pulses during an alert. Colors accept a [color token](/dashboards/tile/#available-colors) or a hex color code. With no color, the background isn't colored and the icon is gray. When reduced motion is turned on in your system settings, a pulsing background stays tinted instead.
Content:
  description: The name, icon, and layout, and whether to hide the state. These options work the same as on the [tile card](/dashboards/tile/).
Interactions:
  description: The actions to perform when you select the card. See [card actions](/dashboards/actions/).
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
  description: Entity ID of an alarm control panel, binary sensor, cover, or lock.
  type: string
name:
  required: false
  description: Overwrites friendly name. Can be a string, or a name configuration object. See [naming documentation](/dashboards/naming/).
  type: [string, map, list]
icon:
  required: false
  description: Overwrites the entity icon.
  type: string
clear_color:
  required: false
  description: The color of the icon and background when the entity isn't in an alert state. Accepts `state`, a [color token](/dashboards/tile/#available-colors), or hex color code. Set to `none` for no color.
  type: string
  default: none
alert_color:
  required: false
  description: The color of the icon and background while the entity is in an alert state. Accepts the same values as `clear_color`.
  type: string
  default: state
pulse:
  required: false
  description: Animates the colored background while the entity is in an alert state.
  type: boolean
  default: false
vertical:
  required: false
  description: Displays the icon above the name and state.
  type: boolean
  default: false
hide_state:
  required: false
  description: Hide the entity state.
  type: boolean
  default: false
tap_action:
  required: false
  description: Action taken on card tap. See [action documentation](/dashboards/actions/#tap-action). By default, it will show the "more-info" dialog.
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

## Examples

A red alert for a leak, using the default color:

```yaml
type: alert
entity: binary_sensor.kitchen_leak
```

A pulsing alert for the front door, which is green while the door is closed:

```yaml
type: alert
entity: binary_sensor.front_door
clear_color: green
alert_color: deep-orange
pulse: true
```

A pulsing alert, shown only while the front door is open:

```yaml
type: alert
entity: binary_sensor.front_door
alert_color: deep-orange
pulse: true
visibility:
  - condition: state
    entity: binary_sensor.front_door
    state: "on"
```

A vertical alert for the alarm, with its own name:

```yaml
type: alert
entity: alarm_control_panel.home
name: Alarm
vertical: true
```
