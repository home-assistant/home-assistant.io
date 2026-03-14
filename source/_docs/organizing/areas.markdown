---
title: "Areas"
description: "Group your devices and entities in areas and group areas in floors."
related:
  - docs: /docs/organizing/areas/
    title: Areas
  - docs: /docs/organizing/
  - docs: /docs/organizing/labels/
    title: Labels
  - docs: /docs/organizing/categories/
    title: Categories
  - docs: /docs/configuration/templating/#areas
    title: Using areas in template
  - docs: /dashboards/dashboards/#home-dashboard
    title: Home dashboard
---

An area in Home Assistant is a logical grouping of {% term devices %} and {% term entities %} that are meant to match areas (or rooms) in the physical world of your home. Areas allow you to target an entire group of devices with an action.

For example, the "Living room" area groups devices and entities in your living room. This allows you to turn off all the lights in the living room with a single action.
Areas can be assigned to {% term floors %}. Areas can also be used to automatically generate cards, such as the [Area card](/dashboards/area/).

## Creating an area

Follow these steps to create a new area from the **Areas** view.

1. Go to {% my areas title="**Settings** > **Areas, labels & zones**" %} and select **Create area**.
2. In the dialog, enter the area details:
   - Give the area a **Name** (required).
   - Add an icon (use [Material Design Icons (MDI)](https://pictogrammers.com/library/mdi/)).
   - Assign the area to a floor.
     - If you have not created floors yet, you can [create a new floor](/docs/organizing/floors/#creating-a-floor).
     - The number can be negative. For example, for underground floors.
     - This number can later be used for sorting.
   - Add an image representing that area.
   - Add an **Alias**.
     - Aliases are alternative names used in [voice assistants](/voice_control/aliases/) to refer to an area, entity, or floor.

    ![Create area dialog](/images/organizing/create_area_01.png)
3. Select **Create**.

   **Result**: A new area is created.

## Assigning areas to floors and adding labels

If an area has not yet been assigned to a {% term floor %}, it is shown in the **Unassigned areas** section. Follow these steps to assign an area to a floor.

1. Go to {% my areas title="**Settings** > **Areas, labels & zones**" %}.
2. Drag and drop the area card to the target floor.
   - Alternatively, on the area card, select the edit {% icon "mdi:edit" %} button and assign the {% term floor %} and {% term labels %}.

## Assigning an area to multiple items

You can assign an area to multiple items at once in the {% term automation %}, {% term scene %}, {% term script %}, and {% term device %} pages.

1. Depending on what you want to assign, go to one of the following pages:
   - For automations, scripts, or scenes {% my automations title="**Settings** > **Automations & scenes**" %} and open the respective tab.
   - For devices, go to {% my devices title="**Settings** > **Devices & services** > **Devices**" %}.
2. In the list, [select all the items](/docs/organizing/tables#selecting-multiple-items-in-a-table) you want to assign to an area.

    ![Screenshot showing how to assign multiple devices to an area](/images/organizing/area_assign_devices.png)

3. In the top right corner, select **Move to area** and select the target area from the list.

## Assigning an area to a device from the devices dashboard

The **Overview** (built-in) dashboard has a dedicated **Devices** section that shows all devices that are not assigned to an area.

1. Go to {% my lovelace_dashboards title="**Settings** > **Dashboards**" %} and select the **Overview** (built-in) dashboard.
2. Scroll down to the **Other areas** section and select the **Devices** card.
3. For your device, select **Assign area** and choose the target area from the list.

   ![Screenshot of the Devices card on the Overview dashboard showing the Assign area action for an unassigned device](/images/organizing/devices-dashboard-assign-area.png)

## Editing an area

Follow these steps to edit an area.

1. Go to {% my areas title="**Settings** > **Areas, labels & zones**" %} and on the area card, select the edit {% icon "mdi:edit" %} button.
2. In the dialog, adjust the area details you want to change:
   - Edit the area **Name**.
   - Add an icon (We use [Material icons](https://pictogrammers.com/library/mdi/)).
   - Assign the area to a floor.
     - If you have not created floors yet, you can [create a new one](/docs/organizing/floors/#creating-a-floor).
     - The number can be negative. For example for underground floors.
     - This number can later be used for sorting.
   - Add an image representing that area.
   - Add an **Alias**.
     - Aliases are alternative names used in [voice assistants](/voice_control/aliases/) to refer to an area, entity, or floor.

## Editing an area from the area dashboard

You can also edit the area details when you're on the area dashboard.

1. Go to {% my lovelace_dashboards title="**Settings** > **Dashboards**" %} and select the **Overview** (built-in) dashboard.
2. Select the area.
3. In the top-right corner, select the edit {% icon "mdi:edit" %} button.
4. In the **Update area** dialog, [edit the area details](#editing-an-area).```

## Reordering areas on built-in dashboards

{% include organizing/reorder-areas.md %}

## Sending a vacuum to a dedicated area

If you have a vacuum that supports area cleaning, you can [set up an automation to send the vacuum to a specific area](/integrations/vacuum/#creating-an-automation-to-send-the-vacuum-to-clean-specific-areas).

## Deleting an area

Follow these steps to delete an area. It will be removed from all the floors it was assigned to. All the devices that were assigned to this area will become unassigned.
If you used this area in automations or script as targets, or with voice assistant, these will no longer work.

1. Go to {% my areas title="**Settings** > **Areas, labels & zones**" %} and select the area card.
2. In the top right corner, select the three dots {% icon "mdi:dots-vertical" %} menu. Then, select **Delete**.

    ![Delete area](/images/organizing/area_delete.png)

3. If you used this area in automations or script as targets, or with voice assistant, they will no longer work.
   - You can adjust or delete the related scripts or automations.
4. If you still had devices in that area, they are no longer assigned to any room.
   - If you have moved the devices, you can now reassign them to a new area.
