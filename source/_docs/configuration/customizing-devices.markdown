---
title: "Customizing entities"
description: "Simple customization for entities."
related:
  - docs: /integrations/homeassistant/
  - docs: /docs/configuration/
    title: Home Assistant Core integration documentation
---

## Changing entity name and entity ID

After adding a new device, the entity may not have a name and the automatically assigned entity ID might look very technical. If you like, you can use your own naming concept for devices.

To change the entity ID and friendly name of supported entities, follow these steps:

1. Go to {% my entities title="**Settings** > **Devices & services** > **Entities**" %} and select the entity from the list.
2. In the top right corner, select the cog icon.

   ![Entity dialog box with cog icon.](/images/docs/configuration/customizing-entity-dialog.png)

3. Enter the new name or the new entity ID.
   - For example, the entity ID here could be `light.bedroom_ligthstrip`.
   - Do not change the domain of the entity - the part before the `.`.

   ![Settings for entity.](/images/docs/configuration/customizing-entity.png)

4. Select **Update**.
5. If you have used this entity in automations and scripts, you need to rename the entity ID there, too.
   - Go to {% my automations title="**Settings** > **Automations & Scenes**" %} open the respective tab and find your automation or script.

   ![Edit entity ID in automation.](/images/docs/configuration/edit_entity-id_in_automation.png)

If your entity is not supported, or you cannot customize what you need via this method, you need to edit the settings in your [`configuration.yaml` file](/docs/configuration/). For a detailed description of the entity configuration variables, refer to the [Home Assistant Core integration documentation](/integrations/homeassistant/).
