---
title: "Areas"
description: "Group your devices and entities in areas and group areas in floors."
related:
  - docs: /dashboards/area/
    title: Area card
  - docs: /docs/organizing/
  - docs: /docs/organizing/labels/
    title: Labels
  - docs: /docs/organizing/categories/
    title: Categories
  - docs: /template-functions/#area
    title: Using areas in templates
  - docs: /dashboards/dashboards/#home-dashboard
    title: Home dashboard
---

An area in Home Assistant is a logical grouping of {% term devices %} and {% term entities %} that are meant to match areas (or rooms) in the physical world of your home. Areas allow you to target an entire group of devices with an action.

For example, the "Living room" area groups devices and entities in your living room. This allows you to turn off all the lights in the living room with a single action. To learn which entities Home Assistant includes when you select an area, refer to [Automation targets](/docs/automation/targets/).

Areas can be assigned to {% term floors %}. Areas can also be used to automatically generate cards, such as the [Area card](/dashboards/area/).

## Creating an area

Follow these steps to create a new area from the **Areas** view.

1. Go to {% my areas title="**Settings** > **Areas, labels & zones**" %} and select **Add** > **Create area**.
2. In the dialog, enter the area details:
   - Give the area a **Name** (required).
   - Under **Icon**, select an icon from the [Material Design Icons (MDI)](https://pictogrammers.com/library/mdi/).
   - Under **Floor**, assign the area to a floor.
     - If you have not created floors yet, you can [create a new floor](/docs/organizing/floors/#creating-a-floor).
   - Under **Add labels**, add {% term labels %}.
   - Select **Add picture** to add an image representing that area.
   - Under **Aliases**, add alternative names.
     - Aliases are alternative names used in [voice assistants](/voice_control/aliases/) to refer to an area, entity, or floor.

    ![Create area dialog](/images/organizing/create_area_01.png)
3. Select **Create**.
   - Result: A new area is created.

## Assigning areas to floors and adding labels

If an area has not yet been assigned to a {% term floor %}, it is shown in the **Other areas** section. Follow these steps to assign an area to a floor.

1. Go to {% my areas title="**Settings** > **Areas, labels & zones**" %}.
2. Drag and drop the area card to the target floor.
   - Alternatively, on the area card, select the edit {% icon "mdi:edit" %} button and assign the {% term floor %} and {% term labels %}.

## Assigning a device or entity to an area

When you assign a device to an area, its entities are in that area too, unless you assign an entity to a different area.

### To assign a device to an area

1. Go to {% my devices title="**Settings** > **Devices & services** > **Devices**" %} and select the device.
2. In the top-right corner, select the edit {% icon "mdi:pencil" %} button.
3. Under **Area**, select the area, and then select **Update**.
   - Result: The device and its entities are in the area.

### To assign an entity to a different area than its device

1. Go to {% my entities title="**Settings** > **Devices & services** > **Entities**" %} and select the entity.
2. Select the settings {% icon "mdi:cog" %} button.
3. Turn off **Use device area**, select the area, and then select **Update**.
   - An entity without a name of its own always uses the area of its device.

## Assigning an area to multiple items

You can assign an area to multiple items at once in the {% term automation %}, {% term scene %}, {% term script %}, and {% term device %} pages.

1. Depending on what you want to assign, go to one of the following pages:
   - For automations, scripts, or scenes {% my automations title="**Settings** > **Automations & scenes**" %} and open the respective tab.
   - For devices, go to {% my devices title="**Settings** > **Devices & services** > **Devices**" %}.
2. In the list, [select all the items](/docs/organizing/tables#selecting-multiple-items-in-a-table) you want to assign to an area.

    ![Screenshot showing how to assign multiple devices to an area](/images/organizing/area_assign_devices.png)

3. In the top right corner, select **Move to area** and select the target area from the list.

## Assigning an area to a device from the devices dashboard

The **Overview** dashboard has a **Devices** tile that shows all devices that are not assigned to an area. The tile is only shown when some devices have no area.

1. In the sidebar, select **Overview**.
2. Select the **Devices** tile.
3. For your device, select **Assign area** and choose the target area from the list.

   ![Screenshot of the Devices card on the Overview dashboard showing the Assign area action for an unassigned device](/images/organizing/devices-dashboard-assign-area.png)

## Editing an area

Follow these steps to edit an area.

1. Go to {% my areas title="**Settings** > **Areas, labels & zones**" %} and on the area card, select the edit {% icon "mdi:edit" %} button.
2. In the dialog, adjust the area details you want to change:
   - Edit the area **Name**.
   - Under **Icon**, select an icon from the [Material Design Icons (MDI)](https://pictogrammers.com/library/mdi/).
   - Under **Floor**, assign the area to a floor.
     - If you have not created floors yet, you can [create a new floor](/docs/organizing/floors/#creating-a-floor).
   - Under **Add labels**, add or remove {% term labels %}.
   - Select **Add picture** to add an image representing that area.
   - Under **Aliases**, add alternative names.
     - Aliases are alternative names used in [voice assistants](/voice_control/aliases/) to refer to an area, entity, or floor.
   - Under **Related sensors**, select a **Temperature sensor** and a **Humidity sensor** that represent the area.

## Editing an area from the area dashboard

You can also edit the area details when you're on the area dashboard.

1. In the sidebar, select **Overview**.
2. Select the area.
3. In the top-right corner, select the edit {% icon "mdi:edit" %} button.
4. In the **Update area** dialog, [edit the area details](#editing-an-area).

## Reordering areas on built-in dashboards

{% include organizing/reorder-areas.md %}

## Sending a vacuum to a dedicated area

If you have a vacuum that supports area cleaning, you can [set up an automation to send the vacuum to a specific area](/integrations/vacuum/#creating-an-automation-to-send-the-vacuum-to-clean-specific-areas).

## Deleting an area

Follow these steps to delete an area. It will be removed from the floor it was assigned to, and all the devices that were assigned to this area will become unassigned. If you used this area in automations or scripts as targets, or with a voice assistant, these will no longer work.

1. Go to {% my areas title="**Settings** > **Areas, labels & zones**" %} and select the area card.
2. In the top-right corner, select **Menu** {% icon "mdi:dots-vertical" %} > **Delete**.
3. To confirm, select **Delete**.
   - Result: The area is deleted. Its devices are no longer assigned to any area.
4. Adjust or delete the automations and scripts that used this area, and assign its devices to a new area.
