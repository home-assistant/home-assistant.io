---
title: "Read time segments"
action: growatt_server.read_time_segments
domain: growatt_server
description: "Reads all battery time segments from a supported MIN inverter."
related_actions:
  - growatt_server.update_time_segment
---

The **Read time segments** action reads the current configuration of all nine time segments from a supported MIN inverter and returns the complete time-of-use schedule. This is useful when you want to check the current schedule before changing it.

{% include actions/ui_header.md %}

To read the time segments from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Growatt: Read time segments**.
6. Choose the **Device**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Device:
  description: The Growatt MIN inverter to read from.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `growatt_server.read_time_segments`. A basic example looks like this:

{% example %}
action: |
  action: growatt_server.read_time_segments
  data:
    device_id: a1b2c3d4e5f6
  response_variable: time_segments
{% endexample %}

This action returns the current time segment configuration as response data.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The Growatt MIN inverter to read from.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
