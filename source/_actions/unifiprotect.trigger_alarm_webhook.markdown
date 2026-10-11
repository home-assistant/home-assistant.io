---
title: Trigger alarm webhook
action: unifiprotect.trigger_alarm_webhook
domain: unifiprotect
description: "Fires a UniFi Protect Alarm Manager webhook trigger."
---

With this action, you can fire a webhook trigger from the UniFi Protect Alarm Manager, which runs the alarms that use it.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **UniFi Protect: Trigger alarm webhook**.
6. Fill in the fields, then select **Save**.

### Options in the UI

{% options_ui %}
UniFi Protect NVR:
  description: Any device from the UniFi Protect instance.
Trigger ID:
  description: The ID of the webhook trigger, as shown in the Alarm Manager.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `unifiprotect.trigger_alarm_webhook`. A basic example looks like this:

{% example %}
action: |
  action: unifiprotect.trigger_alarm_webhook
  data:
    device_id: 1234567890abcdef1234567890abcdef
    trigger_id: 0b6c5a2e-9d3f-4c1a-8e7b-2f4d6a8c1e3b
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: The ID of any device from the UniFi Protect instance.
  required: true
  type: string
trigger_id:
  description: The ID of the webhook trigger, as shown in the Alarm Manager.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- Unlike the other UniFi Protect actions, this one also works in API key only mode.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
