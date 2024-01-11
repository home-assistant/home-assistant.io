---
title: "Using the Automation editor"
description: "Instructions on how to use the automation editor."
---

The automation editor is an easy way of creating and editing automations from the UI. In this procedure, we are going to create a new automation from scratch, using a "random" sensor for demonstration purposes. You can do this with any of your sensors that has a numeric value.

1. Go to {% my automations title="**Settings** > **Automations & Scenes**" %} and in the lower right corner, select the **Create Automation** button.
   - For this tutorial, select **Create new automation**.

  ![Create automation dialogue box](/images/docs/automation-editor/create-automation.png)

2. Select **Add Trigger** > **Entity** and select **Numeric state**.

  ![Add trigger](/images/docs/automation-editor/add-trigger-to-automation.png)

   - In this example, If the value of the sensor is greater than 10, then the automation should trigger.

   ![Automation trigger](/images/docs/automation-editor/new-trigger.png)

3. Select **Add Action** > **Other actions** and select **Call service**.

    ![Add trigger](/images/docs/automation-editor/new-action.png)

    - The action for this automation creates a [persistent notification](/integrations/persistent_notification/).
    - As the message we want a simple text that is shown as part of the notification.

        ```yaml
        message: Sensor value greater than 10
        ```

     ![Automation action](/images/docs/automation-editor/send-notification.png)

4. Select the **Save** button, give your automation a meaningful name and select **Save** again.

    ![New automation editor](/images/docs/automation-editor/new-automation.png)

Automations created or edited via the user interface are activated immediately after saving the automation. Read the documentation for [Automating Home Assistant](/getting-started/automation/) to learn more about automations.

## Troubleshooting missing automations

When you're creating automations using the GUI and they don't appear in the UI, make sure that you add back `automation: !include automations.yaml` from the default configuration to your `configuration.yaml`.

## Related topics

- [Automating Home Assistant](/getting-started/automation/)
- [Persistent notifications](/integrations/persistent_notification/)
