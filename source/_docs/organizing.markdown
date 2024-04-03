---
title: "Organizing your assets"
description: "Organizing and grouping your assets makes it easier to find them and allows you target groups in automations."
---

When you start to have more devices in Home Assistant, you may want to target entire groups of devices in automations. It also becomes more challenging to find items in lists. There are a few tools to organize your assets.

## Areas

An area in Home Assistant is a logical grouping of {% term devices %} and {% term entities %} that are meant to match areas (or rooms) in the physical world: your home. For example, the `living room` area groups devices and entities in your living room. Areas allow you to target service calls at an entire group of devices. For example, turning off all the lights in the living room.
Locations within your home such as living room, dance floor, etc. Areas can be assigned to {% term floors %}.
Areas can also be used for automatically generated cards, such as the [Area card](/dashboards/area/).

## Floors

A floor in Home Assistant is a logical grouping of areas that are meant to match the physical floors in your home. {% term Devices %} and {% term entities %} are not assigned to floors but to areas. A floor has properties such as: Floor ID, name, aliases (for use in assistants), an icon, and a floor level. Some of these properties are optional. The level number can be negative to reflect floors below the basement.
Floors can be used in automations and scripts as a target for actions. For example, to turn off all the lights on the downstairs floor when you go to bed.

## Labels

Labels in Home Assistant allow grouping elements irrespective of their physical location or type. Labels can be assigned to areas, devices, entities, automations, scripts, and helpers. Labels can be used in automations and scripts as a target for actions and services. Labels can also be used to filter data. For example, you can filter the list of devices to show only devices with the label `heavy energy usage` or turn these devices off when there is not a lot of solar energy available.

## Categories

Categories allow grouping items in a table. Like labels, categories allow grouping irrespective of the items physical location. For example, on the automations page, you can create the categories “Notifications” or “NFC tags” to view your automations grouped or filtered. These categories group automations on the automation page, but have no effect anywhere else. Categories are unique for each table. The automations page can have different categories that the scene, scripts, or helpers settings page.
