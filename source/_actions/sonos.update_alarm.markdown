---
title: "Update a Sonos alarm"
action: sonos.update_alarm
domain: sonos
description: "Updates the time, volume, and other settings of an existing Sonos alarm."
---

Use this action to update an existing Sonos alarm with a new time, volume, or other settings. The alarm itself is created in the Sonos app, and this action changes its settings, for example to shift your wake-up time or turn an alarm on or off from an automation.

{% include actions/ui_header.md %}

To update a Sonos alarm from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Sonos speaker with the alarm you want to update. You can also select an area, a device, or a label.
6. From the actions shown for that target, select **Update alarm**.
7. Set the **Alarm ID** and the settings you want to change.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Alarm ID:
  description: The ID of the alarm to update, as used by Sonos.
Time:
  description: The new time for the alarm.
  required: false
Volume:
  description: The alarm volume level, between 0 and 1.
  required: false
Alarm enabled:
  description: Whether the alarm is enabled.
  required: false
Include linked zones:
  description: Whether the alarm also plays on grouped speakers.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `sonos.update_alarm`. A basic example looks like this:

{% example %}
action: |
  action: sonos.update_alarm
  target:
    entity_id: media_player.bedroom
  data:
    alarm_id: 1
    time: "07:00:00"
    volume: 0.3
    enabled: true
{% endexample %}

### Options in YAML

{% options_yaml %}
alarm_id:
  description: The ID of the alarm to update, as used by Sonos.
  required: true
  type: integer
time:
  description: The new time for the alarm.
  required: false
  type: time
volume:
  description: The alarm volume level, between 0 and 1.
  required: false
  type: float
enabled:
  description: Whether the alarm is enabled.
  required: false
  type: boolean
  default: true
include_linked_zones:
  description: Whether the alarm also plays on grouped speakers.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

## Good to know

- You can find the alarm ID by checking the alarm sensor or the Sonos app. Each alarm keeps the same ID until you delete it.

{% include actions/stuck.md %}

{% include actions/related.md %}
