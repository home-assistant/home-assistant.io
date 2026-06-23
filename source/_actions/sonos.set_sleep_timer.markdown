---
title: "Set a Sonos sleep timer"
action: sonos.set_sleep_timer
domain: sonos
description: "Sets a sleep timer that gradually fades out a Sonos speaker."
related_actions:
  - sonos.clear_sleep_timer
---

Use this action to set a sleep timer that turns off a Sonos speaker by tapering its volume down to zero after a set amount of time. This is handy for falling asleep to music without leaving it playing all night. If you set the time to `0`, the speaker starts tapering the volume down right away.

{% include actions/ui_header.md %}

To set a Sonos sleep timer from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Sonos speaker you want to set a timer for. You can also select an area, a device, or a label.
6. From the actions shown for that target, select **Set timer**.
7. Set the **Sleep time** in seconds.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Sleep time:
  description: The number of seconds the speaker waits before it starts tapering the volume down. Cannot exceed 7200 seconds (2 hours).
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `sonos.set_sleep_timer`. A basic example looks like this:

{% example %}
action: |
  action: sonos.set_sleep_timer
  target:
    entity_id: media_player.bedroom
  data:
    sleep_time: 1800
{% endexample %}

### Options in YAML

{% options_yaml %}
sleep_time:
  description: The number of seconds the speaker waits before it starts tapering the volume down. Cannot exceed 7200 seconds (2 hours).
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

{% include actions/stuck.md %}

{% include actions/related.md %}
