---
title: "Floors"
description: "Group your areas per floor"
related:
  - docs: /docs/organizing/areas/
    title: Areas
  - docs: /docs/organizing/
  - docs: /docs/organizing/labels/
    title: Labels
  - docs: /template-functions/#floor
    title: Using floors in templates
  - docs: /voice_control/aliases/
    title: Using floor alias for voice assistants
---

A floor in Home Assistant is a logical grouping of {% term areas %} meant to match your home's physical floors.

Devices and entities cannot be assigned to floors directly but to areas. Floors can be used in {% term automations %} and {% term scripts %} as a target for {% term actions %}. For example, to turn off all the lights on the downstairs floor when you go to bed.

## Creating a floor

Follow these steps to create a new floor.

1. Go to {% my areas title="**Settings** > **Areas, labels & zones**" %} and select **Add** > **Create floor**.
2. In the dialog, enter the floor details:
   - Give the floor a **Name** (required).
   - Under **Level**, enter the floor level.
     - The number can be negative. For example, for underground floors.
     - The level determines the default floor icon. It doesn't change the order of the floors. To change the order, refer to [Reordering floors on built-in dashboards](#reordering-floors-on-built-in-dashboards).
   - Under **Icon**, select an icon from the [Material Design Icons (MDI)](https://pictogrammers.com/library/mdi/).
   - Under **Areas**, select **Add area** to add the areas that are on this floor.
   - Under **Aliases**, add alternative names.
     - Aliases are alternative names used in [voice assistants](/voice_control/aliases/) to refer to an entity, area, or floor.
3. Select **Create**.
   - Result: A new floor is created.

    ![Floors on the Areas page](/images/organizing/create_floor_02.png)
4. You can also [assign areas to that floor](/docs/organizing/areas/#assigning-areas-to-floors-and-adding-labels) later.

## Reordering floors on built-in dashboards

{% include organizing/reorder-areas.md %}

## Deleting a floor

Follow these steps to delete a floor. Areas that are assigned to a floor will become unassigned. {% term Automations %} and {% term scripts %} or voice assistants that used a floor as a target will no longer work as they no longer have a target.

1. Go to {% my areas title="**Settings** > **Areas, labels & zones**" %}.
2. Next to the floor, select **Menu** {% icon "mdi:dots-vertical" %} > **Delete floor**.
3. To confirm, select **Delete**.
   - Result: The floor is deleted. Its areas are no longer assigned to a floor.
4. If you have {% term automations %}, {% term scripts %}, or voice assistants that used floors as a target, you will need to update these.
