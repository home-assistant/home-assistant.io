---
title: "Customizing entities"
description: "Rename entities, choose how new entity IDs are created, and change entity icons or other properties."
related:
  - docs: /integrations/homeassistant/
  - docs: /docs/configuration/
    title: configuration.yaml file
  - docs: /docs/configuration/troubleshooting/
  - docs: /docs/organizing/labels/
---

After adding a new device, you might find its automatically assigned entity ID too technical or want to change its entity name.
You can personalize these elements or modify other attributes, such as the icon.

## Recommendations on entity naming and related elements

To organize your Home Assistant setup, use short names for floors, areas, devices, and entities.
Assign devices to areas and areas to floors instead of repeating their location in every name.
Home Assistant can use this information when it creates new entity IDs.

An _entity name_ identifies the specific function or data point, such as `Temperature` or `Power`.
Home Assistant can combine it with device or area context in the _friendly name_ it displays.
An _entity ID_ identifies the entity in automations, scripts, and other configuration, such as `sensor.living_room_thermostat_temperature`.
Changing an entity name does not change its entity ID.

Use these recommendations when naming your Home Assistant setup:

- Name each item for what it is, rather than where it is or what it belongs to. For example, name an area `Living room` instead of `Ground floor living room`, and a device `Multi sensor` instead of `Office multi sensor`.
- Use the device name to identify the physical device and the entity name to identify what the device reports or controls. For example, a device named `Thermostat` can have an entity named `Temperature`.
- Give otherwise identical devices a distinguishing name that is meaningful to you. For example, use `Left window sensor` and `Right window sensor` if their position is how you tell them apart.
- [Assign an area to each device](/docs/organizing/areas/#assigning-an-area-to-a-device-from-the-devices-dashboard) and [assign a floor to each area](/docs/organizing/areas/#assigning-areas-to-floors-and-adding-labels). Home Assistant uses this information in pickers, dialogs, and tables, so you do not need to add location information to areas, devices, and entities.
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
        Recreating entity IDs recreates the entity IDs using the current entity ID format.
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

## Changing the entity ID format for new entities

Home Assistant generates entity IDs for new entities from the parts you include in the entity ID format, such as the floor, area, parent device, device, and entity name.
For example, a temperature sensor on a thermostat in the living room might have the entity ID `sensor.living_room_thermostat_temperature`.
By default, the format uses the area, parent device, device, and entity name, in that order.
For more information about parent devices, refer to [About parent devices and sub-devices](#about-parent-devices-and-sub-devices).
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

## About parent devices and sub-devices

Some devices are made up of smaller parts that each act like a device of their own. For example, a power strip can show each of its outlets as a separate device. In Home Assistant, the power strip is the _parent device_, and each outlet is a _sub-device_ with its own entities, such as the power use of that outlet.

Whether a device has sub-devices is decided by the integration that provides it. You can't add or change this yourself.

You can see which devices belong together in several places, for example, on the page of a parent device, which lists its sub-devices, and on the page of a sub-device, which shows the device it is part of.

By default, new entity IDs include the name of the parent device. For more information, refer to [Changing the entity ID format for new entities](#changing-the-entity-id-format-for-new-entities).
