---
title: "Areas"
description: "Group your devices and entities in areas and group areas in floors."
---

An area in Home Assistant is a logical grouping of {% term devices %} and {% term entities %} that are meant to match areas (or rooms) in the physical world of your home. For example, the "Living room" area groups devices and entities in your living room. Areas allow you to target an entire group of devices with a service call. For example, turning off all the lights in the living room.
Areas can be assigned to floors. Areas can also be used to automatically generate cards, such as the [Area card](/dashboards/area/).

## Creating an area

Follow these steps to create a new area from the **Areas** view.

1. Go to {% my areas title="**Settings** > **Areas, labels & zones**" %} and select **Create area**.
2. In the dialog, enter the area details:
   - Give the area a **Name** (required).
   - Add an icon (We use [Material icons](https://pictogrammers.com/library/mdi/)).
   - Assign the area to a floor.
     - If you have not created floors yet, you can create a new one.
     - The number can be negative. For example for underground floors.
     - This number can later be used for sorting.
   - Add an image representing that area.
   - Add an **Alias**.
     - Aliases are alternative names used in [voice assistants](/voice_control/aliases/) to refer to this floor.

    ![Create area dialog](/images/organizing/create_area_01.png)
3. Select **Add**.

   **Result**: A new area is created.

## Assigning areas to floors and add labels

If an area has not yet been assigned to a floor, it is shown in the **Unassigned areas** section. Follow these steps to assign an area to a floor.

1. Go to {% my areas title="**Settings** > **Areas, labels & zones**" %} and select **Create area**.
2. On the area card, select the pencil icon.
3. In the dialog, select the floor and add labels, if you like.

## Related topics

- [Floors](/docs/organzing/floors/)
- [Labels](/docs/organzing/labels/)