---
title: "Automation editor"
description: "Instructions on how to use the automation editor."
---

The automation editor is an easy way of creating and editing automations from the UI.

This page uses the [Random sensor](/integrations/random#sensor) as an example, though any other sensor with a numeric value can be used as well.

From the UI, choose **{% my config %}** which is located in the sidebar, then click on **{% my automations %}** to go to the automation editor. Press the **Create Automation** button in the lower right corner to get started. You can create an automation based on a [blueprint](/docs/automation/using_blueprints/) or start from scratch. Select **Create new automation**.

![Create automation dialogue box](/images/docs/automation-editor/create-automation.png)

Click on the **Add Trigger** button and select **Numeric state**.

![Add trigger](/images/docs/automation-editor/add-trigger-to-automation.png)

If the value of the sensor is greater than 10, then the automation should trigger.

![Automation trigger](/images/docs/automation-editor/new-trigger.png)

Click on the **Add Action** button and select **Call service**.

![Add trigger](/images/docs/automation-editor/new-action.png)

The action for this automation creates a [persistent notification](/integrations/persistent_notification/).

![Automation action](/images/docs/automation-editor/send-notification.png)

As the message we want a simple text that is shown as part of the notification.

```yaml
message: Sensor value greater than 10
```

 Press the **Save** button, and the save dialogue will appear. Give your automation a meaningful name and press the **Save** button again.

![New automation editor](/images/docs/automation-editor/new-automation.png)

Automations created or edited via the user interface are activated immediately after saving the automation. Read the documentation for [Automating Home Assistant](/getting-started/automation/) to learn more about automations.

## Troubleshooting missing automations

When you're creating automations using the GUI and they don't appear in the UI, make sure that you add back `automation: !include automations.yaml` from the default configuration to your {% term "`configuration.yaml`" %}.
