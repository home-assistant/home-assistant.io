---
title: "Customizing entities"
description: "Rename or hide entities, choose how new entity IDs are created, and change entity icons or other properties."
related:
  - docs: /integrations/homeassistant/
  - docs: /docs/configuration/
    title: configuration.yaml file
  - docs: /docs/configuration/troubleshooting/
  - docs: /docs/organizing/labels/
---

After adding a new device, you might find the automatically assigned ID of its entity or entities too technical, or might want to change the entity or entities name.
You can personalize these elements or modify other attributes, such as the icon.

## Recommendations on entity naming and related elements

To organize your Home Assistant setup, use short names for floors, areas, devices, and entities.
Assign devices to areas and areas to floors instead of repeating their location in every name.
Home Assistant can use this information when it creates new entity IDs.

An _entity name_ identifies the specific function or data point, such as `Temperature` or `Power`.
By default, when an entity belongs to a device, Home Assistant displays the device name with the entity name, such as `Thermostat Temperature`.
An _entity ID_ identifies the entity in automations, scripts, and other configuration, such as `sensor.living_room_thermostat_temperature`.
Changing an entity name does not change its entity ID.

Follow these recommendations in your Home Assistant setup:

- Name each item for what it is, rather than where it is or what it belongs to. For example, name an area `Living room` instead of `Ground floor living room`, and a device `Multi sensor` instead of `Office multi sensor`.
- Use the device name to identify the physical device and the entity name to identify what the device reports or controls. For example, a device named `Thermostat` can have an entity named `Temperature`.
- Give otherwise identical devices a distinguishing name that is meaningful to you. For example, use `Left window sensor` and `Right window sensor` if their position is how you tell them apart.
- [Assign an area to each device](/docs/organizing/areas/#assigning-an-area-to-a-device-from-the-devices-dashboard) and [assign a floor to each area](/docs/organizing/areas/#assigning-areas-to-floors-and-adding-labels). Home Assistant uses this information in pickers, dialogs, and tables, so you do not need to include the location in the names of areas, devices, and entities.
- Change the displayed name on a dashboard card when you only want a different label in that dashboard. You do not need to change the entity name.

If you already use a naming strategy that works for you, you do not need to rename existing items.
Use these recommendations for new items, or when an existing name makes an item hard to identify.

## Changing the attributes of an entity

To change entity attributes, follow these steps:

1. Go to {% my entities title="**Settings** > **Devices & services** > **Entities**" %} and select the entity from the list.
2. In the top-right corner, select **Settings** {% icon "mdi:cog-outline" %}.
3. Enter or edit the attributes:
   - Enter or edit the entity ID, for example, to shorten it to `binary_sensor.lumi_sensor_aq2_opening`.
     - You can use lowercase letters, numbers, and underscores.
     - The ID must not start or end with an underscore.
      - To undo the change and revert the ID to the default, select the {% icon "mdi:restore" %} icon.
      - To recreate all the entity IDs for a device, go to {% my devices title="**Settings** > **Devices & services** > **Devices**" %}, select the device and then select **Menu** {% icon "mdi:dots-vertical" %} > **Recreate entity IDs**.
        Recreating entity IDs generates new entity IDs using the current entity ID format.
        It does not change entity names.
      - The terms used to generate the entity ID depend on a few factors. Prioritization is as follows:
        1. If you changed the name of the entity, the entity name will be used.
        2. The entity ID suggested by the integration (just a few integrations do this).
        3. The default name in the user language, if using Latin script.
           If something other than Latin script is used, the entity ID is based on the English default name. This is because entity IDs must use lowercase letters, numbers, and underscores.

   - Enter or edit the entity name.
     - If the entity belongs to a device, you can turn on **Use device name** instead. The entity is then called by the name of its device. For example, if a smart plug called `Coffee machine` has an entity called `Power`, the entity is shown as `Coffee machine` instead of `Coffee machine Power`. The entity also uses the area of its device. To rename the device, select **change the device name**.
   - If needed, from the **Show as** menu, you can select a different [device class](/integrations/homeassistant/#device-class).
   - If you like, add a [label](/docs/organizing/labels/).

4. To apply the changes, select **Update**.
5. If you changed the entity ID and use this entity in automations or scripts, update the entity ID there as well.
   - Changing only the entity name does not affect your automations or scripts because they refer to the entity ID.
   - Go to {% my automations title="**Settings** > **Automations & scenes**" %}, open the respective tab, and find your automation or script.

## Hidden entities

Hide an entity when you don't need to see it, but still want it to work. For example, if you combined several lights into a [light group](/integrations/group/), you can hide the individual lights and only show the group.

A hidden entity keeps working:

- Its state still updates, and its history is still recorded.
- Automations, scripts, and dashboard cards that use the entity directly keep working.
- You can still control it with actions.

Home Assistant skips a hidden entity in these places:

- Dashboards that Home Assistant fills in automatically. You can still add a hidden entity to a dashboard yourself.
- Triggers, conditions, and actions that target an area, a device, or a label. To target a hidden entity, select the entity itself.
- Voice assistants, such as Assist: a new entity that is hidden isn't exposed by default. Hiding an entity that is already exposed doesn't change that. To check which entities are exposed, go to {% my voice_assistants title="**Settings** > **Voice assistants**" %} and select the **Expose** tab.

Some integrations hide entities for you. For example, if you create a [group helper](/integrations/group/#group-options) with **Hide members** turned on, the members of the group are hidden. The settings of these entities show who hid them, for example, **Hidden by Integration.**

## Hidden versus disabled entities

Hiding and disabling both keep an entity out of your way, but they work differently. A hidden entity keeps working, and Home Assistant only skips it in some places. A disabled entity isn't added to Home Assistant at all: it has no state, no history is recorded, and you can't control it.

Hide an entity that you still need, but don't want to see. Disable an entity that you don't need at all.

When you add a device, many integrations disable some of its less-used entities, such as signal strength. To use one of these entities, enable it. For the steps, refer to [Disabling or enabling an entity](#disabling-or-enabling-an-entity).

## Hiding an entity

To hide an entity, follow these steps:

1. Go to {% my entities title="**Settings** > **Devices & services** > **Entities**" %} and select the entity from the list.
2. In the top-right corner, select **Settings** {% icon "mdi:cog-outline" %}.
3. Turn off **Visible**.
4. Select **Update**.

To show the entity again, turn on **Visible**.

To hide several entities at once, follow these steps:

1. Go to {% my entities title="**Settings** > **Devices & services** > **Entities**" %}.
2. Above the table, select **Enter selection mode** {% icon "mdi:format-list-checks" %}, and then select the entities.
3. Select **Action** {% icon "mdi:dots-vertical" %} > **Hide selected**.
4. To confirm, select **Hide**.

To show them again, select **Action** {% icon "mdi:dots-vertical" %} > **Unhide selected**.

## Disabling or enabling an entity

To disable an entity, follow these steps:

1. Go to {% my entities title="**Settings** > **Devices & services** > **Entities**" %} and select the entity from the list.
2. In the top-right corner, select **Settings** {% icon "mdi:cog-outline" %}.
3. Turn off **Enabled**.
4. Select **Update**.

To enable an entity, follow these steps:

1. Find the disabled entity:
   - On the page of its device, select the link with the number of disabled entities, for example, **+2 disabled entities**. Then select the entity.
   - Or, go to {% my entities title="**Settings** > **Devices & services** > **Entities**" %}. In **Filters**, under **Status**, select **Disabled**. Then select the entity.
2. In the top-right corner, select **Settings** {% icon "mdi:cog-outline" %}.
3. Turn on **Enabled**.
4. Select **Update**.
   - Result: A message tells you that the entity is added after a short delay, or that you need to restart Home Assistant first.

To disable or enable several entities at once, follow these steps:

1. Go to {% my entities title="**Settings** > **Devices & services** > **Entities**" %}.
   - To enable entities, in **Filters**, under **Status**, select **Disabled**.
2. Above the table, select **Enter selection mode** {% icon "mdi:format-list-checks" %}, and then select the entities.
3. Select **Action** {% icon "mdi:dots-vertical" %} > **Disable selected** or **Enable selected**.
4. To confirm, select **Disable** or **Enable**.
   - Result: When you enable entities, a message tells you that they are added after a short delay, or that you need to restart Home Assistant first.

## Changing the entity ID format for new entities

Home Assistant generates entity IDs for new entities from the parts you include in the entity ID format, such as the floor, area, parent device, device, and entity name.
For example, a temperature sensor on a thermostat in the living room might have the entity ID `sensor.living_room_thermostat_temperature`.
By default, the format uses the area, parent device, device, and entity name, in that order.
For more information about parent devices, refer to [Parent and child devices](#parent-and-child-devices).
Parts without a value are left out.
To get the most out of the default entity ID format, check the [recommendations on entity naming and related elements](#recommendations-on-entity-naming-and-related-elements).

However, you can change the default format of entity IDs by defining which parts will be used and its order. The new format that you set will only be used when Home Assistant generates a new entity ID, so existing entities keep their current entity IDs. You can still rename the entity IDs afterwards in the entity settings.

{% note %}
Some integrations suggest their own entity ID for new entities. In that case, this format is not used.
{% endnote %}

To change the format:

1. Go to **Settings** > **System** > **Entity ID format**.
2. Add, remove, or reorder the **Floor**, **Area**, **Parent device**, **Device**, and **Entity** parts to build the format you want. The **Examples** show the result for a device with a parent device and for one without.
3. Select **Save**.

If you want to go back to the default format, select **Reset to default**.

When you recreate the entity IDs for a device, Home Assistant will use the new format to generate them.

## Customizing an entity in YAML

If your entity is not supported, or you could not customize what you need via the user interface, you need to edit the settings in your {% term "`configuration.yaml`" %} file. For a detailed description of the entity configuration variables and [device class](/integrations/homeassistant/#device-class) information, refer to the [Home Assistant Core integration documentation](/integrations/homeassistant/).

## Parent and child devices

Some devices are made up of smaller parts that each act like a device of their own. For example, a power strip can show each of its outlets as a separate device. In Home Assistant, the power strip is the _parent device_, and each outlet is a _child device_ with its own entities, such as the power use of that outlet.

Whether a device has child devices is decided by the integration that provides it. You can't add or change this yourself.

You can see which devices belong together in several places, for example, on the page of a parent device, which lists its child devices, and on the page of a child device, which shows the device it is part of.

By default, new entity IDs include the name of the parent device. For more information, refer to [Changing the entity ID format for new entities](#changing-the-entity-id-format-for-new-entities).
