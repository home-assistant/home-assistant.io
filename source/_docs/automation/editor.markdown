---
title: "Automation editors"
description: "Create and edit automations from the Home Assistant user interface. Use the visual editor to choose triggers, conditions, and actions without writing code, or use the YAML editor to edit the automation's YAML."
related:
  - docs: /getting-started/automation/
    title: "Tutorial: Create your first automation"
---

The automation editors let you create and edit automations. You can do it directly from the Home Assistant user interface without writing any YAML in the visual editor, or in the YAML editor. The visual editor walks you through choosing a trigger, optional conditions, and the actions to run.

If you're new to automations, start with the [Tutorial: Create your first automation](/getting-started/automation/). It walks you through creating your first automations in the visual editor, step by step.

## Finding and organizing automations

All your automations are listed in a table under {% my automations title="**Settings** > **Automations & scenes**" %}. In this table, you can:

- Search for an automation. The search matches the name, the entity ID, and the names of the area, category, and labels.
- Filter the table with **Filters**, by areas and floors, devices, entities, labels, categories, voice assistants, or blueprints. For example, filter by a device to see all automations that use it.
- Group the automations with **Group by**, by category, area, or state. By default, the automations are grouped by category.
- Change several automations at once. Select **Enter selection mode**, select the automations, and then select one of the following:
  - **Move to category**
  - **Add label**
  - **Move to area**
  - **Enable** or **Disable**, in the **Action** {% icon "mdi:dots-vertical" %} menu

  On narrow screens, **Move to category**, **Add label**, and **Move to area** are also in the **Action** menu.

Automations without an `id` can't be selected. Only automations that you wrote in a YAML file can be missing an `id`.

The table works like the other tables in Home Assistant. For the steps, refer to [Working with tables](/docs/organizing/tables/). To use categories in tables, refer to [Categories](/docs/organizing/categories/).

## Editing an automation in the visual editor

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
    - Result: The visual editor opens and you can edit the automation.
3. Optional: To add a YAML example, such as one from the documentation, copy the YAML, and in the editor, press <kbd>Ctrl</kbd>+<kbd>V</kbd> (or <kbd>Cmd</kbd>+<kbd>V</kbd> on Mac).
    - The example can be a full automation, a single trigger, a condition, or an action. For an example to try, refer to [Automation: Send a notification when Home Assistant starts](/integrations/homeassistant/#automation-send-a-notification-when-home-assistant-starts).
    - If you selected a trigger, condition, or action first, a pasted trigger, condition, or action is added after it.
    - Otherwise, if the automation already has content or unsaved changes, the **Pasted automation** dialog asks whether to **Append** the pasted YAML or **Replace** the existing content.
4. Select **Save**.

## Editing an automation in YAML

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the upper-right corner, select **Menu** {% icon "mdi:dots-vertical" %}, and then select **Edit in YAML**.
    - Result: The YAML editor opens and you can change the YAML code.
    - If you just want to edit the YAML of a trigger, a condition or an action of the automation, select **Menu** {% icon "mdi:dots-vertical" %} in the right corner of the respective element, and select **Edit in YAML**.
4. Optional: To add a YAML example, such as one from the documentation, copy the YAML, and paste it at the right place in the YAML editor. For example, paste a trigger under `triggers:`, and make sure its indentation matches the other triggers.
5. Select **Save**.
6. If you want to go back to the visual editor, select **Menu** {% icon "mdi:dots-vertical" %} again, and then select **Edit in visual editor**.

## Undoing and redoing changes

In the visual editor, you can undo and redo your changes, also after you save them.

- To undo a change, in the top bar, select **Undo** {% icon "mdi:undo" %}.
- To redo a change, in the top bar, select **Redo** {% icon "mdi:redo" %}.

On narrow screens, **Undo** and **Redo** are in the **Menu** {% icon "mdi:dots-vertical" %} of the editor. You can also use the [keyboard shortcuts](#list-of-keyboard-shortcuts).

## Renaming an automation and adding details

When you save a new automation, you give it a name. You can change the name later, and add a description, a [category](/docs/organizing/categories/), [labels](/docs/organizing/labels/), and an [area](/docs/organizing/areas/).

1. Open the automation.
2. In the top bar, select **Menu** {% icon "mdi:dots-vertical" %}, and then select **Rename**.
3. Change the name.
4. Optional: To add more details, select one of the following:
   - **Add description**: Enter a description.
   - **Add category**: Select a category from the list, or select **Add new category** to create one.
   - **Add labels**: Select **Add label**, and then select a label.
   - **Add area**: Select an area.
5. Select **Rename**.
6. Renaming an automation doesn't change its entity ID. To change the entity ID, select **Menu** {% icon "mdi:dots-vertical" %} > **Settings**, and then change the **Entity ID**.

## Changing the mode of an automation

The [mode](/docs/automation/modes/) decides what happens when an automation starts while it is still running.

Automations that use a blueprint don't have the mode option.

1. Open the automation.
2. In the top bar, select **Menu** {% icon "mdi:dots-vertical" %}, and then select **Change mode**.
3. Select a mode:
   - **Single**: Doesn't start a new run while the automation is running, and logs a warning. This is the default.
   - **Restart**: Stops the current run, and starts a new one.
   - **Queued**: Starts each new run after earlier runs finish. Under **Queue length**, set the maximum number of running and queued runs combined. The default is 10.
   - **Parallel**: Starts the new run right away, next to the running runs. Under **Max number of parallel runs**, set how many runs can run at the same time. The default is 10.
4. Select **Change mode**, and then save the automation.

## Duplicating, turning off, or deleting an automation

Open the automation, and in the top bar, select **Menu** {% icon "mdi:dots-vertical" %}. Then select one of the following:

- **Duplicate**: Opens a copy of the automation in a new editor. The copy is only kept when you save it.
- **Disable**: Turns off the automation, so it doesn't react to its triggers. To turn it on again, select **Enable**.
- **Delete**: Deletes the automation after you confirm. You can't undo this.

## Working with triggers, conditions, and actions

Each trigger, condition, and action has its own **Menu** {% icon "mdi:dots-vertical" %} on the right side of its row.

After changing a trigger, condition, or action, select **Save** to apply your changes to the automation.

### Renaming a trigger, condition, or action

A name makes it easier to find a trigger, condition, or action in a long automation, and in the [trace](/docs/automation/testing/#traces).

1. On the right side of the row, select **Menu** {% icon "mdi:dots-vertical" %}, and then select **Rename**.
2. Enter a name, and select **Submit**.

In YAML, the name is stored in `alias`.

### Copying, moving, and duplicating triggers, conditions, and actions

- To add a copy in the same automation, in the **Menu** {% icon "mdi:dots-vertical" %} of the row, select **Duplicate**.
- To copy or move it, in the **Menu** {% icon "mdi:dots-vertical" %} of the row, select **Copy** or **Cut**. Then, in the **Menu** {% icon "mdi:dots-vertical" %} of another row of the same kind, select **Paste**. The copy is inserted after that row. You can also paste it in another automation that you open in the same browser tab.
- To change the order, drag the row by its handle {% icon "mdi:drag-horizontal-variant" %}.

### Replacing a trigger, condition, or action

To swap a trigger, condition, or action for a different one, replace it. The new one takes the same place in the automation and keeps the settings it can use. For example, if an action turns on a light and you want it to turn the light off instead, replace it with the turn-off action. The light stays selected.

1. On the right side of the row, select **Menu** {% icon "mdi:dots-vertical" %}, and then select **Replace**.
   - Result: The **Replace trigger**, **Replace condition**, or **Replace action** dialog opens on the same category as the one you're replacing.
2. Select the new trigger, condition, or action.
   - Result: It takes the place of the old one.
3. Check the new one, and fill in any settings that are missing.

The following settings are kept:

- The target. However, entities, devices, areas, floors, and labels that do not work with the new trigger, condition, or action are removed from it.
- Each option with the same name and the same kind of input.
- The trigger ID, the trigger variables, the note, **Continue on error**, and whether it's turned off.
- The response variable, if the new action returns a response.

The name isn't kept, because it describes the old one. Options that the new one doesn't have, or has in a different form, are also left out, even if the value might still work.

To go back to the old one, select **Undo** in the message that appears, or [undo the change](#undoing-and-redoing-changes).

You can't replace building blocks that contain other triggers, conditions, or actions, such as **Choose**, **If-then**, **Repeat**, **Run in parallel**, **Run in sequence**, **Wait for a trigger**, **And**, **Or**, and **Not**. Replacing them would remove everything inside them.

### Turning off a trigger, condition, or action

To try an automation without one of its triggers, conditions, or actions, turn it off instead of deleting it.

1. On the right side of the row, select **Menu** {% icon "mdi:dots-vertical" %}, and then select **Disable**.
   - Result: The row shows **Disabled**. Home Assistant skips it until you turn it on again.
2. To turn it on again, select **Menu** {% icon "mdi:dots-vertical" %}, and then select **Enable**.

### Continuing after an action fails

By default, an automation stops when an action fails. To continue with the next action after an error, in the **Menu** {% icon "mdi:dots-vertical" %} of the action, select **Continue on error**. The action then shows {% icon "mdi:alert-circle-check" %}. This option does not ignore errors in the automation's configuration, such as a broken template. Only use it for actions whose failure does not matter for the rest of the automation. This option isn't available for conditions under **Then do**.

An action whose target is unavailable or doesn't exist doesn't fail. Home Assistant skips that target and logs a warning, so the next action runs even without **Continue on error**. The action does fail if an entity that you selected directly doesn't support it, or if the action should return response data and none of its targets match.

### Deleting a trigger, condition, or action

In the **Menu** {% icon "mdi:dots-vertical" %} of the row, select **Delete**. To bring it back, select **Undo** in the message that appears, or [undo the change](#undoing-and-redoing-changes).

## List of keyboard shortcuts

The visual editor supports the following keyboard shortcuts. On a Mac, use <kbd>Cmd</kbd> instead of <kbd>Ctrl</kbd>. The shortcuts don't work while you type in a text field.

- <kbd>Ctrl</kbd>+<kbd>S</kbd>: Save the automation.
- <kbd>Ctrl</kbd>+<kbd>Z</kbd>: Undo.
- <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd> or <kbd>Ctrl</kbd>+<kbd>Y</kbd>: Redo.
- <kbd>Ctrl</kbd>+<kbd>C</kbd>: Copy the selected trigger, condition, or action.
- <kbd>Ctrl</kbd>+<kbd>X</kbd>: Cut the selected trigger, condition, or action.
- <kbd>Ctrl</kbd>+<kbd>V</kbd>: Paste after the selected trigger, condition, or action.
- <kbd>Ctrl</kbd>+<kbd>Delete</kbd> or <kbd>Ctrl</kbd>+<kbd>Backspace</kbd>: Delete the selected trigger, condition, or action.

## Checking the targeted entities of an automation

After creating an automation and adding a trigger, condition, or action that targets a floor, area, device, or label, you can see how many entities are included, as well as their name, state, and other details.

### To check the number of targeted entities of a trigger, condition, or action

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. Add a trigger, condition, or action with a floor, area, device, or label as a target.
   - Result: The number of entities appears in parentheses in the trigger, condition, or action row.

### To see which entities are targeted and check their details

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. Add a trigger, condition, or action with a floor, area, device, or label as a target.
4. In the trigger, condition, or action row, select the target with the entities you want to check.
   - Result: The **Target details** dialog opens, where you can see a list with the name and state of the entities, grouped by parent target.
5. From the entities list, select an entity to check its details.
   - Result: A dialog opens with more information about the entity.

If a trigger, condition, or action has a single entity as the target, instead of a floor, area, device, or label, select it from the row to open the entity details dialog.

## Adding notes to an automation

You can add notes to a trigger, condition, or action in an automation. Use notes to explain why a step exists, or to include additional context.

To add a note to a trigger, condition, or action:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. Add a trigger, condition, or action to your automation.
4. On the right side of the trigger, condition, or action row, select **Menu** {% icon "mdi:dots-vertical" %} and then select **Add note**.
5. In the **Add note** dialog, enter the text of your note and select **Submit**.
   - Result: You can read your note by hovering over or selecting the {% icon "mdi:comment-text-outline" %} button.

## Editing notes in an automation

If you want to change a note on a trigger, condition, or action:

1. Select the trigger, condition, or action row where your note is.
   - Result: The options of the trigger, condition, or action open.
2. In the **Note** section, select **Edit**.
3. Enter the new text or change the existing one and select **Submit**.

## Troubleshooting missing automations

If you can't see your automation, refer to [My automation doesn't appear in the UI](/docs/automation/troubleshooting/#my-automation-doesnt-appear-in-the-ui).
