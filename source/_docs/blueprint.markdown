---
title: "About blueprints"
description: "Introduction to blueprints."
related:
  - docs: /docs/blueprint/schema/
    title: About the blueprint schema
  - docs: /docs/blueprint/selectors/
    title: About the blueprint selectors
  - docs: /docs/automation/using_blueprints/
    title: Using blueprints in automations
  - docs: /docs/blueprint/tutorial/
    title: "Tutorial: Create an automation blueprint"
  - title: "Blueprint community forum"
    url: /get-blueprints
---

This section gives a high-level introduction to blueprints. To view a description of the YAML-schema used to create a valid blueprint, refer to the section [About the blueprint schema](/docs/blueprint/schema/).

## What is a blueprint?

A blueprint is a {% term script %}, {% term automation %} or [template entity](/docs/integrations/template/) configuration with certain parts marked as configurable. This allows you to create different scripts, automations or template entities based on the same blueprint.

Imagine you want to control lights based on motion. A blueprint provides the generic {% term automation %} framework, while letting you select one specific motion sensor as a {% term trigger %}, and the exact light to control. This blueprint makes it possible to create two automations. Each automation has their own configuration and act completely independently. Yet, they share some basic automation configuration so that you do not have to set this up every time.

Automations inherit from blueprints, which means that changes made to a blueprint will be reflected in all automations based on that blueprint the next time the automations are reloaded. This occurs as part of Home Assistant starting. To manually reload the automations, go to {% my server_controls title="**Developer tools** > **YAML**" %} and reload the automations.

Blueprints are shared by the community in the [blueprint community forum][blueprint-forums].

[blueprint-forums]: /get-blueprints
