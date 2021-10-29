---
title: "Using Automation Blueprints"
description: "How to create automations based off blueprints."
---

Automation blueprints are pre-made automations that you can easily add to your Home Assistant instance. Each blueprint can be added as many times as you want.

## Finding new blueprints

The Home Assistant Community forums have a specific tag for blueprints. This tag is used to collect all blueprints.

[Find blueprints in the Home Assistant forums.][blueprint-forums]

[blueprint-forums]: /get-blueprints

## Importing blueprints

Home Assistant can import blueprints from:

- The Home Assistant forum
- GitHub repos and GitHub gists

To import a blueprint:

1. [Find a blueprint][blueprint-forums] you want to import.
1. Go to **{% my config %}** and then **{% my blueprints %}**.
1. Select **{% my blueprint_import %}** in the bottom right.
1. A new dialog will pop-up asking you for the URL. Enter the URL and select **Preview blueprint**.
   This will load the blueprint and show a preview in the import dialog. You can change the name and finish the import.
   If you just want to practice importing, you can use the following URL:

   ```text
   https://github.com/home-assistant/core/blob/dev/homeassistant/components/automation/blueprints/motion_light.yaml
   ```

1. Select **Import blueprint** to import it.

The blueprint can now be used for creating automations.

<div class='note warning'>
If you delete a blueprint, all existing automations based on it will stop working.
</div>

## Creating an automation based on a blueprint

Automations based on a blueprint only need to be configured to be used. What needs to be configured differs on each blueprint.

To create an automation based on a blueprint:

1. Go to **{% my config %}** and then **{% my blueprints %}**.
1. Find the blueprint that you want to use and select **Create Automation**.
   This will open the automation editor with the blueprint selected.
   Give it a name and configure the blueprint.
1. Select **Save Automation** in the bottom right.

Done! If you want to revisit the configuration values, you can find the automation by going to **{% my config %}** and then **{% my automations %}**.

## Updating blueprints

Blueprints created by the community may go through multiple revisions. Sometimes a user creates a blueprint,
the community provides feedback, and new functionality is added. In that case, to pull in the latest blueprint
changes, you can update the blueprint by manually editing its YAML content:

1. Navigate to the blueprints directory (`/blueprints/automation/`).
   The location of this diectory depends on the installation method and it's
   similar to how you find [`configuration.yaml`](/docs/configuration/#editing-configurationyaml).
1. Next, you must find the blueprint to update. The path name of a blueprint consists of:
   - The username of the user that created it, which depends from where you imported the blueprint,
     the forum or GitHub.
   - The name of the YAML file. For the forum it's the title of the topic in the URL, for GitHub
     it's the name of the YAML file.
1. Open the YAML file with your editor and update its contents.
1. Reload the automations for the changes to take effect.

The new changes will appear to your existing automations as well.

## Creating new blueprints

Using blueprints is nice and easy, but what if you could create that one missing
blueprint that our community definitely needs?

Learn more about blueprint by [reading our tutorial on creating a blueprint](/docs/blueprint/tutorial/).

## Troubleshooting missing automations

When you're creating automations using blueprints and they don't appear in the UI, make sure that you add back `automation: !include automations.yaml` from the default configuration to your [`configuration.yaml`](/docs/configuration/#editing-configurationyaml).
