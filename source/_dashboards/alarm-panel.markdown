---
type: card
title: "Alarm panel card"
sidebar_label: Alarm panel
description: "The alarm panel card allows you to arm and disarm your alarm control panel integrations."
related:
  - docs: /integrations/frontend/
    title: Themes
  - docs: /dashboards/cards/
    title: Dashboard cards
---

The alarm panel card allows you to arm and disarm your [alarm control panel](/integrations/#alarm) {% term integrations %}.

<p class='img'>
<img src='/images/dashboards/alarm_panel_card.gif' alt='Screenshot of the alarm panel card'>
Screenshot of the alarm panel card.
</p>

{% include dashboard/edit_dashboard.md %}

All options for this card can be configured via the user interface.

## YAML configuration

The following YAML options are available when you use YAML mode or just prefer to use YAML in the code editor in the UI.

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

### Examples

Title example:

```yaml
type: alarm-panel
name: House Alarm
entity: alarm_control_panel.alarm
```

<p class='img'>
<img src='/images/dashboards/alarm_panel_title_card.gif' alt='Screenshot of the alarm panel card'>
Screenshot of the alarm panel card.
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
