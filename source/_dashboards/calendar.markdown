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

The calendar card displays your {% term calendar %} {% term entities %} in a month, day, and list view (7 days).

<p class='img'>
  <img src='/images/dashboards/calendar_card.png' alt='Screenshot of the calendar card'>
  Screenshot of the calendar card.
</p>

All options for this card can be configured via the user interface.

{% include dashboard/edit_dashboard.md %}

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
show_add_event:
  required: false
  description: Show a button to create a new event. You need at least one calendar that allows you to create events.
  type: boolean
  default: false
add_event_style:
  required: false
  description: "The layout and position of the add event button within the card. Options are `header`, `below`, and `on_top`."
  type: string
  default: below
add_event_size:
  required: false
  description: "The size of the add event button. Options are `small`, `medium`, and `large`. Note that the size is ignored when the style is set to `header`."
  type: string
  default: small
{% endconfiguration %}

### Examples

```yaml
type: calendar
entities:
  - calendar.calendar_1
  - calendar.calendar_2
```
