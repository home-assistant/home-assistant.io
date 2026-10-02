---
title: "Scenes"
description: "A scene sets a group of devices to saved states in one step. Learn how scenes work, when to use them, and how to create and activate them."
related:
  - docs: /integrations/scene/
    title: Scenes integration
  - docs: /docs/automation/which-tool-to-use/
    title: Which tool to use
---

A {% term scene %} stores the states you want for several devices, and sets them again in one step when you activate it. For example, a "Movie night" scene can dim the living room lights, close the blinds, and turn on the TV.

## When to use a scene

Use a scene when several devices should go into a specific state together, and you want to use that state more than once, for example, from a button on a dashboard, with Assist, and from an automation in the evening.

If the states are only needed in one automation, you don't need a saved scene. The [**Apply scene**](/actions/scene.apply/) action sets the states directly. For help choosing between a scene, a script, and an automation, refer to [Which tool to use](/docs/automation/which-tool-to-use/).

## How a scene works

A scene sets states. It doesn't run steps, and it doesn't remember what came before. Activating a scene means that Home Assistant applies its states once. The scene doesn't stay active afterwards, so there is nothing to deactivate.

This is why:

- All devices in the scene change at the same time. A scene can't wait, or change things in a specific order. For that, use a [script](/integrations/script/).
- A scene always sets the same states. It doesn't check anything first. If the states should depend on something, for example, whether someone is home, use an [automation](/docs/automation/).
- A scene doesn't have an on or off state. To go back to how things were, activate another scene. Or save the current states first, with the [**Create scene**](/actions/scene.create/) action, and activate that scene later.

## About Live Edit and Review Mode in the scene editor

You create and edit scenes in the scene editor, in {% my scenes title="**Settings** > **Automations & scenes** > **Scenes**" %}. The editor has two modes:

- **Live Edit**
  - All changes are applied to your devices right away, so you see what the scene looks like. When you leave the editor, or switch to **Review Mode**, your devices go back to the states they had before.
- **Review Mode**
  - You see the scene without applying it. You can change its details, and remove devices or entities. To add devices, or change their states, switch to **Live Edit**, which applies the scene.

A new scene opens in **Live Edit**. A scene that you already saved opens in **Review Mode**.

## Creating a scene

You usually create a scene in the scene editor. You can also start from a copy of a scene you already have, write a scene in YAML, use scenes from another integration, or create a temporary scene from an automation.

### Creating a scene in the scene editor

In the scene editor, you add the devices that belong in the scene, and set them to the states you want. The editor applies your changes to the devices right away, so you see the result while you work.

1. Go to {% my scenes title="**Settings** > **Automations & scenes** > **Scenes**" %}, and select **Create scene**.
   - The editor opens in **Live Edit**.
2. Under **Devices**, select **Add a device**, and select a device.
   - To add a single entity instead, under **Entities**, select **Add an entity**.
3. Set each device to the state you want for the scene, for example, turn on a light and set its brightness.
   - To change an entity, select it in the list, and change it in the dialog that opens. You can also change it in any other way, for example, on a dashboard or on the device itself.
4. Select **Save**.
5. Enter a **Name** for the scene.
   - Optional: Select an **Icon** and an **Area**, or select **Add category** or **Add labels**.
6. Select **Save**.
   - Result: The scene stores the current states of its devices and entities. The editor switches to **Review Mode**, and your devices go back to the states they had before.

### Duplicating a scene

To create a scene that is similar to one you already have, duplicate it, and change the copy.

1. Go to {% my scenes title="**Settings** > **Automations & scenes** > **Scenes**" %}, and open the scene.
2. Select **Menu** {% icon "mdi:dots-vertical" %} > **Duplicate scene**.
   - A copy opens as a new scene, named after the original with "(Duplicate)" at the end.
3. Change the devices, entities, or states.
4. Select **Save**.
5. Change the **Name**, and select **Save**.

### Creating a scene in YAML

You can also write a scene in YAML, for example, in your {% term "`configuration.yaml`" %} file. For the options and an example, refer to [Defining scenes in YAML](/integrations/scene/#defining-scenes-in-yaml).

### Creating a scene from another integration

Some integrations, such as [Philips Hue](/integrations/hue/), provide their own scenes. How you set up these scenes depends on the integration, for example, in the Hue app or in the KNX panel. They show up in Home Assistant as scene entities. For details, refer to [Scenes from other integrations](/integrations/scene/#scenes-from-other-integrations).

### Creating a temporary scene from an automation

An automation or a script can create a scene while it runs, with the [**Create scene**](/actions/scene.create/) action. For example, it can save the current states of some devices, change them, and restore them later. The scene is removed again when you reload the scenes or restart Home Assistant.

## Editing a scene

To add or remove devices, or to change the states that a scene stores, edit the scene in **Live Edit**. While you edit, the scene is applied to your devices.

You can edit all scenes that you create in the editor. Scenes from other YAML files, from other integrations, or from the **Create scene** action can't be edited in the editor. For details, refer to [Editing a YAML scene in the scene editor](/integrations/scene/#editing-a-yaml-scene-in-the-scene-editor).

1. Go to {% my scenes title="**Settings** > **Automations & scenes** > **Scenes**" %}, and open the scene.
   - The editor opens in **Review Mode**.
2. Select **Live Edit**.
   - The scene is applied to your devices. If you have unsaved changes, select **Save and Live Edit**.
3. Add or remove devices and entities, or change their states.
4. Select **Save**.

### Renaming a scene

You can change the name of a scene, and its icon, area, category, and labels, without changing its devices and their states.

1. Go to {% my scenes title="**Settings** > **Automations & scenes** > **Scenes**" %}, and open the scene.
2. Select **Menu** {% icon "mdi:dots-vertical" %} > **Rename**.
3. Change the **Name**, and the other details that you want to change.
4. Select **Rename**.

Renaming a scene doesn't change its entity ID, for example, `scene.movie_night`. To change the entity ID, refer to [Changing the attributes of an entity](/docs/configuration/customizing-devices/#changing-the-attributes-of-an-entity).

## Deleting a scene

If you don't need a scene anymore, you can delete it. Automations, scripts, and dashboards that use the scene can't activate it after that.

1. Go to {% my scenes title="**Settings** > **Automations & scenes** > **Scenes**" %}.
2. In the row of the scene, select **Menu** {% icon "mdi:dots-vertical" %} > **Delete**.
3. To confirm, select **Delete**.

You can only delete scenes that you can edit in the scene editor. To remove a scene from YAML, remove it from the YAML file, and then [reload the scenes](/integrations/scene/#reloading-scenes). To remove a temporary scene, use the [**Delete scene**](/actions/scene.delete/) action.

## Activating a scene

When you activate a scene, Home Assistant sets each of its devices and entities to the state stored in the scene. You can activate a scene in several ways:

- From the list of scenes
  - Go to {% my scenes title="**Settings** > **Automations & scenes** > **Scenes**" %}. In the row of the scene, select **Menu** {% icon "mdi:dots-vertical" %} > **Apply**.
- From the scene editor
  - Open the scene, and select **Menu** {% icon "mdi:dots-vertical" %} > **Apply**.
- From a dashboard
  - Add the scene to a card, for example, an [Entities card](/dashboards/entities/), and select **Activate**.
- With Assist
  - [Expose the scene to Assist](/voice_control/voice_remote_expose_devices/), and say, for example, "Activate movie night scene".
- From an automation or a script
  - Use the [**Activate scene**](/actions/scene.turn_on/) action.

To start an automation when a scene is activated, use the [**Scene activated**](/triggers/scene.activated/) trigger.
