---
title: "Calendar Card"
sidebar_label: Calendar
description: "The calendar card displays your calendar entities in a month, day and list view"
---

The Calendar card displays your calendar entities in a month, day and list view.

<p class='img'>
  <img src='/images/lovelace/lovelace_calendar_card.png' alt='Screenshot of the calendar card'>
  Screenshot of the calendar card.
</p>

### Card Settings

{% configuration_basic %}
Title:
  description: The title displayed at the top of the card.
Entities:
  description: The calendar entities that will be displayed in the card.
Theme:
  description: Theme your card using any installed theme in your HA environment.
{% endconfiguration_basic %}

### YAML

This is for if you use YAML mode or just prefer to use YAML in the Code Editor in the UI.

{% configuration %}
type:
  required: true
  description: calendar
  type: string
title:
  required: false
  description: The title of the card.
  type: string
entities:
  required: true
  description: A list of calendar entities that will be displayed in the card.
  type: list
theme:
  required: false
  description: "Set to any theme within `themes.yaml`"
  type: string
{% endconfiguration %}

Example:

```yaml
type: calendar
entities:
  - calendar.calendar_1
  - calendar.calendar_2
```
