---
type: card
title: "Alarm Panel Card"
sidebar_label: Alarm Panel
description: "The Alarm Panel card allows you to arm and disarm your alarm control panel integrations."
---

The Alarm Panel card allows you to arm and disarm your [alarm control panel](/integrations/#alarm) integrations.

<p class='img'>
<img src='/images/dashboards/alarm_panel_card.gif' alt='Screenshot of the alarm panel card'>
Screenshot of the Alarm Panel card.
</p>

To add the Alarm Panel card to your user interface, click the menu (three dots at the top right of the screen) and then **Edit Dashboard**. Click the "Add Card" button in the bottom right corner and select **Alarm Panel** from the card picker. All options for this card can be configured via the user interface.

Alternatively, the card can be configured using YAML:

```yaml
type: alarm-panel
entity: alarm_control_panel.alarm
```

{% configuration %}
type:
  required: true
  description: "`alarm-panel`"
  type: string
entity:
  required: true
  description: Entity ID of `alarm_control_panel` domain.
  type: string
name:
  required: false
  description: Overwrites friendly name.
  type: string
  default: Current state of the alarm entity.
states:
  required: false
  description: Controls which states to have available.
  type: list
  default: "`arm_home, arm_away`"
  keys:
    arm_home:
      description: Arm Home
    arm_away:
      description: Arm Away
    arm_night:
      description: Arm Night
    arm_custom_bypass:
      description: Arm Custom Bypass
theme:
  required: false
  description: Override the used theme for this card with any loaded theme. For more information about themes, see the [frontend documentation](/integrations/frontend/).
  type: string
{% endconfiguration %}

## Examples

Title example:

```yaml
- type: alarm-panel
  name: House Alarm
  entity: alarm_control_panel.alarm
```

<p class='img'>
<img src='/images/dashboards/alarm_panel_title_card.gif' alt='Screenshot of the alarm panel card'>
Screenshot of the Alarm Panel card.
</p>

Define the state list:

```yaml
type: alarm-panel
name: House Alarm
entity: alarm_control_panel.alarm
states:
  - arm_home
  - arm_away
  - arm_night
  - armed_custom_bypass
```
