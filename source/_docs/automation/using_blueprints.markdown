---
title: "Using automation blueprints"
description: "Blueprints are ready-made automations shared by the Home Assistant community. Install a blueprint and create your own automation by filling in a few fields, no YAML required."
---

Blueprints are the easiest way to add an automation to your Home Assistant. They are ready-made automations shared by the Home Assistant community: someone else has already done the thinking and the writing, and you just plug in your own devices.

You can find blueprints for almost any common use case, from "turn the lights on when motion is detected" to "announce the weather every morning at 7" to "notify me when the laundry is done". You install a blueprint once and can use it as many times as you like, with different devices and settings each time.

## Finding new blueprints

The Home Assistant Community forum has a Blueprints Exchange category, where people share their blueprints.

[Visit the Blueprints Exchange][blueprint-forums]

[blueprint-forums]: /get-blueprints

<a id="importing-blueprints"></a>

## Importing a blueprint

Home Assistant can import blueprints from the Home Assistant forums, GitHub, GitHub gists, and the Home Assistant website. You can also import a blueprint from another web address. In that case, Home Assistant asks you to only continue if you trust the source.

1. To import a blueprint, first [find a blueprint you want to import][blueprint-forums].
   - If you just want to practice importing, you can use this address:

      ```text
      https://github.com/home-assistant/core/blob/dev/homeassistant/components/automation/blueprints/motion_light.yaml
      ```

2. Go to {% my blueprints title="**Settings** > **Automations & scenes** > **Blueprints**" %}.
3. In the bottom-right corner, select {% my blueprint_import blueprint_url="https://github.com/home-assistant/core/blob/dev/homeassistant/components/automation/blueprints/motion_light.yaml" title="**Import blueprint**" %}.
   - Result: A dialog asks for the **Blueprint address**.
4. Enter the address and select **Preview**.
   - If you used the **Import blueprint** link on this page, the practice address is already filled in.
   - Result: The dialog shows a preview of the blueprint.
5. To finish the import, select **Import blueprint**.
   - If you already have this blueprint, the button is **Override blueprint** instead. Importing it replaces your current version.

The blueprint can now be used for creating automations.

## Creating an automation from a blueprint

Automations based on a blueprint need to be configured. What needs to be configured differs by blueprint.

Home Assistant comes with a few blueprints, such as **Motion-activated Light** and **Zone Notification**, so you can try this before you import one.

1. To create your first automation based on a blueprint, go to {% my blueprints title="**Settings** > **Automations & scenes** > **Blueprints**" %}.
2. Select the automation blueprint that you want to use.
   - The **Type** column shows which blueprints are for automations.
   - Result: The automation editor opens with the blueprint selected.
3. Fill in the fields of the blueprint.
4. Select **Save**.
   - If the automation doesn't have a name yet, enter a **Name** and select **Save** again.

Done! To change the settings later, go to {% my automations title="**Settings** > **Automations & scenes**" %} and open the automation.

<a id="editing-an-imported-blueprint"></a>

## Taking control of a blueprint automation

To change more than the fields of a blueprint allow, take control of an automation that uses the blueprint. Home Assistant then converts that automation into a regular automation, which you can change as you like. The blueprint itself doesn't change, and other automations that use it keep using it.

You can also take control while you create the automation, before you save it.

To take control of a blueprint automation, follow these steps:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and open the automation that uses the blueprint.
2. Select the three dots {% icon "mdi:dots-vertical" %} menu and select **Take control**.
   - Result: The editor shows a preview of the automation as a regular automation.
   - **Take control** isn't available for automations that you can't edit in the UI, for example, an automation that isn't stored in `automations.yaml` or doesn't have an ID.
3. To take control, select **Yes**, then select **Save**.
   - You can't convert the automation back to a blueprint automation.
   - To keep using the blueprint, select **No** instead.

## Re-importing a blueprint

Blueprints created by the community can go through multiple revisions. For example, the community gives feedback, and the author adds new functionality.

The quickest way to get these changes is to re-import the blueprint. This overwrites the blueprint you currently have.

{% caution %}

**Before you do this**: If the re-imported blueprint is not compatible, it can break your automations.

- In this case, you will need to manually adjust your automations.

{% endcaution%}

1. Go to {% my blueprints title="**Settings** > **Automations & scenes** > **Blueprints**" %}.
2. On the blueprint that you want to re-import, select the three dots {% icon "mdi:dots-vertical" %} menu, and select **Re-import blueprint**.
   - You can only re-import a blueprint that has a source address. Blueprints that you import have one, and so do the blueprints that come with Home Assistant. For a blueprint without a source address, the menu shows **Unable to re-import blueprint: no source URL**.
3. To confirm, select **Re-import**.

## Updating an imported blueprint in YAML

If you don't want to [re-import the blueprint](#re-importing-a-blueprint), you can edit its {% term YAML %} content to keep it up to date:

1. Go to the blueprints directory (`blueprints/automation/`). The location of this directory depends on the installation type. It's similar to how you find [`configuration.yaml`](/docs/configuration/#editing-configurationyaml).
2. Next, find the blueprint to update. The path name of a blueprint consists of:
   - The username of the user that created it. The name depends on the source of the blueprint: the forum, or GitHub.
   - The name of the {% term YAML %} file. For the forum, it's the title of the topic in the URL. For GitHub, it's the name of the YAML file.
3. Open the YAML file with your editor and update its contents.
4. Reload the automations for the changes to take effect.

The new changes will appear to your existing automations as well.

## Creating your own blueprint

Using blueprints is nice and easy, but what if you could create that one missing blueprint that our community definitely needs?

Learn more about blueprints by [reading our tutorial on creating a blueprint](/docs/blueprint/tutorial/).

## Troubleshooting missing automations

If you can't see your automation, refer to [My automation doesn't appear in the UI](/docs/automation/troubleshooting/#my-automation-doesnt-appear-in-the-ui).
