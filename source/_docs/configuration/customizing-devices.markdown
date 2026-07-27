---
title: "Customizing entities"
description: "Override the name, icon, or other properties of an entity in YAML, useful for entities that cannot be customized through the user interface."
related:
  - docs: /integrations/homeassistant/
  - docs: /docs/configuration/
    title: configuration.yaml file
  - docs: /docs/configuration/troubleshooting/
  - docs: /docs/organizing/labels/
---

After adding a new device, you might find the automatically assigned entity ID too technical and the entity lacking a friendly name. You can personalize these elements to better fit your naming conventions or modify other attributes like the icon.

To change entity attributes, follow these steps:

1. Go to {% my entities title="**Settings** > **Devices & services** > **Entities**" %} and select the entity from the list.
2. In the top-right corner, select the {% icon "mdi:cog" %} cog icon.

   ![Entity dialog box with cog icon.](/images/docs/configuration/customizing-entity-dialog.png)

3. Enter or edit the attributes:
   - For example, the entity ID here could be shortened to `binary_sensor.lumi_sensor_aq2_opening`.
     - You can use lowercase letters, numbers, and underscores.
     - The ID must not start or end with an underscore.
     - To undo the change and revert the ID to the default, select the {% icon "mdi:restore" %} icon.
       - **Note**: You can only reset the ID to the default ID for entities with a unique ID.
         - IDs of entities that are disabled or for which the integration is not set up cannot be reverted.
     - To revert all the entity IDs for a device, on the device page, select the three dots {% icon "mdi:dots-vertical" %} menu, then select **Recreate entity IDs**.
     - Result: This resets the entity ID and applies the current default naming convention.
       - The terms used to generate the entity ID depends on a few factors. Prioritization is as follows:
         1. If you changed the friendly name of the entity, the friendly name will be used.
         2. The entity ID suggested by the integration (just a few integrations do this).
         3. The default name in the user language, if using Latin script.
            - If the something other than Latin script is used, the entity ID is based on the English default name.
            - This is because entity IDs must use lowercase alphanumeric characters in the range of [a-z,1-9].

   - Enter or edit the friendly name.
     - In this example, this would change "Opening".
   - If needed, from the **Shown as** menu, you can select a different [device class](/integrations/homeassistant/#device-class).
   - If you like, add a [label](/docs/organizing/labels/).

   ![Settings for entity.](/images/docs/configuration/customizing-entity.png)

4. To apply the changes, select **Update**.
5. If you changed the entity ID and use this entity in automations or scripts, update the entity ID there as well.
   - Changing only the friendly name does not affect your automations or scripts because they refer to the entity ID.
   - Go to {% my automations title="**Settings** > **Automations & scenes**" %}, open the respective tab, and find your automation or script.

## Changing the entity ID format for new entities

Home Assistant generates entity IDs for new entities based on parts of your setup, like the floor, area, device, and entity name. For example, a temperature sensor on a thermostat in the living room might become `sensor.living_room_thermostat_temperature`.

You can change which parts are used and in which order. This format is only used when Home Assistant generates a new entity ID, so existing entities keep their current entity IDs, and you can still rename them afterwards in the entity settings.

To change the format:

1. Go to **Settings** > **System** > **Entity ID format**.
2. Add, remove, or reorder the **Floor**, **Area**, **Device**, and **Entity** parts to build the format you want. The **Preview** shows an example of the result.
3. Select **Save**.

The default format uses the area, device, and entity name, in that order. To go back to it, select **Reset to default**.

When you recreate the entity IDs for a device, Home Assistant uses this format to generate them.

## Customizing an entity in YAML

If your entity is not supported, or you could not customize what you need via the user interface, you need to edit the settings in your {% term "`configuration.yaml`" %} file. For a detailed description of the entity configuration variables and [device class](/integrations/homeassistant/#device-class) information, refer to the [Home Assistant Core integration documentation](/integrations/homeassistant/).
