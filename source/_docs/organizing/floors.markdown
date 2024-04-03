---
title: "Floors"
description: "Group your areas per floor"
---

A floor in Home Assistant is a logical grouping of areas meant to match your home's physical floors. Devices and entities
cannot be assigned to floors directly but to areas. Floors can be used in automations and scripts as a target for actions. For example, to turn off all the lights on the downstairs floor when you go to bed.

## Creating a floor

Follow these steps to create a new floor.

1. Go to {% my areas title="**Settings** > **Areas, labels & zones**" %} and select **Create floor**.
2. In the dialog, enter the floor details:
   - Give the floor a **Name** (required).
   - Add a floor **Level**.
     - The number can be negative. For example for underground floors.
     - This number can later be used for sorting.
   - Add an icon (We use [Material icons](https://pictogrammers.com/library/mdi/)).
   - Add an **Alias**.
     - Aliases are alternative names used in [voice assistants](/voice_control/aliases/) to refer to this floor.

    ![Create floor dialog](/images/organizing/create_floor_01.png)
3. Select **Add**.

   **Result**: A new floor is created.

    ![Create floor dialog](/images/organizing/create_floor_02.png)
4. You can now [assign areas to that floor](/docs/organizing/areas/#assigning-areas-to-floors-and-add-labels).

## Related topics

- [Alias for voice assistants](/voice_control/aliases/)
- [Areas](/docs/organizing/areas/)
- [Using floors in templates](/docs/configuration/templating/#floors)
