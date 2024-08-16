---
type: card
title: "Calendar card"
sidebar_label: Calendar
description: "The calendar card displays your calendar entities in a month, day and list view"
related:
  - docs: /integrations/frontend/
    title: Themes
  - docs: /dashboards/cards/
    title: Dashboard cards
---

The calendar card displays your [calendar](/integrations/#calendar) {% term entities %} in a month, day, and list view (7 days).

<p class='img'>
  <img src='/images/dashboards/calendar_card.png' alt='Screenshot of the 
  calendar card'>
  Screenshot of the calendar card.
</p>

{% include dashboard/edit_dashboard.md %}

All options for this card can be configured via the user interface.

## YAML configuration

The following YAML options are available when you use YAML mode or just prefer to use YAML in the code editor in the UI.

{% configuration %}
type:
  required: true
  description: "`calendar`"
  type: string
title:
  required: false
  description: The title of the card.
  type: string
initial_view:
  required: false
  description: "The view that will show first when the card is loaded onto the page. Options are `dayGridMonth`, `dayGridDay`, and `listWeek`. Note that `listWeek` does show the next 7 days, not a calendar week."
  type: string
entities:
  required: true
  description: A list of calendar entities that will be displayed in the card.
  type: list
theme:
  required: false
  description: Override the used theme for this card with any loaded theme. For more information about themes, see the [frontend documentation](/integrations/frontend/).
  type: string
{% endconfiguration %}

### Examples

```yaml
type: calendar
entities:
  - calendar.calendar_1
  - calendar.calendar_2
```
