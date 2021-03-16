---
title: "Automation Editor"
description: "Instructions on how to use the automation editor."
---

From the UI choose **{% my config %}** which is located in the sidebar, then click on **{% my automations %}** to go to the automation editor. Press the **+** sign in the lower right corner to get started. This example is based on the manual steps described in the [Getting started section](/getting-started/automation/) for a [`random` sensor](/integrations/random#sensor).

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

Automation created or edited via the user interface, are activated immediately
after save the automation.

## Troubleshooting missing automations

When creating automations using the GUI, you may find they appear to be created but never show in the automations page. When creating automations using the GUI, they are written to `automations.yaml` even if you have a [split configuration](/docs/configuration/splitting_configuration/#example-combine-include_dir_merge_list-with-automationsyaml). Make sure you are correctly including the base `automations.yaml` file to ensure they are loaded.
