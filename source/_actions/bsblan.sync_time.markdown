---
title: "Sync time"
action: bsblan.sync_time
domain: bsblan
description: "Synchronizes the Home Assistant time to a BSB-LAN device."
related_actions:
  - bsblan.set_hot_water_schedule
---

Use this action to synchronize the time of your Home Assistant instance to your BSB-LAN device. The device time is only updated when it differs from the Home Assistant time.

This is handy in automations, for example to keep the device clock accurate by syncing it once a day.

{% include actions/ui_header.md %}

To synchronize the time from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **BSB-LAN: Sync time**.
6. Select the **Device** to synchronize.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The BSB-LAN device to synchronize the time for.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `bsblan.sync_time`. A basic example looks like this:

{% example %}
action: |
  action: bsblan.sync_time
  data:
    device_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
{% endexample %}

This synchronizes the time of the selected BSB-LAN device.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The BSB-LAN device to synchronize the time for.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- The device time is only updated when it differs from the Home Assistant time.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Synchronize the time daily

This automation synchronizes the BSB-LAN device time every day at 3:00.

{% details "YAML example for a daily time sync" %}

{% example %}
automation: |
  alias: "Sync BSB-LAN time daily"
  triggers:
    - trigger: time
      at: "03:00:00"
  actions:
    - action: bsblan.sync_time
      data:
        device_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
