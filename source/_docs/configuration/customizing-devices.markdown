---
title: "Customizing entities"
description: "Override the name, icon, or other properties of an entity."
related:
  - docs: /integrations/homeassistant/
  - docs: /docs/configuration/
    title: configuration.yaml file
  - docs: /docs/configuration/troubleshooting/
  - docs: /docs/organizing/labels/
---

After adding a new device, you might find the automatically assigned entity ID too technical and the entity lacking a friendly name. You can personalize these elements to better fit your naming conventions or modify other attributes like the icon.

## Recommendations on entity naming and related elements

If you want to have a straightforward and organized Home Assistant setup, create a name for each entity, as well as for each related floor, area and device, that is as simple as possible and then configure everything properly. Name every element for what it is and Home Assistant will add the context around it based on what you have configured. Here are a few recommendations and examples:

- Create a short and standalone name for each element that simply identifies it, leaving the location and the element it belongs to out of the name. For example, a good name for an area would be "Living room" instead of "Ground floor living room", and a good name for a device would be "Multi sensor" instead of "Office multi sensor".
- [Assign an area to each device](/docs/organizing/areas/#assigning-an-area-to-a-device-from-the-devices-dashboard) and [assign a floor to each area](/docs/organizing/areas/#assigning-areas-to-floors-and-adding-labels). Home Assistant will use that information in pickers, dialogs, and tables so you don't need to add the location of areas, entities, and devices in their names.
- Customize the presentation of floors, areas, devices, and entities by editing the cards and views of dashboards. For example, you can adjust the displayed name of a dashboard entity card or remove it if it is longer than you would like, instead of changing the entity name.

## Changing the attributes of an entity

To change entity attributes, follow these steps:

1. Go to {% my entities title="**Settings** > **Devices & services** > **Entities**" %} and select the entity from the list.
2. In the top-right corner, select the {% icon "mdi:cog" %} cog icon.

   ![Entity dialog box with cog icon.](/images/docs/configuration/customizing-entity-dialog.png)

3. Enter or edit the attributes:
   - For example, the entity ID here could be shortened to `binary_sensor.lumi_sensor_aq2_opening`.
     - You can use lowercase letters, numbers, and underscores.
     - The ID must not start or end with an underscore.
     - To undo the change and revert the ID to the default, select the {% icon "mdi:restore" %} icon.
     - To revert all the entity IDs for a device, on the device page, select the three dots {% icon "mdi:dots-vertical" %} menu, then select **Recreate entity IDs**.
     - Result: This resets the entity ID and applies the current default naming convention.
       - The terms used to generate the entity ID depend on a few factors. Prioritization is as follows:
         1. If you changed the name of the entity, the entity name will be used.
         2. The entity ID suggested by the integration (just a few integrations do this).
         3. The default name in the user language, if using Latin script.
            - If something other than Latin script is used, the entity ID is based on the English default name. This is because entity IDs must use lowercase letters, numbers, and underscores.

   - Enter or edit the entity name.
     - In this example, this would change "Opening".
   - If needed, from the **Shown as** menu, you can select a different [device class](/integrations/homeassistant/#device-class).
   - If you like, add a [label](/docs/organizing/labels/).

   ![Settings for entity.](/images/docs/configuration/customizing-entity.png)

4. To apply the changes, select **Update**.
5. If you changed the entity ID and use this entity in automations or scripts, update the entity ID there as well.
   - Changing only the entity name does not affect your automations or scripts because they refer to the entity ID.
   - Go to {% my automations title="**Settings** > **Automations & scenes**" %}, open the respective tab, and find your automation or script.

## Changing the entity ID format for new entities

Home Assistant generates entity IDs for new entities based on parts of your setup, like the floor or area that is assigned to the entity, the device it belongs to, and the entity name. For example, a temperature sensor on a thermostat in the living room might have the entity ID `sensor.living_room_thermostat_temperature`. The default format of entity IDs uses the area, device, and entity name, in that order.

However, you can change the default format of entity IDs by defining which parts will be used and its order. The new format that you set will only be used when Home Assistant generates a new entity ID, so existing entities keep their current entity IDs. You can still rename the entity IDs afterwards in the entity settings.

{% note %}
Some integrations suggest their own entity ID for new entities. In that case, this format is not used.
{% endnote %}

To change the format:

1. Go to **Settings** > **System** > **Entity ID format**.
2. Add, remove, or reorder the **Floor**, **Area**, **Device**, and **Entity** parts to build the format you want. The **Preview** shows an example of the result.
3. Select **Save**.

If you want to go back to the default format, select **Reset to default**.

When you recreate the entity IDs for a device, Home Assistant will use the new format to generate them.

## Customizing an entity in YAML

If your entity is not supported, or you could not customize what you need via the user interface, you need to edit the settings in your {% term "`configuration.yaml`" %} file. For a detailed description of the entity configuration variables and [device class](/integrations/homeassistant/#device-class) information, refer to the [Home Assistant Core integration documentation](/integrations/homeassistant/).
