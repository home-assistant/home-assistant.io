---
title: "Grouping your assets"
description: "Grouping your assets makes it easier to find them and allows you to target groups in automations."
related:
  - docs: /docs/organizing/areas/
    title: Areas
  - docs: /docs/organizing/floors/
    title: Floors
  - docs: /docs/organizing/labels/
    title: Labels
  - docs: /docs/organizing/categories/
    title: Categories
---

Once you have more devices, you may want to target entire groups of devices in automations. It also becomes more challenging to find items in lists.

There are a few tools to group your assets: [Areas](#areas), [floors](#floors), [labels](#labels), and [categories](#categories).

| Taxonomy | Automation target                | Entity can have multiple         |
| -------- | -------------------------------- | -------------------------------- |
| Area     | {% icon "openmoji:check-mark" %} | {% icon "openmoji:cross-mark" %} |
| Floor    | {% icon "openmoji:check-mark" %} | {% icon "openmoji:cross-mark" %} |
| Label    | {% icon "openmoji:check-mark" %} | {% icon "openmoji:check-mark" %} |
| Category | {% icon "openmoji:cross-mark" %} | {% icon "openmoji:cross-mark" %} |

## Area

- Groups {% term devices %} and {% term entities %}.
- Can be assigned to one floor.
- Reflects a physical area (or room) in your home.
- Can be used in automations: Allows targeting an entire group of devices with an action. For example, turning off all the lights in the living room.

- Areas can also be used to automatically generate cards, such as the [Area card](/dashboards/area/).

## Floor

- Groups areas.
- {% term Devices %} and {% term entities %} cannot be assigned to floors, but to areas only.
- Can have multiple areas.
- Can be used in automations and scripts as a target for actions. For example, to turn off all the lights on the downstairs floor when you go to bed.

<img class="no-shadow" src='/images/organizing/floors.png' alt='Screenshots showing areas settings page, which now also shows the areas grouped by floor.'>

## Labels

- Can be assigned to areas, devices, entities, automations, scenes, scripts, and helpers.
- Can be used in automations and scripts as a target for actions.
- Labels can also be used to filter data in tables. For example, you can filter the list of devices to show only devices with the label `heavy energy usage` or turn these devices off when there is not a lot of solar energy available.

<img class="no-shadow" src='/images/organizing/labels.png' alt='Screenshots showing the new labels assigned to automations.'>

## Category

- Groups items in a table.
- Categories are unique for each table. The automations page can have different categories than the scene, scripts, or helpers settings page.

<img class="no-shadow" src='/images/organizing/categories.png' alt='Screenshots the new categories. Automations are grouped into their categories, making it easier to get an overview or to filter them.'>
