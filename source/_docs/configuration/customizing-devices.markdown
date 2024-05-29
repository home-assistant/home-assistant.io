---
title: "Customizing entities"
description: "Simple customization for entities."
related:
  - docs: /integrations/homeassistant/
  - docs: /docs/configuration/
    title: configuration.yaml file
  - docs: /docs/configuration/troubleshooting/
  - docs: /docs/organizing/labels/
---

## Customizing an entity

After adding a new device, the entity may not have a friendly name and the automatically assigned entity ID might look very technical. If you like, you can use your own naming concept for devices. Or you may want to change other elements, such as the icon.

To change entity attributes, follow these steps:

1. Go to {% my entities title="**Settings** > **Devices & services** > **Entities**" %} and select the entity from the list.
2. In the top right corner, select the cog icon.

   ![Entity dialog box with cog icon.](/images/docs/configuration/customizing-entity-dialog.png)

3. Enter or edit the attributes:
   - For example, the entity ID here could be shortened to `binary_sensor.living_room_motion_1`.
     - Do not change the domain of the entity - the part before the `.` (binary_sensor, in this example).
     - You can use lowercase letters, numbers, and underscores.
     - The ID must not start or end with an underscore.
   - Enter or edit the friendly name.
   - If needed, from the **Shown as** menu, you can select a different [device class](/integrations/homeassistant/#device-class).
   - If you like, add a [label](/docs/organizing/labels/).

   ![Settings for entity.](/images/docs/configuration/customizing-entity.png)

4. To apply the changes, select **Update**.
5. If you have used this entity in automations and scripts, you need to rename the entity ID there, too.
   - Go to {% my automations title="**Settings** > **Automations & Scenes**" %} open the respective tab and find your automation or script.

### Customizing an entity in YAML

If your entity is not supported, or you could not customize what you need via the user interface, you need to edit the settings in your {% term "`configuration.yaml`" %} file. For a detailed description of the entity configuration variables and [device class](/integrations/homeassistant/#device-class) information, refer to the [Home Assistant Core integration documentation](/integrations/homeassistant/).
