---
title: "Automation editor"
description: "Create and edit automations from the Home Assistant user interface. The visual editor walks you through choosing a trigger, conditions, and actions, no coding needed."
related:
  - docs: /getting-started/automation/
    title: Automating Home Assistant
---

The automation editor lets you create and edit automations directly from the Home Assistant user interface, without writing any YAML. The editor walks you through choosing a trigger, optional conditions, and the actions to run.

This tutorial uses the [Random sensor](/integrations/random#sensor) because it generates data (by default, values between 0 and 20). This enables us to walk through the example, even if you do not have any actual sensors connected yet. You could use any other sensor that outputs a numeric value.

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and in the lower right corner, select the **Create automation** button.
2. Select **Create new automation**.

    ![Create automation dialogue box](/images/docs/automation-editor/create-automation.png)

3. Select **Add trigger**, and in the **Search trigger** field, type "num".
   - Select **Numeric state**.

    ![Add trigger](/images/docs/automation-editor/add-trigger-to-automation.png)

4. Enter the trigger conditions:
   - Define the sensor: Under **Entity**, enter "sensor.random_sensor".
   - If the sensor value is above 10, we want the automation to trigger.
     - In the **Above** field, enter "10".

    ![Automation trigger](/images/docs/automation-editor/new-trigger.png)

5. Define the action that should happen:
   - In the **Then do** section, select **Add action**.

     ![Add action](/images/docs/automation-editor/add_action.png)

6. We want to create a [persistent notification](/integrations/persistent_notification/).
   - Enter "No" and select **Notifications: send a persistent notification**.

    ![Automation action](/images/docs/automation-editor/send-notification.png)

7. As the message, we want a simple text that is shown as part of the notification.

    ```yaml
    message: Sensor value greater than 10
    ```

8. Select **Save**, give your automation a meaningful name, and **Save** again.

    ![New automation editor](/images/docs/automation-editor/new-automation.png)

    - Result: Automations created or edited via the user interface are activated immediately after saving the automation.
    - To learn more about automations, read the documentation for [Automating Home Assistant](/getting-started/automation/).

## Checking the targeted entities of an automation

After creating an automation and adding a trigger, condition, or action that targets a floor, area, device, or label, you can see how many entities are included, as well as their name, state, and other details.

To check the number of targeted entities of a trigger, condition, or action:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. Add a trigger, condition, or action with a floor, area, device, or label as a target, and then select **Save**.
   - Result: The number of entities appears in parentheses in the trigger, condition, or action row.

To see which entities are targeted and check their details:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. Add a trigger, condition, or action with a floor, area, device, or label as a target, and then select **Save**.
4. In the trigger, condition, or action row, select the target with the entities you want to check.
   - Result: The **Target details** dialog opens, where you can see a list with the name and state of the entities, grouped by parent target.
5. From the entities list, select an entity to check its details.
   - Result: A dialog opens with more information about the entity.

If a trigger, condition, or action has a single entity as the target, instead of a floor, area, device, or label, select it from the row to open the entity details dialog.

## Adding notes to an automation

You can add notes to a trigger, condition, or action in an automation. Use notes to explain why a certain automation step exists or include details about that step, for example.

To add a note to a trigger, condition, or action:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. Add a trigger, condition, or action to your automation.
4. On the right side of the trigger, condition, or action row, select the three dots {% icon "mdi:dots-vertical" %} menu and then select **Add note**.
5. In the **Add note** dialog, enter the text of your note and select **Submit**.
   - Result: You can read your note by hovering over or selecting the {% icon "mdi:comment-text-outline" %} button.

## Editing the notes of an automation

If you want to change a note of a trigger, condition, or action:

1. Select the trigger, condition, or action row where your note is.
2. In the **Note** section of the trigger, condition, or action dialog, select **Edit**.
3. Enter the new text or change the existing one and select **Submit**.

## Troubleshooting missing automations

When you're creating automations using the GUI and they don't appear in the UI, make sure that you add back `automation: !include automations.yaml` from the default configuration to your {% term "`configuration.yaml`" %}.
