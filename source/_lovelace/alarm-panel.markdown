---
title: "Alarm Panel Card"
sidebar_label: Alarm Panel
description: "The Alarm Panel card allows you to Arm and Disarm your alarm control panel integrations."
---

The Alarm Panel card allows you to Arm and Disarm your alarm control panel integrations.

<p class='img'>
<img src='/images/lovelace/lovelace_alarm_panel_card.gif' alt='Screenshot of the alarm panel card'>
Screenshot of the Alarm Panel card.
</p>

```yaml
type: alarm-panel
entity: alarm_control_panel.alarm
```

{% configuration %}
type:
  required: true
  description: alarm-panel
  type: string
entity:
  required: true
  description: "Entity ID of `alarm_control_panel` domain"
  type: string
name:
  required: false
  description: Overwrites Friendly Name
  type: string
  default: Current State of Alarm Entity
states:
  required: false
  description: Controls which states to have available
  type: list
  default: arm_home, arm_away
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
  description: "Set to any theme within `themes.yaml`"
  type: string
{% endconfiguration %}

## Examples

Title Example:

```yaml
- type: alarm-panel
  name: House Alarm
  entity: alarm_control_panel.alarm
```

<p class='img'>
<img src='/images/lovelace/lovelace_alarm_panel_title_card.gif' alt='Screenshot of the alarm panel card'>
Screenshot of the Alarm Panel card.
</p>

Define the State List:

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
