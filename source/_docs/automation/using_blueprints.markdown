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

## Keeping blueprints up to date

Blueprints created by the community may go through multiple revisions. Sometimes a user creates a blueprint,
the community provides feedback, and new functionality is added.

While there's no built-in functionality to update a blueprint you've already imported, you can manually edit
its YAML content to keep it up to date:

1. Navigate to the blueprints directory (`blueprints/automation/`).
   The location of this directory depends on the installation method and it's
   similar to how you find [`configuration.yaml`](/docs/configuration/#editing-configurationyaml).
1. Next, you must find the blueprint to update. The path name of a blueprint consists of:
   - The username of the user that created it, which depends from where you imported the blueprint,
     the forum or GitHub.
   - The name of the YAML file. For the forum it's the title of the topic in the URL, for GitHub
     it's the name of the YAML file.
1. Open the YAML file with your editor and update its contents.
1. Reload the automations for the changes to take effect.

The new changes will appear to your existing automations as well.

## Finding new blueprints

The Home Assistant Community forums have a specific tag for blueprints. This tag is used to collect all blueprints.

[Visit the Home Assistant forums][blueprint-forums]

[blueprint-forums]: /get-blueprints

## Creating new blueprints

Using blueprints is nice and easy, but what if you could create that one missing
blueprint that our community definitely needs?

Learn more about blueprint by [reading our tutorial on creating a blueprint](/docs/blueprint/tutorial/).

## Troubleshooting missing automations

When you're creating automations using blueprints and they don't appear in the UI, make sure that you add back `automation: !include automations.yaml` from the default configuration to your `configuration.yaml`.
