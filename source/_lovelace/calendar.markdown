---
title: "Calendar Card"
sidebar_label: Calendar
description: "The calendar card displays your calendar entities in a month, day and list view"
---

The Calendar card displays your [calendar](/integrations/#calendar) entities in a month, day and list view.

<p class='img'>
  <img src='/images/lovelace/lovelace_calendar_card.png' alt='Screenshot of the calendar card'>
  Screenshot of the Calendar card.
</p>

To add the Calendar card to your user interface, click the Lovelace menu (three dots at the top right of the screen) and then **Edit Dashboard**. Click the "Add Card" button in the bottom right corner and select **Calendar** from the card picker. All options for this card can be configured via the user interface.

## Card Settings

{% configuration_basic %}
Title:
  description: The title displayed at the top of the card.
Initial View:
  description: "The view that will show first when the card is loaded onto the page. Options are `Month View`, `Day View`, or `List View`."
Entities:
  description: The calendar entities that will be displayed in the card.
Theme:
  description: Name of any loaded theme to be used for this card. For more information about themes, see the [frontend documentation](/integrations/frontend/).
{% endconfiguration_basic %}

### YAML

This is for if you use YAML mode or just prefer to use YAML in the Code Editor in the UI.

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
  description: "The view that will show first when the card is loaded onto the page. Options are `dayGridMonth`, `dayGridDay`, and `listWeek`."
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

Example:

```yaml
type: calendar
entities:
  - calendar.calendar_1
  - calendar.calendar_2
```
