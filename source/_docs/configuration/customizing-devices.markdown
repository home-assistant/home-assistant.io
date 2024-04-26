---
title: "Customizing entities"
description: "Simple customization for entities."
related:
  - docs: /integrations/homeassistant/
  - docs: /docs/configuration/
    title: Home Assistant Core integration documentation
---

## Changing the entity ID

You can use the UI to change the entity ID and friendly name of supported entities. To do this:

1. Select the {% term entity %}, either from the frontend or by selecting the info button next to the entity in the Developer Tools "States" tab.
2. Select the cog icon in the right corner of the entity's dialog
![Entity dialog box.](/images/docs/configuration/customizing-entity-dialog.png)
3. Enter the new name or the new entity ID (remember not to change the domain of the entity - the part before the `.`)
![Settings for entity.](/images/docs/configuration/customizing-entity.png)
4. Select *Update*

If your entity is not supported, or you cannot customize what you need via this method, you need to edit the settings in your [`configuration.yaml` file](/docs/configuration/).For a detailed description of the entity configuration variables, refer to the [Home Assistant Core integration documentation](/integrations/homeassistant/).
