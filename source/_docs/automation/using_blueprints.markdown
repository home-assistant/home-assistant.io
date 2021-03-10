---
title: "Using Automation Blueprints"
description: "How to create automations based off blueprints."
---

Automation blueprints are pre-made automations that you can easily add to your Home Assistant instance. Each blueprint can be added as many times as you want.

Quick links:

- [Blueprints in the Home Assistant forums][blueprint-forums]

## Blueprint Automations

Automations based on a blueprint only need to be configured to be used. What needs to be configured differs on each blueprint.

To create your first automation based on a blueprint, go to **{% my config %}** and then **{% my blueprints %}**. Find the blueprint that you want to use and click on "Create Automation".

This will open the automation editor with the blueprint selected. Give it a name and configure the blueprint and click on the blue button "Save Automation" in the bottom right.

Done! If you want to revisit the configuration values, you can find it by going to **{% my config %}** and then **{% my automations %}**.

## Importing blueprints

Home Assistant can import blueprints from the Home Assistant forums, GitHub and GitHub gists.

To do this, first [find a blueprint you want to import][blueprint-forums]. If you just want to practice importing, you can use this URL:

```text
https://github.com/home-assistant/core/blob/dev/homeassistant/components/automation/blueprints/motion_light.yaml
```

Go to **{% my config %}** and then **{% my blueprints %}**. Click on the blue "{% my blueprint_import blueprint="https://github.com/home-assistant/core/blob/master/homeassistant/components/automation/blueprints/motion_light.yaml" %} button in the bottom right.

A new dialog will pop-up asking you for the URL. Enter the URL and click on "preview blueprint".

This will load the blueprint and show a preview in the import dialog. You can change the name and finish the import.

The blueprint can now be used for creating automations.

## Finding new blueprints

The Home Assistant Community forums have a specific tag for blueprints. This tag is used to collect all blueprints.

[Visit the Home Assistant forums][blueprint-forums]

[blueprint-forums]: /get-blueprints
