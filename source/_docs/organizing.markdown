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
  - docs: /integrations/group/
    title: Group integration
---

Once you have more devices, you may want to target entire groups of devices in automations. It also becomes more challenging to find items in lists.

There are a few tools to group your assets: [Areas](#area), [floors](#floor), [labels](#labels), [categories](#category) and [group integration](#group-integration).

| Taxonomy          | Automation target                | Entity can have multiple         |
| ----------------- | -------------------------------- | -------------------------------- |
| Area              | {% icon "openmoji:check-mark" %} | {% icon "openmoji:cross-mark" %} |
| Floor             | {% icon "openmoji:check-mark" %} | {% icon "openmoji:cross-mark" %} |
| Label             | {% icon "openmoji:check-mark" %} | {% icon "openmoji:check-mark" %} |
| Category          | {% icon "openmoji:cross-mark" %} | {% icon "openmoji:cross-mark" %} |
| Group integration | {% icon "openmoji:check-mark" %} | {% icon "openmoji:check-mark" %} |

This means a light entity for example can only be in one area and one floor, but it can have multiple labels and be in multiple groups. If a device is assigned to an area, its entities inherit that area. However, you can also assign an entity to an area directly, which overrides the area for that specific entity. For example, you could have a smart plug device in the living room area (with the sensor entities), but assign one of its entities (the on/off switch for example) to the kitchen area.

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

## Group Integration

- Designed to combine multiple entities into one entity representing the group.
- The combined entity can also have an area and labels.
- An entity can be a member of multiple groups.
- Can be used in automations and scripts as a target for actions.
- Does not assist with organizing entities in the UI like the other methods above. For example, you cannot use group integration to sort or filter other entities.
