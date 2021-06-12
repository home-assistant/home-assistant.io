---
title: "Automation Editor"
description: "Instructions on how to use the automation editor."
---

From the UI choose **{% my config %}** which is located in the sidebar, then click on **{% my automations %}** to go to the automation editor. Press the **+** sign in the lower right corner to get started. This page uses the [Random sensor](/integrations/random#sensor) as an example. Any other sensor with a numeric value, can be used as well.

Choose a meaningful name for your automation rules.

<p class='img'>
  <img src='/images/docs/automation-editor/new-automation.png' />
</p>

If the value of the sensor is greater than 10, then the automation rule should apply.

<p class='img'>
  <img src='/images/docs/automation-editor/new-trigger.png' />
</p>

Firing a [persistent notification](/integrations/persistent_notification/) is the result.

<p class='img'>
  <img src='/images/docs/automation-editor/new-action.png' />
</p>

As "Service Data" we want a simple text that is shown as part of the notification.

```yaml
message: Sensor value greater than 10
```

Automations created or edited via the user interface are activated immediately after saving the automation.

## Troubleshooting missing automations

When you're creating automations using the GUI and they don't appear in the UI, make sure that you add back `automation: !include automations.yaml` from the default configuration to your `configuration.yaml`.
