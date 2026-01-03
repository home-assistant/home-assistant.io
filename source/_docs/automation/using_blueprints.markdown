---
title: "Using automation blueprints"
description: "How to create automations based off blueprints."
---

Automation blueprints are pre-made {% term automations %} that you can easily add to your Home Assistant instance. Each blueprint can be added as many times as you want.

Quick links:

- [Blueprints in the Home Assistant forums][blueprint-forums]

## Blueprint automations

Automations based on a blueprint need to be configured. What needs to be configured differs by blueprint.

1. To create your first automation based on a blueprint, go to **{% my blueprints title="Settings > Automations & Scenes > Blueprints" %}**.
2. Find the blueprint that you want to use and select **Create Automation**.
   - This opens the automation editor with the blueprint selected.
3. Give it a name and configure the blueprint.
4. Select the blue **Save Automation** button in the bottom right corner.

Done! If you want to revisit the configuration values, go to **{% my blueprints title="Settings > Automations & Scenes > Blueprints" %}**.

## Importing blueprints

Home Assistant can import blueprints from the Home Assistant forums, GitHub, and GitHub gists.

1. To import a blueprint, first [find a blueprint you want to import][blueprint-forums].
   - If you just want to practice importing, you can use this URL:

      ```text
      https://github.com/home-assistant/core/blob/dev/homeassistant/components/automation/blueprints/motion_light.yaml
      ```

2. Go to **{% my blueprints title="Settings > Automations & Scenes > Blueprints" %}**.
3. Select the blue **{% my blueprint_import blueprint="https://github.com/home-assistant/core/blob/master/homeassistant/components/automation/blueprints/motion_light.yaml" %}** button in the bottom right.
   - A new dialog will pop-up asking you for the URL.
4. Enter the URL and select **Preview**.
   - This will load the blueprint and show a preview in the import dialog.
   - You can change the name and finish the import.

The blueprint can now be used for creating automations.

## Editing an imported blueprint

You can tweak an imported blueprint by "taking control" of this blueprint. Home Assistant then converts the blueprint automation into a regular automation, allowing you to make any tweak without having to fully re-invent the wheel.

To edit an imported blueprint, follow these steps:

1. Go to **{% my blueprints title="Settings > Automations & Scenes > Blueprints" %}**.
2. Select the blueprint from the list.
3. Select the {% icon "mdi:dots-vertical" %} and select **Take control**.
4. A preview of the automation is shown.
   - **Info**: By taking control, the blueprint is converted into an automation. You won't be able to convert this back into a blueprint.
   - To convert it into an automation and take control, select **Yes**.
   - If you change your mind and want to keep the blueprint, select **No**.

   ![Screencast showing how to take control of a blueprint](/images/blueprints/blueprint_take_control.webp)

## Re-importing a blueprint

Blueprints created by the community may go through multiple revisions. Sometimes a user creates a blueprint,
the community provides feedback, new functionality is added.

The quickest way to get these changes, is by re-importing the blueprint. This will overwrite the blueprint you currently have.

{% caution %}

**Before you do this**: If the re-imported blueprint is not compatible, it can break your automations.

- In this case, you will need to manually adjust your automations.

{% endcaution%}

### To re-import a blueprint

1. Go to **{% my blueprints title="Settings > Automations & Scenes > Blueprints" %}**.
2. On the blueprint that you want to re-import, select the three-dot menu, and select **Re-import blueprint**.

## Updating an imported blueprint in YAML

Blueprints created by the community may go through multiple revisions. Sometimes a user creates a blueprint,
the community provides feedback, new functionality is added.

If you do not want to [re-import the blueprint](/docs/automation/using_blueprints/#re-importing-a-blueprint) for some reason, you can manually edit
its {% term YAML %} content to keep it up to date:

1. Navigate to the blueprints directory (`blueprints/automation/`).
   The location of this directory depends on the installation method. It's
   similar to how you find [`configuration.yaml`](/docs/configuration/#editing-configurationyaml).
2. Next, you must find the blueprint to update. The path name of a blueprint consists of:
   - The username of the user that created it. The name depends on the source of the blueprint:
     the forum, or GitHub.
   - The name of the {% term YAML %} file. For the forum it's the title of the topic in the URL, for GitHub
     it's the name of the YAML file.
3. Open the YAML file with your editor and update its contents.
4. Reload the automations for the changes to take effect.

The new changes will appear to your existing automations as well.

## Finding new blueprints

The Home Assistant Community forums have a specific tag for blueprints. This tag is used to collect all blueprints.

[Visit the Home Assistant forums][blueprint-forums]

[blueprint-forums]: /get-blueprints

## Creating new blueprints

Using blueprints is nice and easy, but what if you could create that one missing
blueprint that our community definitely needs?

Learn more about blueprints by [reading our tutorial on creating a blueprint](/docs/blueprint/tutorial/).

## Troubleshooting missing automations

When you're creating automations using blueprints and they don't appear in the UI, make sure that you add back `automation: !include automations.yaml` from the default configuration to your {% term "`configuration.yaml`" %}.
