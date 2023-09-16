---
title: To-do Lists
description: Instructions on how to use To-do Lists within Home Assistant.
ha_domain: todo
ha_release: 2023.10
ha_category:
  - To-do List
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

The To-do List integration provides todo list entities, allowing other integrations
to integrate To-do Lists into Home Assistant. To-do lists are shown on the To-do list
dashboard for tracking items and whether or not they have been completed.

<div class='note'>

To-do List entities are here to be consumed and provided by other integrations.

This page, therefore, does not provide instructions on how to create To-do
entities. Please see the ["To-do List" category](/integrations/#to-do-list) on the
integrations page to find integrations offering To-do List entities.

</div>

## Viewing and managing To-do lists

Each To-do list is represented as its own entity in Home Assistant and can be
viewed and managed on a to-do list dashboard. You can find the to-do list dashboard
in the main sidebar of your Home Assistant instance.

## The state of an To-do List entity

The state of a To-do List entity is a number, which represents the number of
incomplete items in the list.