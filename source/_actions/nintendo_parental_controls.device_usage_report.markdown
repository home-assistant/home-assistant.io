---
title: "Device usage report"
action: nintendo_parental_controls.device_usage_report
domain: nintendo_parental_controls
description: "Get today's application usage details for a device."
---

The **Device usage report** action retrieves details regarding what Nintendo applications have been used today on a specified Nintendo Switch device.

This action returns response data containing a breakdown of application usage per player on the device.

This action does not support targets. In the UI, you are not prompted to choose an area, entity, or label. Instead, you select the Nintendo Switch to retrieve the report for through the **Device** option.

{% include actions/ui_header.md %}

To retrieve a device usage report from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Nintendo Switch parental controls: Device usage report**.
6. Choose the **Device**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The ID of the device to get usage details for.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `nintendo_parental_controls.device_usage_report`. Because this action returns data, supply a `response_variable` to capture the output:

{% example %}
action: |
  action: nintendo_parental_controls.device_usage_report
  data:
    device_id: 1b4a46c6d0f3406c80d275f5b0c6483b
  response_variable: usage_report
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The ID of the device to get usage details for.
  required: true
  type: string
{% endoptions_yaml %}

### Response data

The action returns a dictionary mapping each player's nickname on the device to a list of applications played today:

```json
{
  "Player 1": [
    {
      "name": "Super Mario Odyssey",
      "playing_time": 45,
      "image": "https://example.com/image.png",
      "whitelisted": true
    }
  ]
}
```

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: Send a daily usage report notification

This automation runs every evening at 20:00, retrieves the device usage report, and sends a notification.

- Trigger: Time is 20:00
- Action:
  - Retrieve the device usage report into `report`
  - Send a notification with the results

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Daily Nintendo Switch usage report"
  triggers:
    - trigger: time
      at: "20:00:00"
  actions:
    - action: nintendo_parental_controls.device_usage_report
      data:
        device_id: 1b4a46c6d0f3406c80d275f5b0c6483b
      response_variable: report
    - action: notify.notify
      data:
        title: "Daily Switch Usage"
        message: >
          Device report retrieved for {{ report.keys() | list }}.
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
