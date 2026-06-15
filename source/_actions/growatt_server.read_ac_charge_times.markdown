---
title: "Read AC charge times"
action: growatt_server.read_ac_charge_times
domain: growatt_server
description: "Reads AC charge periods from a supported SPH inverter."
related_actions:
  - growatt_server.write_ac_charge_times
---

The **Read AC charge times** action reads the current AC charge periods from a supported SPH inverter and returns them as response data. This is useful when you want to check the current charge schedule before changing it.

{% include actions/ui_header.md %}

To read the AC charge times from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Growatt: Read AC charge times**.
6. Choose the **Device**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Device:
  description: The Growatt SPH inverter to read from.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `growatt_server.read_ac_charge_times`. A basic example looks like this:

{% example %}
action: |
  action: growatt_server.read_ac_charge_times
  data:
    device_id: a1b2c3d4e5f6
{% endexample %}

This action returns the current AC charge periods as response data.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The Growatt SPH inverter to read from.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
