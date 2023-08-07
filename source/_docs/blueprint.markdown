---
title: "About blueprints"
description: "Introduction to blueprints."
---

This section gives an introduction to blueprints and describes the YAML-schema used to create a valid blueprint.

## What is a blueprint?

A blueprint is a script or automation configuration with certain parts marked as configurable. This allows users to create different scripts or automations based on the same blueprint.

Imagine you want to control lights based on motion. A blueprint provides the generic automation framework, but allows you to select one specific motion sensor as a trigger, and the exact light to control. This blueprint makes it possible to create two automations. Each automation has their own configuration and act completely independently. Yet, they share some basic automation configuration so that you do not have to set this up every time.

Blueprints are shared by the community in the [blueprint community forum][blueprint-forums].

### Related information

- [About the blueprint schema](/docs/blueprint/schema/)
- [About the blueprint selectors](/docs/blueprint/selectors/)
- [Using blueprints in automations](/docs/automation/using_blueprints/)
- [Tutorial: Create an automation blueprint](/docs/blueprint/tutorial/)
- [Blueprint community forum][blueprint-forums]

[blueprint-forums]: /get-blueprints