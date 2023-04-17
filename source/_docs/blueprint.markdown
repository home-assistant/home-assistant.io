---
title: "Creating blueprints"
description: "Documentation on how to get started creating blueprints."
---

<div class='note'>

If you're looking on how to use blueprints, see the [automation documentation](/docs/automation/using_blueprints/).

</div>

<div class='note'>

While the tutorial only shows how to create an automation blueprint, scripts also support blueprints in the same way.

</div>

A blueprint is a script or automation configuration with certain parts marked as configurable. This allows users to create multiple scripts or automations based on the same blueprint, with each having its own configuration.

Imagine a blueprint that controls a light based on motion, that allows you to configure the motion sensor to trigger on, and the light to control. It is now possible to create two automations that each have their own configuration for this blueprint and that act completely independent, yet are based on the same automation configuration.

<div class='note'>

This is an advanced feature and requires knowledge of writing [automations](/docs/automation/yaml/) and [scripts](/docs/scripts/) in YAML.

</div>

### [Tutorial: Create an automation blueprint &raquo;](/docs/blueprint/tutorial/)
