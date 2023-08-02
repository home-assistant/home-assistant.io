---
title: "About blueprints"
description: "Documentation on how to get started creating blueprints."
---

This section provides an introduction on blueprints and links to a tutorial on how to create your own blueprint.

If you are looking for information on how to use blueprints, refer to the [automation documentation](/docs/automation/using_blueprints/).


<div class='note'>

While the tutorial only shows how to create an automation blueprint, scripts also support blueprints in the same way.

</div>

## What is a blueprint?

A blueprint is a script or automation configuration with certain parts marked as configurable. This allows users to create multiple scripts or automations based on the same blueprint, with each having its own configuration.

Imagine you want to control lights based on motion. A blueprint provides the generic automation framework, but allows you to select the specific motion sensor to trigger on, and the exact light to control. This blueprint makes it possible to create two automations that each have their own configuration and that act completely independently. Yet, they share some basic automation configuration so that you do not have to set this up every time.

<div class='note'>

This is an advanced task. Creating blueprints requires knowledge in writing [automations](/docs/automation/yaml/) and [scripts](/docs/scripts/) in YAML.

</div>

### [Tutorial: Create an automation blueprint &raquo;](/docs/blueprint/tutorial/)
